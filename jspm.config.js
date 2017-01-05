SystemJS.config({
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/",
    "dollar-array/": "src/"
  },
  browserConfig: {
    "baseURL": "/",
    //"production":true
  },
  devConfig: {
    "map": {
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "core-js": "npm:core-js@1.2.7",
      "path": "npm:jspm-nodelibs-path@0.2.1",
      "fs": "npm:jspm-nodelibs-fs@0.2.0",
      "process": "npm:jspm-nodelibs-process@0.2.0"
    },
    "packages": {
      "npm:babel-runtime@5.8.38": {
        "map": {}
      },
      "npm:core-js@1.2.7": {
        "map": {
          "systemjs-json": "github:systemjs/plugin-json@0.1.2"
        }
      }
    }
  },
  transpiler: "plugin-babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  map: {
    "babel": "npm:babel-core@5.8.38"
  },
  packages: {
    "dollar-array": {
      "main": "dollar-array.js",
      "format":"esm"
    },
    "ascend": {
      "main": "../src/ascend.js",
      "format":"esm"
    },
    "prop-exists": {
      "main": "../src/prop-exists.js",
      "format":"esm"
    },
    "filter-by-prop": {
      "main": "../src/filter-by-prop.js",
      "format":"esm"
    },
    "invert": {
      "main": "../src/invert.js",
      "format":"esm"
    },
    "randomize": {
      "main": "../src/randomize.js",
      "format":"esm"
    },
    "random": {
      "main": "../src/random.js",
      "format":"esm"
    },
    "descend": {
      "main": "../src/descend.js",
      "format":"esm"
    },
    "group": {
      "main": "../src/group.js",
      "format":"esm"
    },
    "to-object": {
      "main": "../src/to-object.js",
      "format":"esm"
    },
    "private": {
      "main": "../src/private.js",
      "format":"esm"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.18"
  },
  packages: {}
});
