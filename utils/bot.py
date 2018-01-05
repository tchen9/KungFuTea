import random

# Returns a randomly generated number in the range skewed towards the given skew value
# skew: 0-Insane, 1-Hard, 2-Normal, 3-Easy (See README.md for more details)
def rng(min, max, skew):
    skew_dic = {0: 4, 1: 2, 2: 0.75, 3: 0.1}
    result = min + (max - min) * pow(random.random(), skew_dic[skew])
    return result

def testrng():
    easy = 0
    normal = 0
    hard = 0
    insane = 0
    for x in range(0, 100):
        easy += rng(0, 7, 3)
        normal += rng(0, 7, 2)
        hard += rng(0, 7, 1)
        insane += rng(0, 7, 0)
    easy /= 100
    normal /= 100
    hard /= 100
    insane /= 100
    print "Easy: %d" % (easy)
    print "Normal: %d" % (normal)
    print "Hard: %d" % (hard)
    print "Insane: %d" % (insane)