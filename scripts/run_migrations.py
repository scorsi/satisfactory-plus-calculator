import mysql.connector
import os
import sys
from dotenv import load_dotenv

load_dotenv(".env.local")


def get_connection():
    user = os.getenv('DATABASE_USER')
    password = os.getenv('DATABASE_PASSWORD')
    host = os.getenv('DATABASE_HOST')
    database = os.getenv('DATABASE_NAME')

    cnx = mysql.connector.connect(user=user, password=password, host=host, database=database)
    cnx.autocommit = False

    return cnx


def get_latest_migration_version():
    if len(sys.argv) > 1:
        if os.path.isdir('./migrations/' + sys.argv[1]):
            return sys.argv[1]
        else:
            print('Migration [' + sys.argv[1] + '] not found!')

    for dirname, dirnames, filenames in os.walk('./migrations'):
        idx = len(dirnames) - 1
        if idx < 0:
            return '000'
        else:
            return dirnames[idx]


def run_migration(id, cnx):
    cursor = cnx.cursor()

    try:
        with open('./migrations/' + id + '/up.sql') as file:
            cursor.execute(file.read(), multi=True)
            print('*migration [' + id + '] completed!')
            # cnx.commit()
            return True
    except Exception as e:
        print('*migration [' + id + '] FAILED!')
        print(e)
        # cnx.rollback()
        return False
    finally:
        cursor.close()


def migrate(m_from, m_to, cnx):
    print('Running migrations from [' + m_from + '] to [' + m_to + ']...')

    last = m_from
    for dirname, dirnames, filenames in os.walk('./migrations'):
        for dirname in dirnames:
            if int(dirname) > int(m_from) and (m_to is None or int(dirname) <= int(m_to)):
                if run_migration(dirname, cnx):
                    last = dirname

    return last


def get_current_migration_version(cnx):
    cursor = cnx.cursor()

    try:
        cursor.execute('SELECT COALESCE((SELECT version FROM migration_status LIMIT 1), 0)')
        return str(cursor.fetchall()[0][0]).zfill(3)
    except Exception as e:
        cursor.execute('CREATE TABLE IF NOT EXISTS migration_status ( version SMALLINT DEFAULT 0 NOT NULL );')
        cursor.execute('INSERT INTO migration_status VALUES(0);')

        cnx.commit()

        return '000'
    finally:
        cursor.nextset()
        cursor.close()


def save_current_migration_version(version, cnx):
    cursor = cnx.cursor()

    print('Saving migration version [' + version + ']...')

    cursor.execute('UPDATE migration_status SET version = ' + str(int(version)) + ';')
    cnx.commit()
    cursor.close()


if __name__ == '__main__':
    cnx = get_connection()

    migration_start = get_current_migration_version(cnx)
    migration_end = get_latest_migration_version()

    if migration_start == migration_end:
        print('Database is up to date!')
    else:
        last_migration = migrate(migration_start, migration_end, cnx)

        cnx.reconnect()
        save_current_migration_version(last_migration, cnx)

    cnx.close()
