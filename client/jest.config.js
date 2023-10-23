// module.exports = {
//   testEnvironment: "jsdom",
//   transform: {
//     "^.+\\.jsx$": "babel-jest",
//   },
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
// };
const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/context/GroupContext",
  },
};
module.exports = createJestConfig(customJestConfig);
