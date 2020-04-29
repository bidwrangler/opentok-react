module.exports = function babelConfigMaker(api) {
  // Will not compile without
  if (!api.env('test')) api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        // Smaller and faster code, not 100% spec compliant
        loose: true,
        // Only load polyfills for used features
        useBuiltIns: 'usage',
        // Use most recent core-js version (default setting is 2)
        corejs: 3
      }
    ],
    '@babel/preset-react'
  ]

  const plugins = [
    'babel-plugin-styled-components',
    '@babel/plugin-proposal-optional-chaining',
    // Needed as we use class properties in our components
    '@babel/plugin-proposal-class-properties'
  ]

  return {
    presets,
    plugins
  }
}
