const { NxWebpackPlugin } = require('@nx/webpack');
// const { join } = require('path');

module.exports = {
  resolve: {
    fallback: { "stream": require.resolve("stream-browserify") },
    // resolve: {
    //   fallback: {
    //     path: require.resolve('url/'),
    //     // path: require.resolve('path-browserify'),
    //     // path: require.resolve('process/browser'),
    //   },
    // },
    // output: {
    //   path: join(__dirname, '../../dist/apps/frontend'),
    },
    plugins: [
      new NxWebpackPlugin({
        target: 'node',
        compiler: 'tsc',
        main: './src/main.ts',
        tsConfig: './tsconfig.app.json',
        assets: ['./src/assets'],
        optimization: false,
        outputHashing: 'none',
      }),
    ],
  };
