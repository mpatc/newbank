'use strict';

var db = require('../config/db');
var moment = require('moment');

db.run(`CREATE TABLE IF NOT EXISTS banks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          type BOOLEAN,
          date DATETIME,
          desc TEXT,
          amountDeb INTEGER,
          amountCred INTEGER,
          amount INTEGER,
          runningBalance INTEGER
        )`);

exports.get = function(cb) {
  db.all('SELECT * FROM banks', cb);
};

exports.getOneById = function(id, cb) {
  db.get('SELECT * FROM banks WHERE id = ?', id, cb);
};

exports.removeById = function(id, cb) {
  db.run('DELETE FROM banks WHERE id = ?', id, cb);
};

exports.create = function(bank, cb) {
  if(!bank.amount || !bank.type) {
    return cb('Missing required field.')
  }
  var type = bank.type;
  var desc = bank.desc;
  var amount = bank.amount;
  var amountCred = bank.amountCred;
  var amountDeb = bank.amountDeb;
  var date = bank.date; //moment(bank.date).valueOf();
  var run = bank.runningBalance;

  db.run('INSERT INTO banks (type, date, desc, amountDeb, amountCred, amount, runningBalance) VALUES (?, ?, ?, ?, ?, ?, ?)', type , date , desc , amount, amountDeb, amountCred, run,
    (err) => {
      if(err) return cb(err);

      db.get(`SELECT *
              FROM    banks
              WHERE   ID = (SELECT MAX(ID)  FROM banks);`, cb)
    });
};

//
// exports.toggle = function(id, cb) {
//   this.getOneById(id, (err, bank) => {
//     if(err) return cb(err);
//
//     var newValue = bank.isComplete ? 0 : 1;
//
//     db.run("UPDATE banks SET isComplete = ? WHERE id = ?", newValue, id, (err) => {
//       if(err) return cb(err);
//       cb(null, newValue);
//     });
//   });
// };
