module.exports = {
    presets: ['module:metro-react-native-babel-preset', 'module:react-native-dotenv'],
    env: {
        dev: {
            plugins: [
                [
                    'module-resolver',
                    {
                        root: ['./src'], extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'], alias: {
                            "tests": ["./__tests__/"],
                        }
                    }]

            ],
        },
        production: {
            plugins: [['transform-remove-console']]
        }
    }
};
