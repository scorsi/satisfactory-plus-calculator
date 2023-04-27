import json


def kebab_case_string(s):
    return s.strip().replace(" ", "-").lower()


# because recipe RecipeName is often the name of the produced item, we need to generate a unique id
def generate_recipe_unique_id(recipe):
    return str(hash(
        json.dumps(
            {"ingredients": sorted([i["item_id"] for i in recipe["ingredients"]]),
             "products": sorted([p["item_id"] for p in recipe["products"]]),
             "buildings": sorted(recipe["buildings"])},
            sort_keys=True)
    ))


# because schematic Name is often empty or not relevant, we need to generate a unique id
def generate_schematic_unique_id(recipes):
    return str(hash(json.dumps(sorted([r["recipe_id"] for r in recipes]), sort_keys=True)))


def format_produced_in(produced_in):
    return [kebab_case_string(o["ProducedIn"]) for o in produced_in]


def format_schematic(data_schematic):
    return {
        "name": data_schematic['Name'].strip(),
        "tier": data_schematic['TechTier'],
        "type": data_schematic['Type'].strip(),
        "recipes": []
    }


def format_recipe(data_recipe):
    return {
        "name": data_recipe['RecipeName'].strip(),
        "category": data_recipe['Category'].strip(),
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
        "item_id": kebab_case_string(data_item['Name']),
        "name": data_item['Name'].strip(),
        "produced_in": [],
        "consumed_in": [],
    }


def extract_data_from_schematics_json_file():
    schematics = []
    recipes = []
    items = []

    with open('../data/schematics.json', 'r') as f:
        data = json.load(f)

        for data_schematic in data:
            # if the schematic has no recipes, continue
            if data_schematic['Recipes'] is None or len(data_schematic['Recipes']) == 0:
                continue

            schematic = format_schematic(data_schematic)
            schematic_recipes = []

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

                for ingredient in data_recipe["Ingredients"]:
                    item = format_item(ingredient)
                    items.append(item)
                    recipe["ingredients"].append({
                        "item_id": item["item_id"],
                        "amount": ingredient["Amount"],
                        "manual_rate": ingredient["ManualRate"],
                        "factory_rate": ingredient["FactoryRate"],
                    })

                for product in data_recipe["Products"]:
                    item = format_item(product)
                    items.append(item)
                    recipe["products"].append({
                        "item_id": item["item_id"],
                        "amount": product["Amount"],
                        "manual_rate": product["ManualRate"],
                        "factory_rate": product["FactoryRate"],
                    })

                recipe["recipe_id"] = generate_recipe_unique_id(recipe)
                schematic_recipes.append(recipe)

            if len(schematic_recipes) > 0:
                schematic["schematic_id"] = generate_schematic_unique_id(schematic_recipes)

                for recipe in schematic_recipes:
                    recipe["schematic_id"] = schematic["schematic_id"]
                    recipes.append(recipe)

                schematics.append(schematic)

    return schematics, recipes, items


def process_data(list_schematics, list_recipes, list_items):
    schematics = {}
    recipes = {}
    items = {}

    for schematic in list_schematics:
        schematic_id = schematic["schematic_id"]

        if schematic_id in schematics:
            print("Duplicate schematic: " + schematic_id)
            print("")
            print(schematic)
            print(schematics[schematic_id])
            print("-----")
            continue

        schematics[schematic_id] = schematic

    for item in list_items:
        item_id = item["item_id"]

        if item_id in items:
            continue

        items[item_id] = item

    for recipe in list_recipes:
        recipe_id = recipe["recipe_id"]

        if recipe_id in recipes:
            print("Duplicate recipe: " + recipe_id)
            print("")
            print(recipe)
            print(recipes[recipe_id])
            print("-----")
            continue

        recipes[recipe_id] = recipe

        for products in recipe["products"]:
            item_id = products["item_id"]

            if item_id not in items:
                print("Missing item: " + item_id)
                continue

            items[item_id]["produced_in"].append(recipe_id)

        for ingredients in recipe["ingredients"]:
            item_id = ingredients["item_id"]

            if item_id not in items:
                print("Missing item: " + item_id)
                continue

            items[item_id]["consumed_in"].append(recipe_id)

    return schematics, recipes, items


(schematics, recipes, items) = extract_data_from_schematics_json_file()
(schematics, recipes, items) = process_data(schematics, recipes, items)

# print(schematics)
# print("")
# print(recipes)
# print("")

item = items["crushed-stiratite"]
print(item)
print([recipes[r]["name"] for r in item["produced_in"]])
print([recipes[r]["name"] for r in item["consumed_in"]])
