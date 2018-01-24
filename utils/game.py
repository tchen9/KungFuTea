# This file contains game logic
# Can be accessed via js using AJAX

import random, json

# Gives points based on the amount of time taken
# Formula = 49 (7 ^ 2) - time taken ^ 2.
# Theoretical maximum is 49 points per question
def assign_points(time):    
    points_given = 0
    points_given = 49 - pow(time, 2)
    points_given = int(round(points_given))
    return points_given

# Bot 'object'
class Bot(object):
    # Initializes the bot with an id and difficulty
    def __init__(self, bot_id, difficulty):
        self.id = bot_id
        self.difficulty = difficulty

    # Can be called like an attribute.
    @property
    def responses(self):
        responses = {}
        for i in range(0, 10):
            responses[i] = self.gen_correct_points(self.difficulty)
        return responses

    # Generates a correct boolean and points associated.
    def gen_correct_points(self, difficulty):
        response = [
            self.ran_correct(), assign_points(self.gen_ran_num(0, 7, difficulty))
        ]
        return response

    # Returns True 90% of the time (correct answer)
    def ran_correct(self):
        ran_num = random.random()
        if ran_num < 0.9:
            return True
        else:
            return False

    # Generates random number with a skew
    def gen_ran_num(self, min, max, skew):
        skew_dic = {
            0: 6,
            1: 2,
            2: 0.75,
            3: 0.1
        }
        result = min + (max - min) * pow(random.random(), skew_dic[skew])
        return result

    # Returns total points at that question in time
    def total_points(self, question_num):
        points = 0
        for i in range(0, question_num):
            if self.responses[i][0] == True:
                points += self.responses[i][1]
        return points

# Generates 10 bots with predetermined data.
def gen_bots(difficulty):
    bots_list = {}
    for i in range(0, 20):
        bots_list[i] = Bot(i, difficulty)
    bots_list = to_json(bots_list)
    return bots_list

def to_json(dic):
        return json.dumps(dic, default=lambda o: o.__dict__, sort_keys=True, indent=4)