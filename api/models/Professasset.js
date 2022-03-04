/**
 * Professasset.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    autoid: {
      type: 'number',
      required: true,
      autoIncrement: true,
    },
    professasset: {
      type: 'string',
      required: true,
    },
    symbol: {
      type: 'string',
      required: true,
    },
    minamt: {
      type: 'number',
      required: true,
    },
    fullnameasset: {
      type: 'string',
      required: true,
    },
    statudes: {
      type: 'string',
      required:true,
    },
    status: {
      type: 'string',
      required: true,
    },
    frdate: {
      type: 'string',
      required: true
    },
    todate: {
      type: 'string',
      required: true
    }

  },

};

