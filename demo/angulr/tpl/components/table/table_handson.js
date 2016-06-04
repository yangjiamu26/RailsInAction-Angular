app.controller('HandsonTableCtrl', ['$scope', '$timeout', function($scope, $timeout) {
     $scope.db = {};
     $scope.db.items = [
       {
         "id": 1,
         "name": {
           "first": "John",
           "last": "Schmidt"
         },
         "address": "45024 France",
         "price": 760.41,
         "isActive": "Yes",
         "product": {
           "description": "Fried Potatoes",
           "options": [
             {
               "description": "Fried Potatoes",
               "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png"
             },
             {
               "description": "Fried Onions",
               "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png"
             }
           ]
         }
       },
       {
         "id": 2,
         "name": {
           "first": "John",
           "last": "Schmidt"
         },
         "address": "45024 France",
         "price": 760.41,
         "isActive": "Yes",
         "product": {
           "description": "Fried Potatoes",
           "options": [
             {
               "description": "Fried Potatoes",
               "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png"
             },
             {
               "description": "Fried Onions",
               "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png"
             }
           ]
         }
       },
       {
         "id": 3,
         "name": {
           "first": "John",
           "last": "Schmidt"
         },
         "address": "45024 France",
         "price": 760.41,
         "isActive": "Yes",
         "product": {
           "description": "Fried Potatoes",
           "options": [
             {
               "description": "Fried Potatoes",
               "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png"
             },
             {
               "description": "Fried Onions",
               "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png"
             }
           ]
         }
       }              
       //more items go here
     ];

}]);