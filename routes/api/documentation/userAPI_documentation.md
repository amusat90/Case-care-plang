**GET api/users/test**
- public
- test functionality of the users route

**GET api/users/register**
- public
- registers new users
- payload: 
`{
   "name": "admin",
   "email": "admin@admin.com",
   "password": "admin123",
   "passwordConfirmation": "admin123"
}`

**POST api/users/login**
- Login User / Returning JWT Token
- Public
- payload: 
`{
   "email": "admin@admin.com",
   "password": "admin123",
}`
