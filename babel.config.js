module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'], // 쉼표 수정 및 확장자 업데이트
        alias: {
          '@/pages': './src/pages',
          '@/components': './src/components',
          '@/assets': './src/assets',
        },
      },
    ],
  ],
};
