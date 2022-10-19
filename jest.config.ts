import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['pgdata'],
}

export default config
