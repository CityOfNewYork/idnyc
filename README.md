# idnyc
How to run this project locally
 - install yarn package manager https://classic.yarnpkg.com/en/docs/install#windows-stable
 - install postcss-cli globally via `yarn global add postcss-cli`
 - clone this repo with `git clone https://github.com/cchendoitt/idnyc.git`
 - navigate to the cloned repo: `cd idnyc`
 - install necessary dependencies with `yarn install`
 - add .env file to root directory containing necessary environment variables for finderapp templated apps, and in addition:
   - set/export NODE_ENV envrionment varible to desired build environment (dev, stg, prd)
   - set/export SOCRATA_APP_TOKEN envrionment variable
   - set/export OPEN_DATA_STG/OPEN_DATA_PRD environment variable(s)
 - start the build with `yarn build`
   - ensure that all Jest tests passed - if they didn't, the previous command will fail
 - start up web server (if you don't already have one running) and navigate to dist folder to view the app in the browser
