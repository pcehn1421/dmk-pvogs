sourceFile = "./sample.txt"
targetFile = "./JSONSample.txt"

t = open(targetFile, 'w').close()
t = open(targetFile, 'w')

t.write('{\n\t"data" : [\n')

with open(sourceFile, 'r') as file:
    for line in file:
        t.write("\t\t[\n")
        counter = 0
        proteins = 0
        for word in line.split('\t'):
            if counter == 1 or counter == 7 or counter == 14:
                counter = counter +  1
                continue
            if counter == 4:
                proteins = int(word)
                counter = counter + 1
                continue
            t.write('\t\t\t"')
            if counter == 3:
                t.write(word[3:] + "\",\n")
            elif counter == 5:
                proteins = proteins + int(word)
                t.write(str(proteins) + "\",\n")
            elif counter != 13:
                t.write(word + "\",\n")
            else:
                t.write(word + "\"\n")
            counter = counter + 1
        t.write("\t\t],\n")

t.write("\t]\n}")
