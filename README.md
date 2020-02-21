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

## Storybook

To make it easy to develop react components we will use Storybook as a playground for our UI components.

Install Storybook at root level of the project:

```bash
npm i -D @storybook/react
```

Also make sure you install all of Storybook peer dependencies:

```bash
npm install react react-dom --save
npm install babel-loader @babel/core --save-dev
```

Add an npm script to package.json at the root level of the project:

```json
{
  ...
  "scripts": {
    "storybook": "start-storybook"
  },
  ...
}
```

Now create the Storybook main.js file that will search through all of our packages for 'stories'.

From the root level of the project run:

```bash
mkdir .storybook
cd .storybook
touch main.js
```

Then add this to main.js:

```javascript
// ./storybook/main.js

module.exports = {
   stories: ['../packages/**/*.stories.js']
}
```

## Create a package

We are now ready to create our first package. We start with something simple, an avatar component.

From root level of the project run:

```bash
lerna create avatar
```

This will create a package folder named avatar under packages with this boilerplate structure:

```bash
packages/avatar
  __test__
  lib/avatar.js
  README.md
```

The most important file now is the package.json file. We will have to make some changes to tell microbundler about the files that it should bundle.

You must define this attributes:

- __source__ - your source file (same as 1st arg to microbundle)
- __main__ - output path for CommonJS/Node
- __module__ - output path for JS Modules
- __unpkg__ - optional, for unpkg.com

>Microbundle uses __source__ and __main__ as input and output paths by default.

Also change the __files__ attribute. This is used to tell __npm pulish__ which files to include in a published package. Delete the directories attribute as this is not used. (You can keep it if you like. It is used just for meta info).

Add a __build__ and __watch__ script to the scripts attribute.

Your package.json field should look like this now:

```json
{
  "name": "avatar",
  "version": "0.0.0",
  "description": "> TODO: description",
  "author": "Bernt Anker <bernt.anker@rs.no>",
  "homepage": "",
  "license": "ISC",
  "source": "src/avatar.js",
  "main": "dist/avatar.js",
  "module": "dist/avatar.mjs",
  "unpkg": "dist/avatar.umd.js",
  "directories": {
    "lib": "dist",
    "test": "__tests__"
  },
  "files": [
    "dist"
  ],
  "publishConfig": {
    "registry": "http://registry.npmjs.org/"
  },
  "scripts": {
    "test": "echo \"Error: run tests from root\" && exit 1",
    "build": "microbundle",
    "dev": "microbundle watch"
  }
}
```

Now we can create the actual avatar component. 

Rename the lib folder to src:

```bash
mv lib src
```

Replace the content in src/avatar.js with:

```javascript
// src/avatar.js

import React from 'react'
import './avatar.css'

export const Avatar = () => (
    <img src="https://source.unsplash.com/user/erondu" alt="Avatar"></img>
)
```

Add some styling by creating avatar.css:

```css
/* src/avatar.css */

img {
  border-radius: 50%;
  width:100px
}
```

Now you are ready to bundle your fresh new component:

```bash
lerna run build
```

This will generate the different bundles with source-maps under the __dist__ folder

### Add a story to demo the component

Create the folder stories and create a file named avatar.story.js.

```bash
mkdir stories
touch avatar.stories.js
```

Add this the the avatar.stories.js

```javascript
import React from 'react'

import { Avatar } from '../dist/avatar' 
import '../dist/avatar.css'

export default {
  component: Avatar,
  title: 'Design system|Avatar'
}

export const avatar = () => <Avatar></Avatar>
```
>Many tutorials imports the "raw" javascript source file in the stories. I think it is better to use the bundled version instead. You want to make sure the bundled package is working, dont you? ;)

## Tailwind

Too add tailwindcss install the package to root level of the monoropo.

```bash
npm i -D tailwindcss
```

## Linting

## Testing

