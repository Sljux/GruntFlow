# grunt-flow

> Write FlowThings Tasks in your IDE and upload them easily

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-flow --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-flow');
```

## The "flow" task

### Overview
In your project's Gruntfile, add a section named `flow` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  flow: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.credentials
Type: `Object`
**Required**

Contains your FlowThings credentials. Must contain `username` and `token` keys.

#### options.destination
Type: `String`
**Required**

Path to a destination Flow, where the Task will stream created Drops.

#### options.periodicity
Type: `Long` Default: `60000`
*Optional*

Number of milliseconds between Task activations.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Aljosa Sljuka. Licensed under the MIT license.
