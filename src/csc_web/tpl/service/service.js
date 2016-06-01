angular.module('app').controller('appServiceCtrl', ['$scope', function($scope) {

}])
angular.module('app').controller('timePickerCtrl', ['$scope', function($scope) {
  /*timePicker*/
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
}])

angular.module('app').controller('proAddStepsCtrl', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.inputGroupSuccessTree = "none";
  $scope.showTree = function() {
    $scope.inputGroupSuccessTree = "block"
  }
  $scope.hideTree = function() {
    $timeout(function() {
      $scope.inputGroupSuccessTree = "none";
    }, 200)
  }

  $scope.ztreeSetting1 = {
    view: {
      selectedMulti: false
    },
    data: {
      key: {
        title: "t"
      },
      simpleData: {
        enable: true
      }
    },
    callback: {

    }
  };
  $scope.ztreeData1 = [{
    name: "父节点1 - 展开",
    open: true,
    children: [{
      name: "父节点11 - 折叠",
      children: [{
        name: "叶子节点111"
      }, {
        name: "叶子节点112"
      }, {
        name: "叶子节点113"
      }, {
        name: "叶子节点114"
      }]
    }, {
      name: "父节点12 - 折叠",
      children: [{
        name: "叶子节点121"
      }, {
        name: "叶子节点122"
      }, {
        name: "叶子节点123"
      }, {
        name: "叶子节点124"
      }]
    }, {
      name: "父节点13 - 没有子节点",
      isParent: true
    }]
  }, {
    name: "父节点2 - 折叠",
    children: [{
      name: "父节点21 - 展开",
      open: true,
      children: [{
        name: "叶子节点211"
      }, {
        name: "叶子节点212"
      }, {
        name: "叶子节点213"
      }, {
        name: "叶子节点214"
      }]
    }, {
      name: "父节点22 - 折叠",
      children: [{
        name: "叶子节点221"
      }, {
        name: "叶子节点222"
      }, {
        name: "叶子节点223"
      }, {
        name: "叶子节点224"
      }]
    }, {
      name: "父节点23 - 折叠",
      children: [{
        name: "叶子节点231"
      }, {
        name: "叶子节点232"
      }, {
        name: "叶子节点233"
      }, {
        name: "叶子节点234"
      }]
    }]
  }];
}])
angular.module('app').controller('serviceProductHostListCtrl', ['$scope', '$filter', 'product', function($scope, $filter, product) {
  product.getHostData(function(data) {
    var Data = data.services;
    _.map(Data, function(num, key) {
      if (num.houryPrice != null) {
        num.priceType = "元/时";
        num.price = num.houryPrice.toFixed(2);
      } else if (num.monthPrice != null) {
        num.priceType = "元/月";
        num.price = num.monthPrice.toFixed(2);
      } else if (num.yearPrice != null) {
        num.priceType = "元/年";
        num.price = num.yearPrice.toFixed(2);
      };
      num.serviceState = num.serviceState == 0 ? "待发布" : "已发布";
    });
    $scope.datas = data.services;
  });
}])
angular.module('app').controller('serviceProductStorageListCtrl', ['$scope', '$filter', 'product', function($scope, $filter, product) {
  product.getStorageData(function(data) {
    var Data = data.services;
    _.map(Data, function(num, key) {
      if (num.houryPrice != null) {
        num.priceType = "元/时";
        num.price = num.houryPrice.toFixed(2);
      } else if (num.monthPrice != null) {
        num.priceType = "元/月";
        num.price = num.monthPrice.toFixed(2);
      } else if (num.yearPrice != null) {
        num.priceType = "元/年";
        num.price = num.yearPrice.toFixed(2);
      } else {
        num.priceType = "不计费";
        num.price = 0;
      };
      num.serviceState = num.serviceState == 0 ? "待发布" : "已发布";
    });
    $scope.datas = data.services;
  });
}])

angular.module('app').controller('serviceProductCtrl', ['$scope', '$filter', function($scope, $filter) {
  $scope.serviceText = {
    text: '这是一个XX产品，它主要的功能是…………这是一个XX产品，它主要的功能是…………这是一个XX产品，它主要的功能是…………这是一个XX产品，它主要的功能是…………',
    desc: 'Awesome user \ndescription!'
  };
  $scope.technologyText = {
    text: '这款产品应用了XXXX，参数是：XXXX：XXXXX；XXXX:XXXXX；XXXX：XXXXX；XXXX:XXXXX；XXXX：XXXXX；XXXX:XXXXX；',
    desc: 'Awesome user \ndescription!'
  };
  $scope.helpText = {
    text: '如需帮助，请联系管理员！',
    desc: 'Awesome user \ndescription!'
  };
  $scope.areaWidth = $('.text-edit-area').width() / 3.1;
  $scope.saveText = function(data, id) {
    //$scope.user not updated yet
    angular.extend(data, {
      id: id
    });
    // return $http.post('api/saveUser', data);
  };

  //tree导航
  var apple_selected, tree, treedata_avm, treedata_geography;
  $scope.my_tree_handler = function(branch) {
    var _ref;
    $scope.output = "You selected: " + branch.label;
    if ((_ref = branch.data) != null ? _ref.description : void 0) {
      return $scope.output += '(' + branch.data.description + ')';
    }
  };
  apple_selected = function(branch) {
    return $scope.output = "APPLE! : " + branch.label;
  };
  treedata_avm = [{
    label: 'Animal',
    children: [{
      label: 'Dog',
      data: {
        description: "man's best friend"
      }
    }, {
      label: 'Cat',
      data: {
        description: "Felis catus"
      }
    }, {
      label: 'Hippopotamus',
      data: {
        description: "hungry, hungry"
      }
    }, {
      label: 'Chicken',
      children: ['White Leghorn', 'Rhode Island Red', 'Jersey Giant']
    }]
  }, {
    label: 'Vegetable',
    data: {
      definition: "A plant or part of a plant used as food, typically as accompaniment to meat or fish, such as a cabbage, potato, carrot, or bean.",
      data_can_contain_anything: true
    },
    onSelect: function(branch) {
      return $scope.output = "Vegetable: " + branch.data.definition;
    },
    children: [{
      label: 'Oranges'
    }, {
      label: 'Apples',
      children: [{
        label: 'Granny Smith',
        onSelect: apple_selected
      }, {
        label: 'Red Delicous',
        onSelect: apple_selected
      }, {
        label: 'Fuji',
        onSelect: apple_selected
      }]
    }]
  }, {
    label: 'Mineral',
    children: [{
      label: 'Rock',
      children: ['Igneous', 'Sedimentary', 'Metamorphic']
    }, {
      label: 'Metal',
      children: ['Aluminum', 'Steel', 'Copper']
    }, {
      label: 'Plastic',
      children: [{
        label: 'Thermoplastic',
        children: ['polyethylene', 'polypropylene', 'polystyrene', ' polyvinyl chloride']
      }, {
        label: 'Thermosetting Polymer',
        children: ['polyester', 'polyurethane', 'vulcanized rubber', 'bakelite', 'urea-formaldehyde']
      }]
    }]
  }];
  treedata_geography = [{
    label: 'North America',
    children: [{
      label: 'Canada',
      children: ['Toronto', 'Vancouver']
    }, {
      label: 'USA',
      children: ['New York', 'Los Angeles']
    }, {
      label: 'Mexico',
      children: ['Mexico City', 'Guadalajara']
    }]
  }, {
    label: 'South America',
    children: [{
      label: 'Venezuela',
      children: ['Caracas', 'Maracaibo']
    }, {
      label: 'Brazil',
      children: ['Sao Paulo', 'Rio de Janeiro']
    }, {
      label: 'Argentina',
      children: ['Buenos Aires', 'Cordoba']
    }]
  }];
  $scope.my_data = treedata_avm;
  $scope.try_changing_the_tree_data = function() {
    if ($scope.my_data === treedata_avm) {
      return $scope.my_data = treedata_geography;
    } else {
      return $scope.my_data = treedata_avm;
    }
  };
  $scope.my_tree = tree = {};
  $scope.try_async_load = function() {
    $scope.my_data = [];
    $scope.doing_async = true;
    return $timeout(function() {
      if (Math.random() < 0.5) {
        $scope.my_data = treedata_avm;
      } else {
        $scope.my_data = treedata_geography;
      }
      $scope.doing_async = false;
      return tree.expand_all();
    }, 1000);
  };
  return $scope.try_adding_a_branch = function() {
    var b;
    b = tree.get_selected_branch();
    return tree.add_branch(b, {
      label: 'New Branch',
      data: {
        something: 42,
        "else": 43
      }
    });
  };
}])

angular.module('app').controller('serviceBillCtrl', ['$scope', function($scope) {
  $scope.switchFilter = function() {
    $('.adv-filter-btn').toggleClass('filterhasbg');
    $('.adv-filter-btn').find("span").toggleClass('rotate180');
    $(".adv-filter").toggleClass('hide');
  }
}])
angular.module('app').controller('serviceLogCtrl', ['$scope', function($scope) {
  $scope.switchFilter = function() {
    $('.adv-filter-btn').toggleClass('filterhasbg');
    $('.adv-filter-btn').find("span").toggleClass('rotate180');
    $(".adv-filter").toggleClass('hide');
  }
}])
angular.module('app').controller('appServiceRequisStepsCtrl', ['$scope', function($scope) {
  angular.element("#slider").on('slideStop', function(data) {
    updateModel(data.value);
  });
}]);