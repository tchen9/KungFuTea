# Team KungFuTea

**K**yle Lin - **F**abiha Ahmed - **T**ina Chen

---

![KaFooT](https://i.imgur.com/jnpT4oF.png)

---

## General Description:

**KaFooT** is a educational game website that derives its inspiration from Kahoot. The user can select the trivia genre from a list of categories that are pre-defined or user-defined. The user gains points based on whether or not the correct answer is selected within a set time period; there is no penalty for answering wrong. The user has the option of reading more about the current question after the answer has been selected if desired.

---

### How to use log.sh

1. Open the terminal
2. Navigate to the root folder containing log.sh
3. Run `./log.sh <lastF> <devmsg>`

---

### Project Progress

**Completed:**

* Login / Register
    * Password hashing
* Navbar
* Easter Egg

**To Do (In order of priority):**

* Actual game
    * Categories from API
    * Categories into questions + answers
    * Disable buttons for 3 seconds
    * Points
    * Points based on time
* User profile
    * Change password
    * User record
* Bot logic
    * Randomly generated number of seconds (0,7] + 3
* Custom categories
* Wikipedia hookup
* Bot difficulties
    * Easy: Skew RNG to higher numbers (towards 6)
    * Normal: Skew RNG to middleground numbers (towards 4)
    * Hard: Skew RNG to lower numbers (towards 2)
    * Insane: Skew RNG to really low numbers (towards 1)