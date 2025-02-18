#!/usr/bin/env node

/* ========================================================================== *\
	IMPORTS
\* ========================================================================== */
const
	fs = require('fs'),
	path = require('path'),
	listSubmodules = require('./_lib/listSubmodules.js'),
	warningMessage = 'This file is generated by /scripts/create-index.js, do not modify';



/* ========================================================================== *\
	PRIVATE METHODS
\* ========================================================================== */
/**
 *
 *
 */
function generateImports() {
	const
		imports = listSubmodules().map(submodule => `export { default as ${ submodule.name } } from '${ submodule.path }/index.js'`);

	return imports.join('\n');
}
/**
 *
 * @param {*} relativePath
 * @param {*} content
 */
function writeFile(relativePath, content) {
	return fs.writeFileSync(
		path.resolve(process.cwd(), relativePath),
		`// ${ warningMessage }\n\n${ content }`
	);
}


/* ========================================================================== *\
	INITIALIZATION
\* ========================================================================== */
writeFile('src/index.js', generateImports());
