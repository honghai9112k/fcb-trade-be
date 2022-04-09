
var util = require('util');
var keys = {
    // token: 'tokens:%s',
    client: 'clients:%s',
    // refreshToken: 'refresh_tokens:%s',
    // grantTypes: 'clients:%s:grant_types',
    // user: 'users:%s'

};
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
const addStringRedis = async (key, value, expiresIn) => {
    var ttlInSeconds = expiresIn;
    await sails.getDatastore('cache').leaseConnection(async (db) => {
        await (util.promisify(db.setex).bind(db))(key, ttlInSeconds, JSON.stringify(value));
    });
}
const getClientHashRedis = async (id) => {
    return data =  await sails.getDatastore('cache').leaseConnection(async (db) => {
        return await (util.promisify(db.hgetall).bind(db))(util.format(keys.client, id));
    });
}
const addAllHashRedis = async (key, value, expiresIn) => {
    await sails.getDatastore('cache').leaseConnection(async (db) => {
        const keys = Object.keys(value);
        const values = Object.values(value);
        for (let index = 0; index < keys.length; index++) {
            await (util.promisify(db.hmset).bind(db))(key, keys[index], values[index]);
        }
        await (util.promisify(db.expire).bind(db))(key, expiresIn)
    });
}
const addOneHashRedis = async (key, keyObj, value, expiresIn) => {
    await sails.getDatastore('cache').leaseConnection(async (db) => {
        await (util.promisify(db.hmset).bind(db))(key, keyObj, value);
        await (util.promisify(db.expire).bind(db))(key, expiresIn)
    });
}
const deleteRedis = async (key) => {
    var value = await sails.getDatastore('cache').leaseConnection(async (db) => {
        const check = await (util.promisify(db.del).bind(db))(key);
        return check;
    })

}
module.exports = { getValueByKeyRedis, addStringRedis, deleteRedis, addAllHashRedis, getClientHashRedis };