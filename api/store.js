var express = require('express'),
    _ = require('lodash');
    creds = require('./../.env.js');
    moment = require('moment'),
    GoogleSpreadsheet = require("google-spreadsheet");

var spreadsheet = new GoogleSpreadsheet(creds.sheet);

var sheetCreds = {
  client_email: creds.client_email,
  private_key: creds.private_key
}

var app = module.exports = express.Router();

app.post('/api/store', function(req, res) {
  if (!req.headers.username && !req.headers.password) {
    res.status(400).send("You must send the username and the password");
  }

  if(req.headers.username === creds.username && req.headers.password === creds.password && req.body) {
    spreadsheet.useServiceAccountAuth(sheetCreds, function(err){
      if(err) {
          console.log(sheetCreds);
          res.status(400).send('Creds do not match')
      }
      spreadsheet.getInfo( function( err, sheet_info ){
        if(err) {
          res.status(400).send('Error with spreadsheet')
        }
        var params = {
            test: req.body.test,
            datesubmited: moment().format('DD/MM/YYYY @ HH:MM:SS')
        }
        spreadsheet.addRow(sheet_info.worksheets[0].id, params, function(response){
          res.status(200).send('Saved!');        
        });
      });
    });
  }

});

app.get('/api/store', function(req, res) {
    spreadsheet.useServiceAccountAuth(creds, function(err){
      if(err) {
          res.status(400).send('Error')
      }
      spreadsheet.getInfo( function( err, sheet_info ){
        spreadsheet.getRows(sheet_info.worksheets[0].id, function(err, rows){
          res.status(200).send(rows);        
        });
      });
    });
});