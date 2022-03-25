
var util = require('util');

const getValueByKeyRedis = async (key) => {
    return value = await sails.getDatastore('cache').leaseConnection(async (db) => {
        var found = await (util.promisify(db.get).bind(db))(key);
        if (found === null) {
            return undefined
        } else {
            return found
        }
    })
}
const addRedis = async (key, value, expiresIn) => {
    var ttlInSeconds = expiresIn;
    await sails.getDatastore('cache').leaseConnection(async (db) => {
        await (util.promisify(db.setex).bind(db))(key, ttlInSeconds, JSON.stringify(value));
    });
}

module.exports = { getValueByKeyRedis, addRedis };