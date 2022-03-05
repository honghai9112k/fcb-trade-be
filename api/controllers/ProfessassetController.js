


var axios = require('axios')
// var fetch = require('node-fetch')
/**
 * ProfessassetController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {

    getlistProfessasset: async (req, res) => {
        axios({
            method: 'post',
            url: 'https://fcbond.fss.com.vn/asset/getlistProfessasset',
            data: {
                "language": "vie",
                "OBJNAME": "PROFESSASSET"
            },
            headers: {
                Authorization: 'Basic YWRtaW46RnNzY2JkQDEyMw==',
            }
        })
            .then((value) => {
                return res.send(value.data);
            })
            .catch((error) => {
                console.log(error); 
            })

    },

    deleteProfessasset: async (req, res) => {
        axios({
            method: 'post',
            url: 'https://fcbond.fss.com.vn/asset/mt_professasset',
            data: req.body,
            headers: {
                Authorization: 'Basic YWRtaW46RnNzY2JkQDEyMw==',
            }
        })
            .then((value) => {    
                console.log(value.data);
                return res.send(value.data);
            })
            .catch((error) => {
                console.log(error); 
            })
    },

    getlistassetcode: async (req, res) => {
        return res.send("Helo");
    },
    mt_professasset: async (req, res) => {
        return res.json({
            "EC": 0,
            "EM": "Thành công",
            "DT": {
                "p_err_code": "0",
                "p_err_param": null
            }
        })
    },
};

