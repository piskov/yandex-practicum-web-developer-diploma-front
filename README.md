# Front end for Diploma work at Yandex Web developer course

This repo contains code for the News Explorer front end.

You can see live version at [Github Pages](https://piskov.github.io/yandex-web-developer-diploma-front/) or at https://divulge-uncommon.ru/

Project enables news search through public [News API](https://newsapi.org/) and saving articles through tailor-made [API](https://github.com/piskov/yandex-web-developer-diploma-api).

Project contains tree build configurations:
- `npm run dev` starts dev build in hot-reload mode
- `npm run build` creates production build (minified, optimized, babelized)
- `npm run deploy` deploys site at github pages

Package.json has fixed version for all npm modules.

## Release notes for `0.1.0`:
- adaptive and responsive layout for all major resolutions
- two pages: main search and saved articles
- no .js code
