module.exports = {
    "parser": "babel-eslint", // 指定解析器(默认使用Espree)
    "env": {
        "browser": true,
        "es2020": true,
        "node":true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "rules": {
        "no-unused-vars":"off"
    }
};
