# Index Now Submit

Simple script for submitting your web app to multiple search engines that support
[IndexNow](https://www.indexnow.org/) indexing.

The script reads your Sitemap, and submits each page found (including alternate languages/locales) to multiple search engines.

```bash
# Where your key (k) is "cad169d70e6a966ffa575c48182a5406" and your sitemap (s) is at https://www.example.com/sitemap.xml:

# Manually add pages:
npx index-now-submit -s https://www.example.com/sitemap.xml -k cad169d70e6a966ffa575c48182a5406

# Or build and run locally:
npm build && npm run submit --sitemap https://www.example.com/sitemap.xml --key cad169d70e6a966ffa575c48182a5406
```
