import requests

r = requests.post("http://localhost/api/v1/auth/login", json={
    "email": "vincent_maenhout@hotmail.com",
    "password": "VinnieMaen11?",

})
