var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {

    var cleanAccount = function() {
        var account = {
            name: 'YOUR NAME HERE',
            startingBalace: 1000.00,
            runningBalance: 102924.75
        }
        return account;
    };

    var cleanTransaction = function() {
        var transaction = {
            type: 'debit',
            amountDeb: 0.00,
            amount: 0.00,
            amountCred: 0.00,
            runningBalance: 0.00,
            date: '',
            description: ''
        }

        return transaction;
    };

    var transactions = [{
        id: 1,
        amountCred: 1000.00,
        amount: 1000.00,
        description: 'Deposit',
        runningBalance: 1000.00,
        date: 'september 1',
        type: 'credit'
    }, {
        id: 2,
        amountDeb: 50.00,
        amount: 50.00,
        description: 'Beer',
        runningBalance: 950.00,
        date: 'september 1',
        type: 'debit'
    }, {
        id: 3,
        amountDeb: 25.25,
        amount: 25.25,
        description: 'Dive Bar',
        runningBalance: 924.75,
        date: 'september 2',
        type: 'debit'
    }, {
        id: 4,
        amountCred: 100000.00,
        amount: 100.00,
        description: 'PAYDAY!',
        runningBalance: 100924.75,
        date: 'september 7',
        type: 'credit'
    }];
    var id = 4;


    $scope.transaction = cleanTransaction();
    $scope.account = cleanAccount();

    $scope.transactionList = transactions;

    $scope.saveCredit = function() {
        id++
        $scope.transaction.id = id

        $scope.transaction.type = 'credit'
        var amount = parseFloat($scope.transaction.amount);
        var num = parseFloat($scope.account.runningBalance);
        var answer = 0;
        if ($scope.transaction.type === 'credit') {
            answer = num + amount
        } else {
            answer = num - amount
        }
        $scope.account.runningBalance = answer;
        $scope.transaction.amountCred = amount;
        $scope.transaction.amountDeb = null;
        $scope.transaction.amount = amount;
        $scope.transaction.runningBalance = answer;
        transactions.push($scope.transaction);
        $scope.transaction = cleanTransaction();
    };
    $scope.saveDebit = function() {
        id++;
        $scope.transaction.id = id;

        $scope.transaction.type = 'debit'

        var amount = parseFloat($scope.transaction.amount);
        var num = parseFloat($scope.account.runningBalance);
        var answer = 0;
        if ($scope.transaction.type === 'credit') {
            answer = num + amount
        } else {
            answer = num - amount
        }
        $scope.account.runningBalance = answer;
        $scope.transaction.amount = amount;
        $scope.transaction.amountDeb = amount;
        $scope.transaction.amountCred = null;
        $scope.transaction.runningBalance = answer;
        transactions.push($scope.transaction);
        console.log($scope.transaction.amountDeb)
        $scope.transaction = cleanTransaction();
    };

});


app.directive('moneywarn', function() {
    var staticWarningLevel = .2;

    return {
        restrict: 'A',
        scope: {
            val: '=moneywarn'
        },
        link: function(scope, element, attrs) {
            scope.$watch('val', function(newValue) {
                var startBalance = parseInt(attrs.startbalance);
                var warningLevel = startBalance * staticWarningLevel;
                if (newValue === warningLevel) {
                    element.addClass('alert-warning');
                    element.removeClass('alert-danger');
                } else if (newValue < warningLevel) {
                    element.addClass('alert-danger');
                } else {
                    element.removeClass('alert-warning');
                    element.removeClass('alert-danger');
                }

            }, true);
        }
    }

});

$('#bankbook').on('show.bs.modal', ".editor", function(event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
        // var recipient = button.data('whatever') // Extract info from data-* attributes
    var desc = button.data('desc');
    var runningBalance = button.data('runningBalance')
    var date = button.data('date')
    var amountDeb = button.data('amountDeb')
    var amountCred = button.data('amountCred')



    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
        // modal.find('.modal-title').text('New message to ' + recipient)
        // modal.find('.modal-body input').val(recipient)
    modal.find('.modal-title').text('Change the transaction: ' + desc)
    modal.find('.modal-date').text('Change the date: ' + date)




})
$('#bankbook').on('show.bs.modal', ".deleter", function(e) {

  console.log(this, e)
    $(this).find('.btn').attr('href', $(e.relatedTarget).data('href'));
    $('.debug-url').html('Delete URL: <strong>' + $(this).find('.btn-ok').attr('href') + '</strong>');
});
