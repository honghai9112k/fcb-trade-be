
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
const deleteRedis = async (key) => {
    var value = await sails.getDatastore('cache').leaseConnection(async (db) => {
        const check = await (util.promisify(db.del).bind(db))(key);
        return check;
    })
    
}
module.exports = { getValueByKeyRedis, addRedis, deleteRedis };