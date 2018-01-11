import requests
import random

def call_api(category):
    #category is a number (9-32)
    response = requests.get("https://opentdb.com/api.php?amount=10&category=%s&type=multiple" % category).json()
    return response['results']

def randomize(d):
    answers = d['incorrect_answers']
    answers.append(d['correct_answer'])
    random.shuffle(answers)
    return answers

#response = call_api(9)
#print randomize(response[0])
