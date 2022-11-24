const axios = require('axios');
const SERVER = require('../config/server.config');
const fdURL = SERVER.FEE_DELEGATION_SERVER ;

/* @dev zzerous */
const sendingRLPTx = async function(api, rlp){

    const resMETA = await axios({
        url: fdURL + api,
        method: "post",
        data:{
            senderRawTransaction: rlp,
        },
        json: true
    });

    return resMETA.data;

}

module.exports.sendingRLPTx = sendingRLPTx;




