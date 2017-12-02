System.config({
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/"
  },
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
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
    "babel": "npm:babel-core@5.8.38",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.18",

    "dollar-array":"src/dollar-array.js",
    "ascend":"src/ascend.js",
    "prop-exists":"src/prop-exists.js",
    "filter-by-prop":"src/filter-by-prop.js",
    "invert":"src/invert.js",
    "randomize":"src/randomize.js",
    "random":"src/random.js",
    "private":"src/private.js",
    "descend":"src/descend.js",
    "group":"src/group.js",
    "to-object":"src/to-object.js"
  }
});

// System.config({
//   browserConfig: {
//     "baseURL": "./src",
//     "production":true
//   },
//   packageConfigPaths: [
//     "npm:@*/*.json",
//     "npm:*.json"
//   ],
//   map: {
//     "plugin-babel": "npm:systemjs-plugin-babel@0.0.18"
//   }
// });
