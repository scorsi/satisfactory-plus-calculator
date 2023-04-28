import json


def kebab_case_string(s):
    return s.replace(".", "").replace("_", "-").replace(" ", "-").lower()


# because sometime buildings are duplicated, we need to remove duplicates
def format_produced_in(produced_in):
    return sorted(list(set([kebab_case_string(o["ProducedIn"].strip()) for o in produced_in])))


def format_schematic(data_schematic):
    return {
        "id": kebab_case_string(data_schematic['ClassName'].strip()),
        "name": data_schematic['Name'].strip(),
        "tier": data_schematic['TechTier'],
        "categories": {"0": "schematic", "1": kebab_case_string(data_schematic['Type'].strip())},
        "recipes_ids": []
    }


def format_recipe(data_recipe):
    return {
        "id": kebab_case_string(data_recipe['ClassName'].strip()),
        "name": data_recipe['RecipeName'].strip(),
        "categories": {"0": "recipe", "1": kebab_case_string(data_recipe['Category'].strip())},
        "ingredients": [],
        "products": [],
        "buildings": format_produced_in(data_recipe["ProducedIn"]),
        "duration": {
            "manual": data_recipe['ManualDuration'],
            "manufacturing": data_recipe['ManufacturingDuration']
        },
    }


def format_item(data_item):
    return {
        "id": kebab_case_string(data_item['ClassName'].strip()),
        "name": data_item['Name'].strip(),
        "categories": {"0": "item"},
        "produced_in": [],
        "consumed_in": [],
    }


def merge_item(a, b):
    return {
        "id": a["id"],
        "name": a["name"],
        "categories": a["categories"],
        "produced_in": sorted(list(set(a["produced_in"] + b["produced_in"]))),
        "consumed_in": sorted(list(set(a["consumed_in"] + b["consumed_in"]))),
    }


def extract_data():
    schematics = {}
    recipes = {}
    items = {}

    with open('dirty_data/schematics.json', 'r') as f:
        schematics_data = json.load(f)
        for data_schematic in schematics_data:
            # if the schematic has no recipes, continue
            if data_schematic['Recipes'] is None or len(data_schematic['Recipes']) == 0:
                continue

            schematic = format_schematic(data_schematic)

            for data_recipe in data_schematic['Recipes']:
                # if the recipe has events, continue
                if data_recipe['Events'] is not None and len(data_recipe['Events']) != 0:
                    continue

                # if the recipe start by Swatch, continue
                if data_recipe["RecipeName"].startswith("Swatch"):
                    continue

                # if the recipe has no ingredients and products, continue
                if data_recipe["Ingredients"] is None or len(data_recipe["Ingredients"]) == 0 \
                        or data_recipe["Products"] is None or len(data_recipe["Products"]) == 0:
                    continue

                recipe = format_recipe(data_recipe)
                recipe["schematic_id"] = schematic["id"]
                schematic["recipes_ids"].append(recipe["id"])

                for ingredient in data_recipe["Ingredients"]:
                    item = format_item(ingredient)
                    item["consumed_in"].append(recipe["id"])

                    if item["id"] in items:
                        item = merge_item(items[item["id"]], item)
                    items[item["id"]] = item

                    recipe["ingredients"].append({
                        "item_id": item["id"],
                        "amount": ingredient["Amount"],
                        "manual_rate": ingredient["ManualRate"],
                        "factory_rate": ingredient["FactoryRate"],
                    })

                for product in data_recipe["Products"]:
                    item = format_item(product)
                    item["produced_in"].append(recipe["id"])

                    if item["id"] in items:
                        item = merge_item(items[item["id"]], item)
                    items[item["id"]] = item

                    recipe["products"].append({
                        "item_id": item["id"],
                        "amount": product["Amount"],
                        "manual_rate": product["ManualRate"],
                        "factory_rate": product["FactoryRate"],
                    })

                if recipe["id"] in recipes:
                    print("Duplicate recipe: " + recipe["id"])

                recipe["ingredients"] = sorted(recipe["ingredients"], key=lambda i: i["item_id"])
                recipe["products"] = sorted(recipe["products"], key=lambda i: i["item_id"])

                recipes[recipe["id"]] = recipe

            if schematic["id"] in schematics:
                print("Duplicate schematic: " + schematic["id"])
            schematics[schematic["id"]] = schematic

    return schematics, recipes, items


# def clean_data(schematics, recipes, items):
#     for item_id in items:
#         item = items[item_id]
#         item_recipes = [recipes[r] for r in item["produced_in"]]
#         secondary_categories = [r["categories"]["1"] for r in item_recipes]
#         print(secondary_categories)
#
#     return schematics, recipes, items


if __name__ == '__main__':
    (schematics, recipes, items) = extract_data()
    # (schematics, recipes, items) = clean_data(schematics, recipes, items)

    # item = items["desc-ironingot-c"]
    # rr = [recipes[r] for r in item["produced_in"]]
    # print(item)
    # print(rr)
    # print(schematics)
    # print(recipes)
    # print(items)

    with open('cleaned_data/schematics.json', 'w') as schematics_file, \
            open('cleaned_data/recipes.json', 'w') as recipes_file, \
            open('cleaned_data/items.json', 'w') as items_file:
        json.dump(schematics, schematics_file, indent=2)
        json.dump(recipes, recipes_file, indent=2)
        json.dump(items, items_file, indent=2)
