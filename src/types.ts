export type SiteMap = {
  urlset: {
    xmlns: string;
    'xmlns:xhtml': string;
    url: (
      | {
          loc: string;
          'xhtml:link': {
            rel: string;
            hreflang: string;
            href: string;
          }[];
          lastmod: string;
          changefreq: string;
          priority: number;
        }
      | {
          loc: string;
          lastmod: string;
          changefreq: string;
          priority: number;
          'xhtml:link'?: undefined;
        }
    )[];
  };
};

export type ResponseCode = {
  code: number;
  response: string;
  reason: string;
};
