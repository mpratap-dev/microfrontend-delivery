const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const Dotenv = require("dotenv-webpack");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "oye",
    projectName: "delivery",
    webpackConfigEnv,
    argv,
  });

  const { standalone } = webpackConfigEnv;

  return merge(defaultConfig, {
    plugins: [new Dotenv()],
    externals: standalone
      ? []
      : ["single-spa", "react", "react-dom", "@material-ui/core"],
    module: {
      rules: [
        {
          test: /.jsx?$/,
          use: [{ loader: "babel-loader" }],
          exclude: /node_modules/,
        },
        {
          test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
          use: [{ loader: "url-loader?limit=100000" }],
        },
      ],
    },
    // modify the webpack config however you'd like to by adding to this object
  });
};
