import { RandomData } from './random-data';

const config = {
    "urls": {
        "homePage": "https://conduit.bondaracademy.com",
        "editor":"https://conduit.bondaracademy.com/editor",
        "API_URL":"https://conduit-api.bondaracademy.com",
        "settings":"https://conduit.bondaracademy.com/settings"
    },
    "credentials": {
        "username": "hello111@yopmail.com",
        "password": "hello111",
        "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozOTE5M30sImlhdCI6MTc2MzExNDk0MiwiZXhwIjoxNzY4Mjk4OTQyfQ.I_FTWgEHplPsTajAu8qN4m5-st3z-wQgSn3speQAVEM"
    },
    "settings": {
        "url": RandomData.randomUrl,
        "username": RandomData.randomBio,
        "bio": "",
        "email": RandomData.randomMail,
        "newPass": RandomData.randomPassword
    },
    "NewArticle": RandomData.randomArticle(),
    "APIArticle": RandomData.APIArticle(),
    "invalidURL":"https://conduit.bondaracademybondaracademybondaracademybondaracademybondaracademybondaracademybondaracademybondaracademybondaracademybondaracademybondaracademybondaracademybondaracademybondaracademybondaracademy.com/"

};
export default config;