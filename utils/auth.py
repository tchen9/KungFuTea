import os, database, hashlib, database
from flask import session

#encrypts passwords
def encrypt(password):
    return hashlib.sha224(password).hexdigest()

#creates a new user
def new_user(username, password):
    return database.adduser(username, encrypt(password))

#checks password
def verify(username, password):
    return encrypt(password) == database.get_password(username)

#checks username
def user_exists(username):
    return database.get_password(username) is not None

#checks to see if logged in
def logged_in():
    return 'username' in session

#creates a new session if username and password match
def login(username, password):
    if(verify(username,password)):
        session['username'] = username
        return True
    else:
        return False

#removes login cookie
def logout():
    if logged_in():
        session.pop('username')
