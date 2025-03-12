module.exports = {
  preset: 'ts-jest', // Use ts-jest for TypeScript
  testEnvironment: 'jest-environment-jsdom', // Use jsdom for DOM-related tests
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files using ts-jest
    '^.+\\.jsx?$': 'babel-jest', // Transform JS/JSX files using Babel
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', // Handle CSS imports
  },
  testMatch: [
    '**/?(*.)+(spec|test).ts?(x)', // Match files with .test.ts or .test.tsx extensions
  ],
};
