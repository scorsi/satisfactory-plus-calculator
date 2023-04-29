import re
import json
import sys

from firebase_admin import credentials, initialize_app, storage
import os
import time


if __name__ == '__main__':
    cred = credentials.Certificate("./serviceAccountKey.json")
    initialize_app(cred, {'storageBucket': 'satisfactory-plus-calculator.appspot.com'})

    print("Uploading map tiles...")

    for dirname, dirnames, filenames in os.walk('./map/layers'):
        if re.match(r'^\./map/layers/[0-9]+/[0-9]+$', dirname) is None:
            continue

        parts = dirname.split('/')
        z = parts[-2]
        x = parts[-1]
        if int(z) != 8:
            continue

        for filename in filenames:
            y = filename.split('.')[0]
            print(f"Uploading map tile (z={z},x={x},y={y})...")

            while True:
                try:
                    blob = storage.bucket().blob(f"map/layers/{z}/{x}/{y}.png")
                    if blob.exists():
                        print("Already exists, skipping...")
                        break
                    blob.upload_from_filename(f"{dirname}/{filename}")
                    blob.make_public()
                    break
                except Exception as e:
                    print("Failed to upload, retrying...")
                    time.sleep(15)
                    pass

            print("Uploaded")

    print("Done!")
