const presets = [
  [
    "@babel/env",
    {
      targets: { // указать цели, для полифилов
        chrome: "64",
        android: "67",
        firefox: "50",
        safari: "11.1",
        edge: "15",
      },
      useBuiltIns: "usage",
      corejs: "3.6.4"
    }
  ],
];

module.exports = { presets };
