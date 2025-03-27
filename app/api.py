import sqlite3
import os

# Connect to the database
db_path = os.path.abspath('users.db')
print("Database path:", db_path)
c = sqlite3.connect('users.db')
if c:
    print("Connected")

cursor = c.cursor()

# Check if the user table exists
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
print("Tables in the database:", tables)

# Execute the query
cursor.execute("SELECT * FROM user")

# Fetch all rows
rows = cursor.fetchall()

# Iterate over each row and print it
for row in rows:
    print(row)

# Close the connection
c.close()