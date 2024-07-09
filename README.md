API Documentation

1. /api/auth/signup
   method POST
   request body (fullName (string), email(string), userName(string), password(string))
   
2. api/auth/login
   method POST
   request body (userName(string), password(string))
   
3. api/user/account-number/:accountNumber
   method GET
   request header (Authorization)
   
4. api/user/registration-number/:registrationNumber
   method GET
   request header (Authorization)
   
5. api/user/login-three-days-ago
   method GET
   request header (Authorization)

6. api/account/:accountId
   method PUT
   request header (Authorization)
   request body (fullName (string), email(string), userName(string), password(string))
   
7. api/account/:accountId
   method DELETE
   request header (Authorization)
