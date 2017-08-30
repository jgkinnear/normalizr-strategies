/**
 * The strategy function accepts the config as the first param, then matches regular process strategy signature
 * (value, parent, key)
 *
 *  @example
 *      const myProcessStrategy = () => {
 *          return {
 *                  configOptions1: 1,
 *                  configOption2: 2,
 *                  strategy: function () {}
 *          }
 *      }
 */
const strategies = (...rest) => {

	// Loops through the given strategies and runs them, passing the value of each function into the next
	return function (value, parent, key) {
		rest.forEach((ps) => {
			value = ps.strategy.bind(this)(ps, value, parent, key);
		});

		return value;
	};
};
export default strategies;


/**
 * Factory for processStrategy to rename keys and delete the old keys
 *
 * @param keyMap
 * @param deleteKeys
 */
export const renameTo = (keyMap, deleteKeys = true) => (entity) => {
	let keys = Object.keys(keyMap);

	let newEntity = {
		...entity
	};

	keys.forEach((key) => {
		newEntity[keyMap[key]] = newEntity[key];
		if (deleteKeys) {
			delete newEntity[key];
		}
		return newEntity;
	});

	return newEntity;
};

/**
 * Relation process strategy where the value has the parent id
 *
 * @param parentKey
 * @param localId
 * @param parentId
 * @returns {{}}
 */
export const hasParentId = (parentKey, localId, parentId = 'id') => {
	return {
		parentId: parentId,
		localAttribute: localId,
		strategy: function (relationObj, value, parent, /*key*/) {
			return {
				...value,
				[relationObj.localAttribute]: '' + parent[relationObj.parentId]
			};
		}
	};
};

export const requiredFields = (...fields) => {
	return {
		requiredFields: fields,
		strategy: function (relationObj, value, /*parent*/ /*key*/) {
			let requiredFields = relationObj.requiredFields;
			let valueKeys = Object.keys(value);
			requiredFields.forEach((field) => {
				if (valueKeys.indexOf(field) === -1) {
					console.warn(`${field} is a required field.`);
					throw new Error(`${field} is a required field.`);
				}
			});
			return value;
		}
	};
};

export const renameKeys = (keyMap, deleteKeys = true) => {
	return {
		strategy: function (config, value, parent, keys) {
			let keys = Object.keys(keyMap);

			let newEntity = {
				...value
			};

			keys.forEach((key) => {
				newEntity[keyMap[key]] = newEntity[key];
				if (deleteKeys) {
					delete newEntity[key];
				}
				return newEntity;
			});

			return newEntity;
		}
	};
};