BREAD

# Browse
## when a user is not logged in, show the log in page
GET /login

## when a user logs in
POST /login

## when user wants to register 
GET /register

# Read
## get all todo lists for user ID
GET /lists

## user checks their profile information
GET /user:id

# Edit
## user updates profile
POSTS /user:id

## user categorize incorrect or unknown items
POSTS /lists

## when user logs out
POST /logout

# Add
## after a user registers a new account
POSTS /register
