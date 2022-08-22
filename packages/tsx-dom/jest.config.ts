module.exports = {
    displayName: "tsx-dom",
    preset: "../../jest.preset.ts",
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.spec.json",
        },
    },
    transform: {
        "^.+\\.[tj]sx?$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "html"],
    coverageDirectory: "../../coverage/packages/tsx-dom",
    testEnvironment: "node",
};
