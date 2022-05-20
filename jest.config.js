module.exports = async () => {
    return {
        globals: {

        },
        transform: {
            "^.+\\.(t|j)sx?$": ["@swc/jest"],
        },
    }

};