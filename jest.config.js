/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // Map .js imports to their actual paths without extension
  },
  moduleFileExtensions: ["ts", "js", "json", "node"]
}