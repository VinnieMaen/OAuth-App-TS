import requests

r = requests.post("http://localhost/api/v1/auth/refresh", headers={"cookie": "refresh_token=Bearer%20eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGRhYTAwNjAwYTJhMmQ1ZTJjNTljM2MiLCJleHAiOjE2OTIyODEwNTQ5ODYsImlhdCI6MTY5MjEwODI1NDk4NiwidG9rZW5fdHlwZSI6InJlZnJlc2gifQ.j-DUe4ed5_12SXuvw5awhsq8k-X8EbA_ND6i0WBNMhb4nNYtsI2XXeGDsIW-_QJbM6kLuRFrgTPiwkiKGZnGkYRWlYXwXW2wubRPaYNyeDGFmc1RKLWO-HSlHh8w7pINeYSdvlYkRfB_QXc5k-iObX3ehONgLy0rG6P4NPEK0VjoUjBpInqzOhp4bugOEanBh7_-1kghmS1n9dNyWye3lEtY24tGC_PGb0rePLcGxalLP_hPiZUhXOS2YAaf5i1FQo5sbx0vZEnHmdpHvtqgsq6h40Afvz__EAC1-bjTkESh_hPiNfigKg9H7YwgubjbN4Ja5qMoqnIRlEp6-K5dOg"})

print(r.text)
print(r.headers)
