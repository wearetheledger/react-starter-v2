// Based on the Ant Design documentation:
// https://ant.design/docs/react/use-with-create-react-app#Advanced-Guides
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const modifyVars = require("./src/style/ant-theme");
const { when } = require("@craco/craco");

module.exports = {
	babel: {
		plugins: [
			"lodash",

			// Only add these imports when not running tests, 
			...when(process.env.NODE_ENV !== "test", () => [[
				"import",
				{ libraryName: "antd", libraryDirectory: "es", style: true }
			]], [])
		]
	},
	jest: {
		configure: (jestConfig, { env, paths, resolve, rootDir }) => {

			jestConfig.moduleNameMapper['^.+\\.module\\.(css|sass|scss|less)$'] = 'identity-obj-proxy';
			jestConfig.moduleNameMapper["@(store|style|pages|components|utils|translations|assets|api)(|.*)$"] = "<rootDir>/src/$1/$2";
			jestConfig.moduleNameMapper["__tests__(|.*)$"] = "<rootDir>/src/__tests__/$1";
			jestConfig.testPathIgnorePatterns = ["node_modules", "src/__tests__/helpers/"]

			return jestConfig;
		}
	},
	plugins: [
		{
			plugin: {
				overrideWebpackConfig: ({ webpackConfig }) => {

					// Tree shaking for lodash
					// webpackConfig.resolve.plugins.push(new LodashModuleReplacementPlugin({
					// 	collections: true,
					// 	paths: true,
					// 	memoizing: true,
					// 	flattening: true
					// }));

					// Add custom paths resolver for typescript
					webpackConfig.resolve.plugins.push(new TsconfigPathsPlugin({}))

					const gitHubIssueUrl = (repo, query) =>
						`https://github.com/${repo}/issues${
						query ? `?q=is%3Aissue+${query}` : ""
						}`;

					const throwInvalidConfigError = ({
						message,
						gitHubIssueQuery: query
					}) => {
						throw new Error(
							`${message}\n\n` +
							"Did you update create-react-app or craco recently? \n" +
							"Please take a look at some recent issues in craco and " +
							"create-react-app to see if someone has found a solution: \n\n" +
							`* ${gitHubIssueUrl(
								"sharegate/craco",
								query
							)}\n` +
							`* ${gitHubIssueUrl(
								"facebook/create-react-app",
								query
							)}\n`
						);
					};

					const lessExtension = /\.less$/;

					const { getLoader, loaderByName } = require("@craco/craco");
					const { isFound, match: fileLoaderMatch } = getLoader(
						webpackConfig,
						loaderByName("file-loader")
					);
					if (!isFound) {
						throwInvalidConfigError({
							message:
								"Can't find file-loader in the webpack config!",
							gitHubIssueQuery: "webpack+file-loader"
						});
					}
					fileLoaderMatch.loader.exclude.push(lessExtension);

					const lessRule = {
						test: lessExtension,
						use: [
							{
								loader: require.resolve("style-loader")
							},
							{
								loader: require.resolve("css-loader")
							},
							{
								loader: require.resolve("less-loader"),
								options: {
									modifyVars,
									javascriptEnabled: true
								}
							}
						]
					};

					const oneOfRule = webpackConfig.module.rules.find(
						rule => typeof rule.oneOf !== "undefined"
					);

					if (!oneOfRule) {
						throwInvalidConfigError({
							message:
								"Can't find a 'oneOf' rule under module.rules in the webpack config!",
							gitHubIssueQuery: "webpack+rules+oneOf"
						});
					}
					oneOfRule.oneOf.push(lessRule);

					return webpackConfig;
				}
			}
		}
	]
};
