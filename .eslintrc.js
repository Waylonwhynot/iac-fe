module.exports = {
    extends: ["@remix-run/eslint-config", "react-app"],
    plugins: ["react", "react-hooks"],
    rules: {
        "import/no-anonymous-default-export": "off",
        "react/display-name": "off",
    },
};
