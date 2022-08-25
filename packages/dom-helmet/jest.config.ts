module.exports = {
    displayName: "dom-helmet",
    preset: "../../jest.preset.ts",
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.spec.json",
        },
    },
    transform: {
        "^.+\\.[tj]s$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "js", "html"],
    coverageDirectory: "../../coverage/packages/dom-helmet",
    testPathIgnorePatterns: ["/node_modules/", "/utils.test.ts"],
};
