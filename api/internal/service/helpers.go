package service

import "encoding/json"

func nullStr(s string) *string {
	if s == "" {
		return nil
	}
	return &s
}

func jsonArray(v []string) []byte {
	if v == nil {
		v = []string{}
	}
	b, err := json.Marshal(v)
	if err != nil {
		return []byte("[]")
	}
	return b
}
