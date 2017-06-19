sourceFile = "./genome.txt"
targetFile = "./target.txt"

t = open(targetFile, 'w').close()
t = open(targetFile, 'w')

t.write('{\n\t"data" : [\n')

with open(sourceFile, 'r') as file:
    for line in file:
        t.write("\t\t[\n")
        counter = 0
        for word in line.split('\t'):
            t.write('\t\t\t"')
            t.write(word[:-1])
            t.write('"')
            counter = counter + 1
            if counter != 15:
                t.write(",\n")
            else:
                t.write("\n")
        t.write("\t\t],\n")

t.write("\t]\n}")
