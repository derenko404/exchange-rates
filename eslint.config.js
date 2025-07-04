import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: {
    tsconfigPath: 'tsconfig.app.json',
    overrides: {
      'ts/consistent-type-definitions': ['error', 'type'],
    },
  },
})
