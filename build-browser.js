// Adapted from the build-browser used by validator.js
// See: https://github.com/validatorjs/validator.js
// Also see: https://github.com/validatorjs/validator.js/blob/master/build-browser.js

/* eslint import/no-extraneous-dependencies: 0 */
import fs from "fs";
import { rollup } from "rollup";
// import babel from "rollup-plugin-babel";
import babel from "@rollup/plugin-babel";
import babelPresetEnv from "@babel/preset-env";
import pkg from "./package.json";

rollup({
  input: "index.js",
  plugins: [
    babel({
      presets: [[babelPresetEnv, { modules: false }]],
      babelrc: false,
    }),
  ],
})
  .then((bundle) =>
    bundle.write({
      file: "./browser/hirnfick.js",
      format: "umd",
      name: pkg.name,
      banner: `/*!\n${String(fs.readFileSync("./LICENSE"))
        .trim()
        .split("\n")
        .map((l) => ` * ${l}`)
        .join("\n")}\n */`,
    })
  )
  .catch((e) => {
    process.stderr.write(`${e.message}\n`);
    process.exit(1);
  });