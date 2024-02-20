package utils

import "encoding/json"

func ConvertStructToMap(obj interface{}) (map[string]interface{}, error) {
	var objInterface map[string]interface{}
	objJson, err := json.Marshal(obj)

	json.Unmarshal(objJson, &objInterface)
	return objInterface, err
}
