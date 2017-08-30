# Normalize-Strategies
An easy method of composing normalizr strategies

Install with [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/):

npm:
```sh
npm install normalizr-strategies --save
```

Yarn (note that `yarn add` automatically saves the package to the `dependencies` in `package.json`):
```sh
yarn add normalizr-strategies
```

## Usage

Use with [Node.js](https://nodejs.org/en/), [Browserify](http://browserify.org/), or [webpack](https://webpack.github.io/):

```js
import {schema} from 'normalizr';
import strategies, {renameKeys, requiredFields} from 'normalizr-strategies';

const MySchema = new schema.Entity('myschema', {}, {
	processStrategy: strategies(
		renameKeys({
			server_id: 'id', // names 'server_id' to 'id'
		}),
		
		requiredFields('server_id', 'anotherRequiredField'),
    )
});
```

## Built in strategies

### renameKeys
### requiredFields
### hasParentId

## Custom strategies
A strategy is a function that returns an object in the following structure

```js
{
	strategy: function (config, value, parent, key) {
		// ...apply strategy
		return value; 
	}
}
```

### Example
```js
let addHardCodedProps = () => {
	return {
		prop1: 1,
		prop2: 1,
		strategy: function (config, value) {
			return {
				...value,
				prop1: config.prop1,
				prop2: config.prop2,
			}
		}
	}
}

// Usage

const MySchema = new schema.Entity('myschema', {}, {
	processStrategy: strategies(
		renameKeys({
			server_id: 'id', // names 'server_id' to 'id'
		}),
		addHardCodedProps(),
    )
});
```

