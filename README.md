# Team KungFuTea

**K**yle Lin - **F**abiha Ahmed - **T**ina Chen

---

![KaFooT](https://i.imgur.com/jnpT4oF.png)

---

## General Description:

**KaFooT** is a educational game website that derives its inspiration from Kahoot. The user can select the trivia genre from a list of categories that are pre-defined or user-defined. The user gains points based on whether or not the correct answer is selected within a set time period; there is no penalty for answering wrong. The user has the option of reading more about the current question after the answer has been selected if desired.

---

### How to run

1. Navigate to the root folder containing app.py
2. If a virtual environment has not already been created, create a virtual environment.
    * `virtualenv venv`
    * The virtual environment name we'll be using is `venv`.
3. Activate the virtual environment.
    * `. ./venv/bin/activate`
4. Install requirements
    * Can be done by running `pip install -r requirements.txt` in the root folder
5. Run the flask app
    * `python app.py`
6. Open a web browser and connect to the site.
    * `localhost:5000` or `127.0.0.1:5000`
7. **KaFooT!**

---

### How to use log.sh

1. Open the terminal
2. Navigate to the root folder containing log.sh
3. Run `./log.sh <lastF> <devmsg>`

---

### Project Progress

**Completed: (in order of addition)**

* Login / Register
    * Password hashing
* Navbar
* Easter Egg
* Actual game
    * Categories from API
    * Categories into questions + answers
    * Disable buttons for 3 seconds
    * Points based on time
* User profile
    * Change password
    * User record
* Bot difficulties
    * Easy: Skew RNG to higher numbers (towards 6)
    * Normal: Skew RNG to middleground numbers (towards 4)
    * Hard: Skew RNG to lower numbers (towards 2)
    * Insane: Skew RNG to really low numbers (towards 1)

**To Do (In order of priority):**

* Actual game
    * Points
    * Consecutive questions
* Bot logic
    * Generate bots
    * Randomly generated number of seconds (0,7] + 3
* Wikipedia hookup
* Custom categories
* Multiplayer
