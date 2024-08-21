from download_and_normalize import download_and_normalize
from pymongo import MongoClient
from datetime import datetime, timedelta


def check_data():
    # Connect to MongoDB using the cloud connection string
    client = MongoClient('mongodb+srv://tminhthong1999:Concac321!@cluster0.klyz7gr.mongodb.net/')
    db = client['courses_db']
    collection = db['courses']

    # Check if the data is older than 10 minutes
    ten_minutes_ago = datetime.utcnow() - timedelta(minutes=10)
    recent_data_count = collection.count_documents({'createdAt': {'$gt': ten_minutes_ago}})

    if recent_data_count == 0:
        # No recent data, refresh the data
        download_and_normalize()
    else:
        print("Data is up-to-date.")


if __name__ == '__main__':
    check_data()
