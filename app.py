#importing flask submodules
from flask import Flask, render_template, request, redirect, url_for, session, flash
#importing our own modules
from utils import auth, trivia, database, game
#importing os for urandom()
import os, json

app = Flask(__name__)

def make_secret_key():
    return os.urandom(32)

app.secret_key = make_secret_key()

app.jinja_env.globals.update(logged_in = auth.logged_in)

#index: Home page. Renders index.html
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

#categories: Categories list page. Renders categories.html.
@app.route('/categories')
def categories():
    if auth.logged_in():
        #flash('Welcome to the categories page. Select a category to play!')
        return render_template('categories.html')
    else:
        flash('Access error. You are not logged in.')
        return redirect('index')

#login: Login page. Renders login.html. Redirects to index after logging in.
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        #is this a valid username?
        if auth.user_exists(username):
            if auth.login(username, password):
                flash('Welcome to KaFooT %s!' % username)
                return redirect('index')
            else:
                flash('Login Error: You have entered the wrong password.')
        else:
            flash('Login Error: This username does not exist in the database. Check for any spelling errors or register a new account!')
    return render_template('login.html')

#logout: Logs the user out of the session. Redirects to index after logging out.
@app.route('/logout')
def logout():
    if auth.logged_in():
        auth.logout()
        flash('You have been logged out.')
    else:
        flash('Logout Error: You are not logged in.')
    return redirect('index')

#register: Registration page. Renders register.html. Redirects to login if successful. Error otherwise.
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        password_verify = request.form.get('password_verify')
        if password == password_verify:
            if auth.new_user(username, password):
                flash('Account successfully created!')
                return redirect('login')
            else:
                flash('Registration error: Username is already in use.')
        else:
            flash('Registration error: The passwords you entered do not match.')
    return render_template('register.html')

@app.route('/profile')
def profile():
    if auth.logged_in():
        name = session['username']
        stats = database.getStats(name)
        statsHTML = []
        for i in stats:
            item = dict(category=i[0], score=i[1])
            statsHTML.append(item)
        return render_template('profile.html', name=name, statsHTML=statsHTML)
    else:
        flash('Access error. You are not logged in.')
        return redirect('index')

@app.route('/question', methods = ['GET', 'POST'])
def question():
    if auth.logged_in():
        if request.method == 'POST':
            catNum = request.form.get('subject')
        response = trivia.call_api(catNum)
        category = response[0]['category']
        question = response[0]['question']
        answers = trivia.randomize(response[0])
        canswer = response[0]['correct_answer']
        bots = json.dumps(game.gen_bots(request.form.get('b-difficulty')))
        return render_template('question.html', question = question, answers = answers, canswer = canswer, category = category, bots = bots)
    else:
        flash('Access error. You are not logged in.')
        return redirect('index')

@app.route('/settings', methods=['GET', 'POST'])
def settings():
    if auth.logged_in():
        if request.method == "POST":
            currentpassword = request.form.get('currentpassword')
            newpassword = request.form.get('newpassword')
            vertify = request.form.get('vertify')
            if auth.encrypt(currentpassword) == database.get_password(session['username']):
                if newpassword == vertify:
                    database.change_password(session['username'], auth.encrypt(newpassword))
                    flash('Successful password change.')
                else:
                    flash('Failed. Passwords do not match.')
                    return redirect('/settings')
            else:
                flash('Failed. Wrong old password.')
                return redirect('/settings')
    else:
        return redirect('index')
    return render_template('settings.html')


#sends score through query string, we need a better method since users can insert their own scores through the link
@app.route('/results',  methods=['GET', 'POST'])
def results():
    if auth.logged_in():
        name = session['username']
        if request.method == "POST":
            score = request.form.get('t-points')
            category = request.form.get('category')
        database.addStat(name,category,score)
        return render_template('results.html', score=score, category=category)
    else:
        flash('Access error. You are not logged in.')
        return redirect('index')
   

# Route determines whether or not to continue the game or to submit the results and go back to the main page.
# @app.route('/receive', methods = ['POST'])
# def receive():{
#     data = request.get_json() # {category, total points, question number, points to give}
#     if trivia.reached_total(data[2]) == 1: # 10 questions have passed already.
#         flash('You completed the game with a total score of ' + data[1] + '!')
#         return redirect('index')
#     else: # Otherwise, continue game
#         if data[3] == 0: # If 0 points were earned...
#             flash('You did not answer the question correctly.')
#         else:
#             flash('You earned ' + data[3] + ' points for that last question!')
#         response = trivia.call_api(data[0])
#         question = response[0]['question']
#         answers = trivia.randomize(response[0])
#         return render_template('question.html', question = question, answers = answers, totalpts = data[2])

if __name__ == '__main__':
    app.debug = True
    app.run()
