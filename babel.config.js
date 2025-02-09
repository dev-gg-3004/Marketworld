module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [ 'react-native-reanimated/plugin',
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }]
  ],
};

// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: [ 'react-native-reanimated/plugin' ,
//   '@realm/babel-plugin',
//   ['@babel/plugin-proposal-decorators', {legacy: true}]],
// };