'use strict'

const nodemailer = require('nodemailer');
const secret = require('../config/secret.js');
const config = require('../config/config.js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
let smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: 'matchamnz@gmail.com',
    pass: 'matchamnz123'
  }
});

module.exports = {
  sendNewAccountEmail: (data) => {
    const token = data.validation_token;
    const login = data.username;
    
    const infos = {
      from: 'hey@matcha.com',
      to: data.email,
      subject: 'Account Activation',
      text: 'Hey '+login+',\n\nWelcome to Matcha\n\nClick the link below to activate your account\n\n'+config.application_address+config.frontServer.port+'/activate?login='+login+'&token='+token
    };
    
    smtpTransport.sendMail(infos, function(err, res) {
      if (err) {
        console.error('Email error', err);
      } else {
        console.log('Email sent', res);
      }
    });
  },
  sendResetEmail: (data, token) => {
    const login = data.username;
    const url = config.application_address+config.frontServer.port+'/password_new?login='+login+'&token='+token

    const infos = {
      from: 'matcha@love.fr',
      to: data.email,
      subject: 'Matcha: reset your password',
      text: 'Welcome to Matcha\n\nPlease reset your password by visiting the link bellow\n\n' + url
    };

    smtpTransport.sendMail(infos, function(err, res) {    
      if (err) {
        console.error('Email error', err);
      } else {
        console.log('Email sent', res);
      }
    });
  }
}