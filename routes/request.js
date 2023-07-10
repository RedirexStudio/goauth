const express = require('express')
const { OAuth2Client } = require('google-auth-library')

const dotenv = require('dotenv')
dotenv.config()
var router = express.Router();

router.post('/oauth-link', async (req, res, next) => {
    // res.send('Hello World!')
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001')
    res.header('Referrer-Policy', 'no-referrer-when-downgrade')

    const redirectUrl = 'http://127.0.0.1:3001/oauth'

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
    )

    const authrorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
        prompt: 'consent'
    })

    res.json({ url: authrorizeUrl })
})

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)

// })

module.exports = router