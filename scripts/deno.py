import os
import shutil
import re

src_path = "./src"
deno_path = "./deno"
regex = r"';$"

if os.path.exists(deno_path):
    if os.path.isdir(deno_path):
        shutil.rmtree(deno_path)
    else:
        os.remove(deno_path)

shutil.copytree(src_path, deno_path)

for root, dirs, files in os.walk(deno_path):
    for file in files:
        file_path = os.path.join(root, file)
        lines = []
        with open(file_path, "r") as file_handle:
            lines = file_handle.readlines()
            for i in range(len(lines)):
                if lines[i].startswith('import'):
                    lines[i] = re.sub(regex, ".ts';", lines[i])

        with open(file_path, "w") as file_handle:
            file_handle.writelines(lines)
