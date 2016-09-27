Beautify javascript file
--

# Install
```
npm install dron-jsbeautifier -g
```

# Usage from CLI

For fast beautify file:
```
dron jsbeautifier index.js
```

The module uses a library `js-beautifier`. Read js-beautifier [documentation](https://www.npmjs.com/package/js-beautify) for advanced CLI options.

# Usage from API

You can use `dron-jsbeautifier` module from another Dron module like that:

```js
function createAndBeautifyFile(content) {
	return function() {
		this.touch('index.js').write(content);
		return this.run('jsbeautifier', {
			file: this.touch('index.js').fullname,
			forceOverride: true
		}).then(function() {
			return true;
		});
	}
}
```

# Author
Vladimir Kalmykov <vladimirmorulus@gmail.com>

# License
MIT, 2016