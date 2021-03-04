'use strict'

const superagent = require('superagent');

const users = require('../models/users')
const tokenUrl = 'https://github.com/login/oauth/access_token'
const githubApi = 'https://api.github.com/user'
const client_id = '5d520bc3472eacd00e59';
const client_secret = 'dc12546b5170c3a5e4b7cec02874043142e47579'
const redirect_uri = 'http://localhost:3000/oauth';
const state = 'secure';




async function getToken(code) {

    let token = await superagent.post(tokenUrl).send({
        code: code,
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri
    })
    let accessToken = token.body.access_token
    return accessToken
}

async function getData(accessToken) {
    let data = await superagent.get(githubApi)
        .set('user-agent', 'express-app')
        .set('Authorization', `token ${accessToken}`)
    return data.body
}

async function saveAndGet(userData) {
    let userRecord = {
        username: userData.login,
        password: 'mycoolpassword'
    }
    let generateToken = await users.generateToken(userRecord)
    let saveUser = await users.save(userRecord)
    return [generateToken, saveUser]

}

module.exports = async function handler(req, res, next) {
    let code = req.query.code
    let githubtoken = await getToken(code)
    let githubData = await getData(githubtoken)
    let modifiedUserData = await saveAndGet(githubData);
    let token = modifiedUserData[0]
    let user = modifiedUserData[1]
    req.token = token
    req.user = user
    next()
}