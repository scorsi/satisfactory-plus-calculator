import mysql.connector
import os
import sys
import json
from dotenv import load_dotenv
from algoliasearch.search_client import SearchClient

load_dotenv(".env.local")


def get_algolia_client():
    app_id = os.getenv('ALGOLIA_APP_ID')
    api_key = os.getenv('ALGOLIA_ADMIN_API_KEY')

    client = SearchClient.create(app_id, api_key)

    return client.init_index('prod_main')


def get_mysql_connection():
    user = os.getenv('DATABASE_USER')
    password = os.getenv('DATABASE_PASSWORD')
    host = os.getenv('DATABASE_HOST')
    database = os.getenv('DATABASE_NAME')

    cnx = mysql.connector.connect(user=user, password=password, host=host, database=database)
    cnx.autocommit = False

    return cnx


def deploy_recipes(idx, cnx):
    with open('cleaned_data/recipes.json', 'r') as f:
        recipes = json.load(f)

        for recipe_id in recipes:
            print('Deploying recipe [' + recipe_id + ']')

            recipe = recipes[recipe_id]

            crs = cnx.cursor()

            print("Updating index")
            idx.save_object({
                'objectID': recipe['id'],
                'type': 'recipe',
                'name': recipe['name'],
                'categories': recipe['categories'],
            }).wait()
            print("Index updated")

            crs.execute('SELECT 1 FROM recipes WHERE id = %s', (recipe['id'],))

            if len(crs.fetchall()) > 0:
                print("Updating recipe")
                crs.execute(
                    'UPDATE recipes SET schematic_id = %s, name = %s, categories = %s, ingredients = %s, products = %s, buildings = %s, duration = %s WHERE id = %s',
                    (
                        recipe['schematic_id'],
                        recipe['name'],
                        json.dumps(recipe['categories']),
                        json.dumps(recipe['ingredients']),
                        json.dumps(recipe['products']),
                        json.dumps(recipe['buildings']),
                        json.dumps(recipe['duration']),
                        recipe['id'],
                    ))
                print("Recipe updated")
            else:
                print("Inserting recipe")
                crs.execute(
                    'INSERT INTO recipes (id, schematic_id, name, categories, ingredients, products, buildings, duration) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
                    (
                        recipe['id'],
                        recipe['schematic_id'],
                        recipe['name'],
                        json.dumps(recipe['categories']),
                        json.dumps(recipe['ingredients']),
                        json.dumps(recipe['products']),
                        json.dumps(recipe['buildings']),
                        json.dumps(recipe['duration']),
                    ))
                print("Recipe inserted")

            crs.close()
            cnx.commit()


def deploy_items(idx, cnx):
    with open('cleaned_data/items.json', 'r') as f:
        items = json.load(f)

        for item_id in items:
            print('Deploying item [' + item_id + ']')

            item = items[item_id]

            crs = cnx.cursor()

            print("Updating index")
            idx.save_object({
                'objectID': item['id'],
                'type': 'item',
                'name': item['name'],
                'categories': item['categories'],
            }).wait()
            print("Index updated")

            crs.execute('SELECT 1 FROM items WHERE id = %s', (item['id'],))

            if len(crs.fetchall()) > 0:
                print("Updating item")
                crs.execute(
                    'UPDATE items SET name = %s, categories = %s, produced_in = %s, consumed_in = %s WHERE id = %s',
                    (
                        item['name'],
                        json.dumps(item['categories']),
                        json.dumps(item['produced_in']),
                        json.dumps(item['consumed_in']),
                        item['id'],
                    ))
                print("Item updated")
            else:
                print("Inserting item")
                crs.execute(
                    'INSERT INTO items (id, name, categories, produced_in, consumed_in) VALUES (%s, %s, %s, %s, %s)',
                    (
                        item['id'],
                        item['name'],
                        json.dumps(item['categories']),
                        json.dumps(item['produced_in']),
                        json.dumps(item['consumed_in']),
                    ))
                print("Item inserted")

            crs.close()
            cnx.commit()


if __name__ == '__main__':
    idx = get_algolia_client()
    cnx = get_mysql_connection()

    # deploy_recipes(idx, cnx)
    deploy_items(idx, cnx)

    cnx.commit()
    cnx.close()
