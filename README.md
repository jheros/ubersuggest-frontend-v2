# Ubersuggest Frontend V2

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Dependencies

Node Version: `16.15.1`

NPM Version: `8.11.0`

## Common-UI Components Library

The common-ui components library is a git submodule. For first time setup you need to init this submodule locally before it can pull the sources files. Open a terminal at ./common-ui and run:
```sh
git submodule update --init --recursive
```

A git submodule is a separate git repo inside another repo. You can do anything you can normally do in any git repo, just starting at the root of this folder there is a different origin.

Install packages:
```sh
npm install
```

Build the common-ui components:
```sh
npm run build
```

The common-ui component library is now ready to use and the react components will have been generated in the dist/esm and dist/cjs directory.

## Frontend V2 APP

Install dependencies:
```sh
npm install
```

To start development server against `staging` stage, run:
```sh
npm run start:staging
```

To use other stages, run:
```sh
sh scripts/devstart.sh <stage_name>
```

or
```bash
bash scripts/devstart.sh <stage_name>
```

## Developing common-ui components while in frontend-v2

In root of common-ui, run:
```sh
npm run watch
```

or, in project root, run:
```sh
npm run dev:common-ui
```
