import requests

def call_api(category):
    #category is a number (9-32)
    response = requests.get("https://opentdb.com/api.php?amount=10&category=%s&type=multiple" % category).json()
    return response['results']
