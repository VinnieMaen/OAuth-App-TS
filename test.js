let fs = require("fs")
let jwt = require("jsonwebtoken")
const cert = fs.readFileSync("public.pem");

let refreshToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGRhOTE1NmQyNzRhYWI5NDVmYmQ1MWIiLCJleHAiOjE2OTIwNDkwNjE2NzEsImlhdCI6MTY5MjA0OTA0MTY3MSwidG9rZW5fdHlwZSI6InJlZnJlc2gifQ.nNV0FQpcOgSALvEmMlMlJhgBk7roDD3NMfvg7hSSKiCFMv93RhDoqvKrD4z__y7_sFnxwOciXExa2sh_DpJj-ZO2JWaaU63Dpn3NTKyB8seuSQmeE6PEJL9bt-wdWdmoSTLCkl1T_CasJjPSmpXbh6wz_Xz9MdLp4FF2lLP2Xpo0E3GIGljrk_QbezbHKYS-Wswv8Pk-7kmJzeH3td0I4WCJn7S17nqLvM2X0FDP5dJ5rsVwVFkrS4wtCTSVuRBKsOkYIxC73CfqOwAtpUhn0fmXbCzRYrZD5bioum1OabDQedxp9L61lxbSoVT8NWZZDAoepcdZl6GjkABewON1DA"
jwt.verify(refreshToken, cert, async function (err, decoded) {
    console.log(decoded)
    console.log(err)
    console.log(Date.now() > decoded.exp)
})