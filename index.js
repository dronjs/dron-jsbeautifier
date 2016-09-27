var beautify = require('js-beautify').js_beautify;

/**
 * Convert dashed object keys to bottom dashes
 * @return {[type]} [description]
 */
function keysToBottomDashes(object) {
	var bd = {};
	for (var prop in object) {
		if (object.hasOwnProperty(prop)) bd[prop.replace('-', '_')] = object[prop];
	}
	return bd;
}

/**
 Dron module `dron-jsbeautifier`*
*/
function dronJsbeautifier(file, options) {
	return function() {
		var content = beautify(file.read(), Object.assign({
			indent_size: 2
		}, options||{}));
		
		if (options.forceOverride) {
			file.write(content);
			return true;
		} else {
			console.log(content);
			return this.run('confirm', {
				question: 'Do you like?'
			}).then(function(a) {
				if (a) {
					file.write(content);
					return true;
				} else {
					return null;
				}
			});
		}
	}
}

function validate(filename, options) {
	return function() {
		var file = this.touch(filename);
		if (!filename||!file.exists()) {
			this.warn('No file found');
			return null;
		} else {
			return dronJsbeautifier(file, keysToBottomDashes(options));
		}
	}
}

module.exports = function factory(argv) {
	var fileName = argv._&&"string"===typeof argv._[1] ? argv._[1] : (argv.file || false);
	return validate(fileName, argv);
}