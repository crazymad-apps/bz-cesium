const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const del = require("rollup-plugin-delete");
const { terser } = require("rollup-plugin-terser");
const { uglify } = require("rollup-plugin-uglify");

module.exports = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/index.esm.js",
      format: "es",
    },
    {
      file: "dist/index.umd.js",
      format: "umd",
      name: "BzCesium", // 将此替换为你的库的全局变量名称
    },
  ],
  plugins: [
    typescript({ tsconfig: "./tsconfig.json" }),
    del({ targets: "./dist/*" }), // 在这里添加删除插件
    terser(),
    resolve(),
    commonjs(),
    uglify(),
  ],
  external: ["ol", /node_modules/],
};
