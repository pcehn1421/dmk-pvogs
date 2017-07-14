import os
sourceFile = "./protein.txt"
targetFile = "./proteinJSON.txt"

t = open(targetFile, 'w').close()
t = open(targetFile, 'w')

t.write('{\n\t"data\" : [\n')

with open(sourceFile, 'r') as file:
    for line in file:
        counter = 0
        t.write("\t\t[\n")
        for word in line.split(':'):
            counter = counter + 1
            if counter == 4:
                t.write("\t\t\t\"" + word[:-1] + "\"\n")
                break
            else:
                t.write("\t\t\t\"" + word + "\",\n")

        t.write("\t\t],\n")

t.seek(-2, os.SEEK_CUR)
t.write("\n\t]\n}")
