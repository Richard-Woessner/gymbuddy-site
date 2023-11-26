# Project Title

<!-- ABOUT THE PROJECT -->
## About The Project
Here's a blank template to get started.


### Built With

* [![React][React.js]][React-url]
* [![React-router][React-router]][React-router-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Ant Design][Ant Design]][Ant-Design-url]

## Project Structure
```
├── README.md
├── craco.config.js - https://github.com/dilanx/craco; CRA Configuration Override
├── gitignore
├── json-server - mock data in local environment
│   ├── data
│   │   └── api-getExample.json
│   ├── data.js
│   ├── router-rewrite.json
│   └── server.js
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── AppRouter.tsx - Configuration for react-router
│   ├── api 
│   │   └── api.ts - axios instance preprocessing
│   ├── index.scss - main style file
│   ├── index.tsx - entry file
│   ├── logo.svg
│   ├── pages
│   │   └── Main - example for page component
│   │       ├── Main.scss
│   │       └── Main.tsx
│   ├── react-app-env.d.ts - react with ts
│   ├── reportWebVitals.ts - CRA default file
│   ├── setupProxy.js - proxy  for developing locally
│   └── setupTests.ts  - CRA default file
├── stylelint.config.cjs - Configuration for style linting rules
├── .stylelintignore - Ignore file for style linting
├── .prettierrc.cjs - Configuration for code formatting using Prettier
├── .eslintrc.cjs - Configuration for JavaScript and TypeScript linting rules
└── tsconfig.json - Configuration for TypeScript compilation
```

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

<!-- USAGE EXAMPLES -->
## Usage

If the project is a package or a tool, introduce how to use it. Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_


### Develop

1. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Install NPM packages
   ```sh
   npm install --legacy-peer-deps
   ```

<!-- CONTRIBUTING -->
## Deploy 




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[React-router]: https://img.shields.io/badge/reactrouter-000000?style=for-the-badge&logo=reactrouter&logoColor=white
[React-router-url]: https://reactrouter.com/en/main

[TypeScript]: https://img.shields.io/badge/typescript-3178c6?style=for-the-badge&logo=typescript&logoColor=ffffff
[TypeScript-url]: https://www.typescriptlang.org/

[Ant Design]: https://img.shields.io/badge/antdesign-000000?style=for-the-badge&logo=antdesign&logoColor=0170FE
[Ant-Design-url]: https://ant.design/

