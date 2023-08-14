import requests

r = requests.post("http://localhost/api/v1/auth/login", json={
    "email": "johndoe@gmail.com",
    "password": "Test123?",

})

print(r.headers)
