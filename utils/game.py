# This file contains game logic
# Can be accessed via js using AJAX

# Gives points based on the amount of time taken
# Formula = 49 (7 ^ 2) - time taken ^ 2.
# Theoretical maximum is 49 points per question
def assign_points(time):    
    points_given = 0
    points_given = 49 - pow(time, 2)
    return points_given