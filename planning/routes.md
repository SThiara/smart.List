BREAD

# Browse
## when a user is not logged in, show the log in page
GET /user/login

## when a user logs in
POST /user/login

## when user wants to register 
GET /user/register

# Read
## get all todo lists for user ID
GET /lists:id

## user checks their profile information
GET /user:id

# Edit
## user updates profile
POSTS /user:id/edit

## user categorize incorrect or unknown items
POSTS /lists:id

## when user logs out
POST /logout

# Add
## after a user registers a new account
POST /register
