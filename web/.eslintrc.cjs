module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"plugin:unicorn/all",
		"plugin:promise/recommended",
		"plugin:sonarjs/recommended",
		"plugin:eslint-comments/recommended",
	],
	plugins: ["svelte3", "@typescript-eslint"],
	ignorePatterns: ["*.cjs"],
	overrides: [{ files: ["*.svelte"], processor: "svelte3/svelte3" }],
	settings: {
		"svelte3/typescript": () => require("typescript"),
		// "import/resolver": {
		// 	typescript: {
		// 		project: ["./tsconfig.json", "./.svelte-kit/tsconfig.json"],
		// 	},
		// 	node: {},
		// },
	},
	rules: {
		"import/no-unresolved": "off",
		"import/order": [
			"error",
			{
				groups: [
					"builtin",
					"external",
					"internal",
					["sibling", "parent"],
					"index",
					"unknown",
				],
				"newlines-between": "always",
				alphabetize: {
					order: "asc",
					caseInsensitive: true,
				},
			},
		],
	},
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
};
