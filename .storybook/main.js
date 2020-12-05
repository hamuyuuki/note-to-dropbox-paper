const webpack = require("webpack");
const path = require("path");

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
        // Optional
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');

    config.plugins = [
      ...config.plugins,
      new webpack.NormalModuleReplacementPlugin(
        /webextension-polyfill-ts/,
        (resource) => {
          // Gets absolute path to mock `webextension-polyfill-ts` package
          // NOTE: this is required beacuse the `webextension-polyfill-ts`
          // package can't be used outside the environment provided by web extensions
          const absRootMockPath = path.resolve(
            __dirname,
            "../src/__mocks__/webextension-polyfill-ts.ts",
          );

          // Updates the `resource.request` to reference our mocked module instead of the real one
          resource.request = absRootMockPath;
        },
      ),
    ];

    return config;
  },
};
