module.exports = {
    transform: {
        ".+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js"],
    setupFiles: ["./setupTests.ts"],
};
