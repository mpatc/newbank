'use strict';

var app = angular.module('bankApp');

// services.js
// all services and factories

app.service('Bank', function($http) {

  // manage all bank api calls

  this.getAll = () => {
    return $http.get('/api/banks');
  };

  this.create = bank => {
    return $http.post('/api/banks', bank);
  };

  this.remove = bank => {
    return $http.delete(`/api/banks/${bank.id}`);
  };

  this.toggle = bank => {
    return $http.put(`/api/banks/${bank.id}/toggle`);
  };


});
