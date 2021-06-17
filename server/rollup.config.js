import json from "@rollup/plugin-json";

export default {
    input: 'src/server.js',
    output: {
      file: 'build/bundle.js',
      format: 'cjs'
    },
    plugins: [
      // ... other rollup plugins
      json()
    ]
  };