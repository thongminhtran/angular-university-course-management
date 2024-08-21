import pandas as pd
from pymongo import MongoClient
from datetime import datetime
import requests


def download_and_normalize():
    # Download the CSV file
    url = 'https://api.mockaroo.com/api/501b2790?count=100&key=8683a1c0'
    response = requests.get(url)
    with open('courses.csv', 'wb') as file:
        file.write(response.content)

    # Load the CSV file into a DataFrame
    df = pd.read_csv('courses.csv')

    # Normalize the data
    df['University'] = df['University'].astype(str)
    df['City'] = df['City'].astype(str)
    df['Country'] = df['Country'].astype(str)
    df['CourseName'] = df['CourseName'].astype(str)
    df['CourseDescription'] = df['CourseDescription'].astype(str)
    df['Currency'] = df['Currency'].astype(str)

    df['StartDate'] = pd.to_datetime(df['StartDate'])
    df['EndDate'] = pd.to_datetime(df['EndDate'])
    df['Price'] = df['Price'].astype(float)

    # Add createdAt field with the current timestamp
    df['createdAt'] = datetime.utcnow()

    # Connect to MongoDB using the cloud connection string
    client = MongoClient('mongodb+srv://tminhthong1999:Concac321!@cluster0.klyz7gr.mongodb.net/')
    db = client['courses_db']
    collection = db['courses']

    # Ensure data expiration by creating an index with expireAfterSeconds
    collection.create_index("createdAt", expireAfterSeconds=600)

    # Clear the existing collection before inserting new data
    collection.delete_many({})

    # Save data to MongoDB
    collection.insert_many(df.to_dict('records'))

    print("Data has been successfully normalized and saved to MongoDB.")


if __name__ == '__main__':
    download_and_normalize()
