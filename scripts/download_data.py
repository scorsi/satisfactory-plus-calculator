import requests


def download_data():
    r = requests.get("http://localhost:8080/getSchematics")
    schematics = r.json()
    with open("dirty_data/schematics.json", "w") as f:
        f.write(r.text)


if __name__ == '__main__':
    download_data()
