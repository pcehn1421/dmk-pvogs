import os
sourceFile = "./protein.txt"
targetFile = "./proteinJSON.txt"

t = open(targetFile, 'w').close()
t = open(targetFile, 'w')

t.write('{\"data\" : [\n')

with open(sourceFile, 'r') as file:
    for line in file:
        counter = 0
        t.write("[")
        for word in line.split(':'):
            counter = counter + 1
            if counter == 4:
                t.write("\"" + word + "\"],\n")
                break
            else:
                t.write("\"" + word + "\",")


t.close();

data = open(targetFile, "r").read()
data = data[:-2]

t = open(targetFile, 'w')

t.write(data)
t.write("]}")
