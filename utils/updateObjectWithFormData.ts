import _ from "lodash";

const VALID_FINAL_PATH = /\w+/

function updateFieldWithFormData<T>(modelRef: T, path: string, attrValue: any): T {
	const fieldRegex = RegExp('^\\.?(\\w*)', 'g');
	const field = fieldRegex.exec(path);
	if (field && field[1]) {
		modelRef[field[1]] = updateFieldWithFormData(modelRef[field[1]], path.substring(fieldRegex.lastIndex), attrValue);
	} else {
		if (path.length !== 0 && !VALID_FINAL_PATH.test(path)) {
			throw new Error(`Invalid path for object: ${path}`);
		}
		return attrValue
	}
	return modelRef
}

export default function <T>(baseData: T, data: { [key: string]: any }): T {
	Object.keys(data).forEach(attr => {
		baseData = updateFieldWithFormData(baseData, attr, data[attr])
	})

	return baseData;
}
