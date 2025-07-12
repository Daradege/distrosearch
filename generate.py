from jinja2 import Environment, FileSystemLoader
import os
import json

OUTPUT_DIR = "output"
env = Environment(loader=FileSystemLoader('templates'))

os.makedirs(OUTPUT_DIR, exist_ok=True)

with open("database.json", "r") as f:
    distros = json.load(f)
    f.close()

with open("desktops.json", "r") as d:
    desktop = json.load(d)
    d.close()


all_bases = distros["bases"]
all_distros = []

with open(os.path.join(OUTPUT_DIR)+"/desktops/index.html", "w", encoding="utf-8") as f:
    template = env.get_template('desktops.html')
    f.write(template.render(desktops=desktop))

with open(os.path.join(OUTPUT_DIR)+"/distros/index.html", "w", encoding="utf-8") as f:
    template = env.get_template('distros.html')
    f.write(template.render(bases=all_bases))

with open(os.path.join(OUTPUT_DIR)+"/index.html", "w", encoding="utf-8") as f:
    template = env.get_template('index.html')
    f.write(template.render(bases=all_bases))

os.system("cp -r assets " + OUTPUT_DIR)
os.system("cp -r src " + OUTPUT_DIR)

print("HTML generation done.")
