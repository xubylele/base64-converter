const esbuild = require('esbuild');

const args = process.argv.slice(2);
const watch = args.includes('--watch');
const production = args.includes('--production');

const extensionConfig = {
	entryPoints: ['./src/extension.ts'],
	bundle: true,
	outfile: 'out/extension.js',
	external: ['vscode'],
	format: 'cjs',
	platform: 'node',
	sourcemap: !production,
	minify: production,
	loader: {
		'.ts': 'ts',
	},
};

const webviewConfig = {
	entryPoints: ['./src/views/App.tsx'],
	bundle: true,
	outfile: 'out/App.js',
	format: 'esm',
	platform: 'browser',
	sourcemap: !production,
	minify: production,
	loader: {
		'.tsx': 'tsx',
		'.ts': 'ts',
	},
};

async function build() {
	try {
		if (watch) {
			const extensionContext = await esbuild.context(extensionConfig);
			const webviewContext = await esbuild.context(webviewConfig);
			await Promise.all([extensionContext.watch(), webviewContext.watch()]);
		} else {
			await Promise.all([esbuild.build(extensionConfig), esbuild.build(webviewConfig)]);
		}
	} catch (error) {
		console.error('Build failed:', error);
		process.exit(1);
	}
}

build();
