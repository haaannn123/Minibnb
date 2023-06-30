'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://i.imgur.com/gMljqMV.png",
        preview: true,
      },
      {
        spotId: 1,
        url: "https://i.imgur.com/agJJMMN.png",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://i.imgur.com/7dg3tFC.png",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://i.imgur.com/rLGsaXU.png",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://i.imgur.com/lVdmgkX.png",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://i.imgur.com/vrIV16L.png",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://i.imgur.com/QCweYdK.png",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://i.imgur.com/hOFLWZx.png",
        preview: false
      },
      {
        spotId: 2,
        url: "https://i.imgur.com/hUKm8a2.png",
        preview: false,
      },{
        spotId: 2,
        url: "https://i.imgur.com/5g4xmqP.png",
        preview: false
      },{
        spotId: 3,
        url: "https://i.imgur.com/MpWrr7M.png",
        preview: true,
      },{
        spotId: 3,
        url: "https://i.imgur.com/Lz3wgFa.png",
        preview: false,
      },{
        spotId: 3,
        url: "https://i.imgur.com/AxdP887.png",
        preview: false,
      },{
        spotId: 3,
        url: "https://i.imgur.com/P7Lpz89.png",
        preview: false,
      },{
        spotId: 3,
        url: "https://i.imgur.com/JWCpWad.png",
        preview: false,
      },{
        spotId: 4,
        url: "https://i.imgur.com/gWWEs2t.png",
        preview: true,
      },{
        spotId: 4,
        url: "https://i.imgur.com/jl9MTiY.png",
        preview: false
      },{
        spotId: 4,
        url: "https://i.imgur.com/ByHUH0f.png",
        preview: false
      },{
        spotId: 4,
        url: "https://i.imgur.com/qMGGixf.png",
        preview: false
      },{
        spotId: 4,
        url: "https://i.imgur.com/JJGQKJc.png",
        preview: false
      },{
        spotId: 5,
        url: "https://i.imgur.com/HzbCYow.png",
        preview: true,
      },{
        spotId: 5,
        url: "https://i.imgur.com/qaiCWc2.png",
        preview: false
      },{
        spotId: 5, 
        url: "https://i.imgur.com/R7oXnuO.png",
        preview: false
      },{
        spotId: 5,
        url: "https://i.imgur.com/pDH4kMF.png",
        preview: false
      },{
        spotId: 5,
        url: "https://i.imgur.com/oric0Pd.png",
        preview: false
      },
      {
        spotId: 6,
        url: "https://i.imgur.com/Z1wAeoY.png",
        preview: true,
      },{
        spotId: 6,
        url: "https://i.imgur.com/iWFQuHc.png",
        preview: false,
      },{
        spotId: 6,
        url: "https://i.imgur.com/82XMrb0.png",
        preview: false,
      },{
        spotId: 6,
        url: "https://i.imgur.com/5vePECr.png",
        preview: false,
      },{
        spotId: 6,
        url: "https://i.imgur.com/2Ed7hwu.png",
        preview: false,
      },{
        spotId: 7,
        url: "https://i.imgur.com/Maa5hgF.png",
        preview: true,
      },{
        spotId: 7,
        url: "https://i.imgur.com/Ydvs6ul.png",
        preview: false
      },{
        spotId: 7,
        url: "https://i.imgur.com/XDBOiWZ.png",
        preview: false
      },{
        spotId: 7,
        url: "https://i.imgur.com/QZr7fnU.png",
        preview: false
      },{
        spotId: 7,
        url: "https://i.imgur.com/VjBoRTS.png",
        preview: false
      },{
        spotId: 8,
        url: "https://i.imgur.com/hsq2H7O.png",
        preview: true,
      },{
        spotId: 8,
        url: "https://i.imgur.com/S3EMOgb.png",
        preview: false
      },{
        spotId: 8,
        url: "https://i.imgur.com/r725zr5.png",
        preview: false
      },{
        spotId: 8,
        url: "https://i.imgur.com/mbPVIuQ.png",
        preview: false
      },{
        spotId: 8,
        url: "https://i.imgur.com/mJoLngr.png",
        preview: false
      },{
        spotId: 9,
        url: "https://i.imgur.com/9at69OQ.png",
        preview: true,
      },{
        spotId: 9,
        url: "https://i.imgur.com/lkGcv7Q.png",
        preview: false
      },{
        spotId: 9,
        url: "https://i.imgur.com/AAbYhbC.png",
        preview: false
      },{
        spotId: 9,
        url: "https://i.imgur.com/c5k0UCG.png",
        preview: false
      },{
        spotId: 9,
        url: "https://i.imgur.com/G2HYBpc.png",
        preview: false
      },{
        spotId: 10,
        url: "https://i.imgur.com/SUPeSVF.png",
        preview: true,
      },{
        spotId: 10,
        url: "https://i.imgur.com/b5j63cY.png",
        preview: false
      },{
        spotId: 10,
        url: "https://i.imgur.com/wQ5RMJs.png",
        preview: false
      },{
        spotId: 10,
        url: "https://i.imgur.com/1EE2A7D.png",
        preview: false
      },{
        spotId: 10,
        url: "https://i.imgur.com/Rilppgv.png",
        preview: false
      },{
        spotId: 11,
        url: "https://i.imgur.com/7WYDx8H.png",
        preview: true
      },{
        spotId: 11,
        url: "https://i.imgur.com/YxTJ4LN.png",
        preview: false
      },{
        spotId: 11,
        url: "https://i.imgur.com/RuW3Pa4.png",
        preview: false
      },{
        spotId: 11,
        url: "https://i.imgur.com/SRf2zZW.png",
        preview: false
      },{
        spotId: 11,
        url: "https://i.imgur.com/TzgQGnN.png",
        preview: false
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id : {[Op.in] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
    }, {})
  }
};
