# minibnb
Minibnb is a full-stack clone of AirBnB. Users can easily create "spots" showcasing their accommodations with photos, amenities, and pricing. Additionally, guests can leave detailed reviews of their experiences, providing valuable insights for future travelers.  Whether it's a tiny home, a mini cottage, or a quaint apartment, Minibnb has it all.

<img src="https://i.imgur.com/zpfiDry.png"></img>
## Live Link: https://hans-auth-me.onrender.com

## Created With: 
  - JavaScript
  - PostgreSQL
  - Sequelize
  - Express
  - React
  - Redux
  - HTML
  - CSS

## How to clone locally: 
1. Start by cloning the repo.
2. Open the root folder and make sure to type "npm install" into your terminal
3. Now do the same step (type "npm install) but into both the frontend directory and the backend directory
4. Then make sure to have two terminals open, one in the frontend directory and the other in the backend
5. Type "npm start" into the backend to start your express server and then npm start into the front end to start your react server

---

# Feature: Application Header
## User Stories
As a site visitor or authenticated user, I want to see a logo in the upper left of every page so that I know which site I'm on.
As a site visitor or authenticated user, when I click the logo, I want to return to the home page.
As a site visitor or authenticated user, I want to see the name of the application in the browser tab so that I can quickly * find this app when I have other tabs open.
As a site visitor, I want quick access to the "Log In" or "Sign Up" button in the upper right of every page (actions/flow are in a separate feature).
As an authenticated user, I want quick access to a button to open the User Menu (menu/actions are in a separate feature).

### Acceptance Criteria
On every page of the site, the browser tab shows the app name and fav icon
On every page of the site, the logo is on the top left of the page
On every page of the site, clicking the logo returns the user to the home page (/)
As the browser is resized, the header's width adjusts dynamically so the logo stays on the left, and the auth/user buttons stay on the right.

# Feature: Header
## User Stories
As a site visitor (when not signed in). I want to be able to sign in from any page.
As an AppAcademy instructor, I want to be able to press a single button to successfully log in to a "demo" account.
As an authenticated user, I want to refresh any page I'm on and stay signed in.

### Acceptance Criteria
On every page of the site, a "Log in" button (or drop-down menu containing "Log in") must be at the top-right of the page.
If using a drop-down menu, the menu must contain a "Log in" menu option.
If using a drop-down menu, the menu must contain a "Sign up" menu option.
Upon clicking the "Log in" button or menu option, it opens a modal pop-up that prompts the Username and Password input boxes and a "Log in" button.
Within the modal, the "Log in" button must be disabled anytime the username is less than 4 characters or the password is less than 6 characters.
Attempting to log in with an invalid username or password must prompt the error message "The provided credentials were invalid".
Upon logging in with a valid username and password, it must successfully log in the user and sets their session cookie.
Upon logging in with a valid username and password, the "Log in" and "Sign up" buttons at the top of the page are hidden.
Upon logging in with a valid username and password, it shows the User Menu Button (see next feature).
In the log-in modal, an extra link or button is available with the label "Log in as Demo User". Upon clicking this "Log in as Demo User" button, it will log the user into the "demo" account.
Upon closing the log-in modal, it resets errors and clears all data entered. When it reopens it will be in the default state (empty inputs and disabled button).

# Feature: User Menu and Logout
## User Stories
As an authenticated user (signed in), I want to be able to sign out from any page.
As an authenticated user, I want to be able to view my account information from any page.

### Acceptance Criteria
On every page of the site, I should be able to see a User Menu Button in the upper-right corner that opens a user drop-down menu when clicked.
After a user successfully logs in, The user drop-down menu contains the logged-in user's first name as a greeting: "Hello, "<first name>".
After a user successfully logs in, The user drop-down menu contains the logged-in user's email: <email>.
After a user successfully logs in, The user drop-down menu contains a "Log out" Button as a menu option.
After a user successfully logs in, the user menu does NOT contain the "Log in" or "Sign up" menu options.
Upon clicking anywhere outside the User Menu (including on the User Menu Button), the menu drop-down hides.
Upon clicking anywhere on the greeting or email inside the user drop-down menu, the User Menu remains open.
Upon clicking the "Log out" menu option, it performs a log out where it will clear the session/cookie.
Upon clicking the "Log out" button, it performs a log out where it will close the user drop-down menu.
Upon clicking the "Log Out" button, it performs a log out where it will navigate the user to the home page (/).

#Feature: Sign Up
## User Stories
As a site visitor, I want to quickly create an account from any page.
As a new user, I want to be able to automatically sign in when I create a new account.
As a site visitor, if I make a mistake while creating my account, I want to be able to see messages notifying me of what is wrong (could be one or more errors).
Acceptance Criteria
When logged out, I should see a "Sign up" button next to the "Log in" button (or drop down menu containing a "Sign up" menu option below a "Log in" menu option) in the top-right corner of the header on every page of the site.
Upon clicking "Sign up" to open the sign-up modal pop-up window, a new user account form.
The new user account form should show placeholders or labels and input boxes for: "First Name", "Last Name", "Email", "Username", "Password", and "Confirm Password".
The new user account form should show a "Sign up" button after all the input boxes.
The "Sign up" button should be disabled when any field is empty.
The "Sign up" button should be disabled when the "Username" field is less than 4 characters.
The "Sign up" button should be disabled when the "Password" field is less than 6 characters.
The "Sign up" button should be disabled when the field for "Confirm Password" does not match the field for "Password".
When clicking "Sign up" button on the new user account form with errors in the form, it must show all error messages returned from the backend (similar to the following): "The provided email is invalid" or "Username must be unique".
Upon closing and reopening sign-up modal, the errors are reset (all errors displayed before closing the modal are gone).
Upon closing and reopening sign-up modal, all fields are empty (all data entered before has been cleared).
Upon closing and reopening sign-up modal, the "Sign up" button on the new user account form is disabled.
After a successful sign-up is completed, the new user should automatically be logged in and see the User Menu with their information entered during sign-up with a "Log out" menu option, but not "Log in" or "Sign up" menu options.
After a successful sign-up is completed, if the new user refreshes the browser, they should still see the User Menu Button with the new user's information in the user drop down menu.

# Feature: MVP Styling Requirements for Auth
## User Stories
The layout and element positioning is the primary focus for the MVP. NOTE: During the portfolio phase, there will be time to revisit each project to make it prettier.
Follow the concepts outlined in the wireframes. Your project will NOT look the same, since the elements in the wireframe are purposefully a sketch.
A style guide is available as a starting point with suggestions for font sizes, colors, and other styles.

### Acceptance Criteria
The layout and element positioning is equivalent to the wireframes.
Buttons look like actual buttons. Form elements should look like form elements.
The text must be readable and the colors be non-offensive.


