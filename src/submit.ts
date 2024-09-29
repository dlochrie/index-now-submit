import parser from 'xml2json';

import { SiteMap } from './types';
import { RESPONSE_CODES, SEARCH_ENGINES } from './constants';

async function submitPages({
  sitemap,
  pages,
  searchEngine,
  key,
}: {
  sitemap: string;
  pages: string[];
  searchEngine: string;
  key: string;
}) {
  console.log('Indexing pages for %s...', searchEngine);

  try {
    // Create a URL in the format (for POST):
    // https://{searchengine}/indexnow
    const apiUrl = new URL('indexnow', searchEngine);

    // Parse the host from the sitemap URL.
    const { host, origin } = new URL(sitemap);

    const res = await fetch(apiUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        host,
        key,
        keyLocation: new URL(`${key}.txt`, origin).toString(),
        urlList: pages,
      }),
    });

    // We're done if the response is successful.
    const successfulReponseCodes = [200, 202];
    if (successfulReponseCodes.includes(res.status)) return;

    // Log known errors, but don't throw (throw aborts the whole script).
    const knownErrorReponseCodes = [400, 403, 422, 429];
    if (knownErrorReponseCodes.includes(res.status)) {
      const response = RESPONSE_CODES[res.status];
      console.error(`Error submitting page(s) to "${searchEngine}":\n${response.response}\n`);
      return;
    }

    if (res.status === 404) {
      console.error(
        `Error submitting page(s) to "${searchEngine}":\nNot Found. This search engine is likely not supported.\n`,
      );
      return;
    }

    throw new Error(
      `Unknown error submitting page(s) to "${searchEngine}" with sitemap "${sitemap}"\n\t${res.status}: ${res.statusText}.`,
    );
  } catch (error) {
    console.error(error);
  }
}

export async function submit({ sitemap, key }: { sitemap: string; key: string }) {
  try {
    const res = await fetch(sitemap);
    const xml = await res.text();
    const json = parser.toJson(xml, { object: true }) as SiteMap;

    const pages: string[] = [];
    for (const url of json.urlset.url) {
      pages.push(url.loc);
      if (url['xhtml:link']) {
        for (const link of url['xhtml:link']) {
          pages.push(link.href);
        }
      }
    }

    const queue = SEARCH_ENGINES.map((searchEngine) =>
      submitPages({ sitemap, pages, searchEngine, key }),
    );
    await Promise.all(queue);

    console.log('Process Complete! Indexed %d pages!', pages.length);
    process.exit(0);
  } catch (error) {
    console.error('Error indexing pages:', error);
  }

  process.exit(1);
}
