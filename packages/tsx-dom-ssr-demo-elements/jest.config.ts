/* eslint-disable */
export default {
    displayName: "tsx-dom-ssr-demo-elements",
    setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],
    transform: {
        "^.+\\.[tj]s$": "babel-jest",
    },
    moduleFileExtensions: ["ts", "js", "html"],
    coverageDirectory: "../../coverage/packages/tsx-dom-ssr-demo-elements",
};
