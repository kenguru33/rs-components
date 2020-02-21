# RS-COMPONENTS - Monorepo

## lerna setup
Initialize a lerna managed monorepo:

```bash
npx lerna init
```

This will create the following filestructure:

```bash
packages/
lerna.json
package.json
```

- __packages__ is the folder where all the packages you create lives. (This can be custamized in lerna.json)
-  __package.json__ is the root level package definition file. This will list all the packages in the monorepo and contains the shared config among the packages.
- __lerna.json__ is the lerna config file. (more on lerna.json under)

The lerna.json file initially looks like this:

```json
{
  "packages": [
    "packages/*"
  ],
  "version": "0.0.0"
}
```

__packages__ key in lerna.json points to the the directory where all the packages lives. Here it has been set to the packages, but you are free name this what ever you like.

## Setup Git

Setup git by running (from the root level of the project):

Download a git ignore file for node:

```bash
curl https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore --output .gitignore
```

Put the project under version git version controll and commit:

```bash
git init
git add .
git commit -m "initial lerna setup
```

## Bundler

We will use the microbundle as a bundler for all of our packages. This is a very nice wrapper around rollup.js.

Install microbundle:

Make sure you are at the root level of the project and run:

```bash
npm i -D microbundle
```
