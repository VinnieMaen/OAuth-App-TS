import requests
import time

s = requests.Session()
r = s.post("http://localhost/api/v1/auth/login", json={
    "email": "johndoe@gmail.com",
    "password": "Test123?",

})

print(r.text)
print(r.headers)


while True:
    r = s.get("http://localhost/api/v1/test")
    print(r.text)
    if r.status_code == 403:
        r = s.post("http://localhost/api/v1/auth/refresh")

        print(r.text)
        print(r.headers)

    time.sleep(2)
