'use strict';

var app = angular.module('bankApp', []);

// controllers.js
// all controllers

app.controller('mainCtrl', function($scope, Bank) {
  console.log('mainCtrl!');


  Bank.getAll()
  .then(res => {
    $scope.banks = res.data;
    console.log($scope.banks)
  })
  .catch(err => {
    console.log('err:', err);
  });

  $scope.createBank = () => {
    Bank.create($scope.newBank)
    .then(res => {
      console.log("res from createBank: ", res)
      var bank = res.data;
      $scope.banks.push(bank);
      $scope.newBank = null;
    })
    .catch(err => {
      console.error(err);
    });
  };

  $scope.removeBank = bank => {
    Bank.remove(bank)
    .then(() => {
      var index = $scope.banks.indexOf(bank);
      $scope.banks.splice(index, 1);
    })
    .catch(err => {
      console.error(err);
    });
  };

  $scope.toggleComplete = bank => {
    console.log('toggleComplete bank:', bank);
    Bank.toggle(bank)
    .then(() => {

    })
    .catch(err => {
      console.error(err);
    });
  };


});
