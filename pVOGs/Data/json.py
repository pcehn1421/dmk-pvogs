import os
sourceFile = "./sample/genome.txt"
targetFile = "./sample/target.txt"

t = open(targetFile, 'w').close() #clean the file
t = open(targetFile, 'w')

t.write('{\n\t"data" : [\n')

with open(sourceFile, 'r') as file:
    for line in file:
        t.write("\t\t[\n")
        counter = 0
        proteins = 0
        for word in line.split('\t'):
            if counter == 7 or counter == 14:
                counter = counter +  1
                continue
            if counter == 4:
                proteins = int(word)
                counter = 5
                continue
            if counter == 0:
                t.write("\t\t\t\"" + word + "|")
                counter = 1
                continue
            if counter == 1:
                t.write(word + "\",\n")
                counter = 2
                continue

            t.write('\t\t\t"')

            if counter == 2:
                accession = word
                if "segment" in word:
                    if "phiNN" in word:
                        t.write("KJ957164,KJ957165,KJ957166" + "\",\n")
                    elif "phi8" in word:
                        t.write("NC_003299,NC_003300,NC_003301" + "\",\n")
                    elif "phi6" in word:
                        t.write("NC_003714,NC_003715,NC_003716" + "\",\n")
                    elif "phi2954" in word:
                        t.write("NC_012091,NC_012092,NC_012093" + "\",\n")
                    elif "phi13" in word:
                        t.write("NC_004170,NC_004171,NC_004172" + "\",\n")
                    elif "phi12" in word:
                        t.write("NC_004173,NC_004174,NC_004175" + "\",\n")
                else:
                    t.write(word + "\",\n")
            elif counter == 3:
                if "|" in word:
                    res = int(word.split("|")[0][3:]) + int(word.split("|")[1][3:]) + int(word.split("|")[2][3:])
                    t.write(str(res) + "\",\n")
                else:
                    t.write(word[3:] + "\",\n")
            elif counter == 5:
                proteins = proteins + int(word)
                t.write(str(proteins) + "|" + accession + "\",\n")
            elif counter != 13:
                t.write(word + "\",\n")
            else:
                t.write(word + "\"\n")
            counter = counter + 1
        t.write("\t\t],\n")

t.close();

data = open(targetFile, "r").read() 
data = data[:-2]

t = open(targetFile, 'w')

t.write(data)
t.write("\n\t]\n}")
