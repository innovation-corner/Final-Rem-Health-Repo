const ussd = require('./ussdRoutes')
const auth = require('./authRoutes')
const info = require('./infoRoutes')
const user = require('./userRoutes')

module.exports = {
    ussd,
    user,
    info,
    auth
}