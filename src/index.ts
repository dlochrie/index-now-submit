import yargs from 'yargs';
import { submit } from './submit';

const parser = yargs(process.argv.slice(2))
  .usage('Usage: $0 --sitemap <sitemap> --key <key>')
  .options({
    sitemap: {
      alias: 's',
      describe:
        'Sitemap URL to submit to search engines. For example, https://www.example.com/sitemap.xml',
      demandOption: true,
      type: 'string',
    },
    key: {
      alias: 'k',
      describe: 'API key to use for submitting sitemap to search engines.',
      type: 'string',
      demandOption: true,
    },
  })
  .help('h')
  .alias('h', 'help');

// /**
//  * API Key
//  *
//  * To generate an API key, visit https://www.bing.com/indexnow/getstarted and use the tool.
//  * (or just use an MD5 hash of a random string).
//  */
// const API_KEY = '5d315f28abd2b77dd09c52fd23eddbca';

// // TODO: This should NOT be hardcoded.
// const host = 'https://www.superweather.net';

(async () => {
  const { sitemap, key } = await parser.parse();

  await submit({ sitemap, key });
})();
