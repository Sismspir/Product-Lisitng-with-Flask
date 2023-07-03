from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import mysql.connector
import requests

app = Flask(__name__)
CORS(app, support_credentials=True)

#make the connection with my-sql database
conn = mysql.connector.connect(
host='localhost',
user='your_username',
password='your_password',
database='your_database'
)

#the call is made initially to the back end to avoid the CORS error
@app.route('/api/fetch-data', methods=['GET'])
def fetch_data():
    
    backend_url = 'https://cloudonapi.oncloud.gr/s1services/JS/updateItems/cloudOnTest'
    #get the json data from the url
    try:
        response = requests.get(backend_url)
        return response.text
    except requests.RequestException as error:
        return str(error)

#get the data from the database
@app.route('/api/get-data', methods=['GET'])
def my_data():
    #the cursor object sends the query in the database
    cursor = conn.cursor()
    if request.method == 'GET':
        sql = "SELECT * FROM data"
        cursor.execute(sql)
        # The fetchall return a list of tuples
        # Each tuple represents a row of data from the result set
        data = cursor.fetchall() 
        # Return the data as JSON
        return jsonify(data)  

#get a specific item from the database
@app.route('/api/db-data/<int:external_id>', methods=['GET'])
def data(external_id):
    cursor = conn.cursor(dictionary=True)
    if request.method == 'GET':
        # select the item with the id provided
        if external_id:
            sql = "SELECT * FROM data WHERE external_id = %s"
            cursor.execute(sql, (external_id,))
            data = cursor.fetchone()
        # if the id is not provided it gets all the data
        else:
            sql = "SELECT * FROM data"
            cursor.execute(sql)
            data = cursor.fetchall()

        return jsonify(data)

# delete the item with the given id
@app.route('/api/db-data/delete/<int:external_id>', methods=['DELETE'])
def delete_data(external_id):
    cursor = conn.cursor()

    if request.method == 'DELETE':
        if external_id:
            sql = "DELETE FROM data WHERE external_id = %s"
            cursor.execute(sql, (external_id,))
            conn.commit()
            return jsonify({'status': 1, 'message': 'Record deleted successfully.'})
        else:
            return jsonify({'status': 0, 'message': 'Invalid request.'})
# edit the the item with the given id
@app.route('/api/db-data/edit/<int:external_id>', methods=['PUT'])
def edit_data(external_id):
    cursor = conn.cursor()

    if request.method == 'PUT':
        data = request.json
        name = data.get('name')
        code = data.get('code')
        description = data.get('description')
        barcode = data.get('barcode')
        retail_price = data.get('retail_price')
        whole_sale_price = data.get('whole_sale_price')
        discount = data.get('discount')

        sql = "UPDATE data SET name = %s, code = %s, description = %s, barcode = %s, retail_price = %s, whole_sale_price = %s, discount = %s WHERE external_id = %s"
        values = (name, code, description, barcode, retail_price, whole_sale_price, discount, external_id)

        cursor.execute(sql, values)
        conn.commit()

        return jsonify({'status': 1, 'message': 'Record updated successfully.'})


# Save the data to the database when the form is submited
@app.route('/api/db-data/save', methods=['POST'])
def save_data():
    cursor = conn.cursor()

    if request.method == 'POST':
        data = request.json
        external_id = data.get('external_id')
        name = data.get('name')
        code = data.get('code')
        description = data.get('description')
        barcode = data.get('barcode')
        retail_price = data.get('retail_price')
        whole_sale_price = data.get('whole_sale_price')
        discount = data.get('discount')
        sql = "INSERT INTO data (external_id, name, code, description, barcode, retail_price, whole_sale_price, discount) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        values = (external_id, name, code, description, barcode, retail_price, whole_sale_price, discount)

        cursor.execute(sql, values)
        conn.commit()

        return jsonify({'status': 1, 'message': 'Record saved successfully.'})


if __name__ == '__main__':
    app.run(port=3001)
