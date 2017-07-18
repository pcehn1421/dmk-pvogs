import json

with open('proteinJSON.txt', 'r') as myfile:
    data=myfile.read().replace('\n', '')

try:
    json_object = json.loads(data)
except Exception as e:
    print(e)
    print(False)
