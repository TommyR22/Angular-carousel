# CarouselApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.
In this Angular repo there are two projects:
* a library project (carousel)
This is the library of components and services that we want to provide. This is the code that we could publish to npm for example.
* an application project (carousel-app)
This will be a test harness for our library. Sometimes this application is used as documentation and example usage of the library.

## Development
create application project: `ng new carousel-app`
cd carousel-app
create lib project with prefix: `ng generate library carousel --prefix=tr`

In `projects/` we have the new lib created.
To build our new lib: `ng build --prod carousel`

To use it in application project, import it in module:
```
import { CarouselModule } from 'carousel';
```
create task npm in root package.json:
```
"build_lib": "ng build --prod carousel",
"npm_pack": "cd dist/carousel && npm pack",
"package": "npm run build_lib && npm run npm_pack"
```

last command create dist folder with lib and pack in inside .tgz

Publish on npm: [npm Tutorial](https://docs.npmjs.com/getting-started/publishing-npm-packages).


## Usage

run on a project command: `npm install ../path-to-tgz-lib/example-lib-0.0.1.tgz`
In application project, import lib in module:
```
import { CarouselModule } from 'carousel';

import: {
  CarouselModule
}
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



Copy 'src/assets' folder inside '/dist/carousel/lib'


