import json

with open('proteinSampleJSON.txt', 'r') as myfile:
    data=myfile.read().replace('\n', '')

try:
    json_object = json.loads(data)
except Exception as e:
    print(False)
