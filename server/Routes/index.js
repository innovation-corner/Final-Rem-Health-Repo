const ussd = require('./ussdRoutes')
const auth = require('./authRoutes')
const info = require('./infoRoutes')
const user = require('./userRoutes')
const hs = require('./hospitalRoutes')
const sms = require('./smsRoutes')

module.exports = {
    ussd,
    user,
    info,
    hs,
    sms,
    auth
}