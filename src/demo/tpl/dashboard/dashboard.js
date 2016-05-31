app.controller('DashboardCtrl', ['$scope', function($scope) {
  $scope.sparkline_datas = [
    {
      total: "1290",
      unit: "",
      name: "items",
      data: [106,108,110,105,110,109,105,104,107,109,105,100,105,102,101,99,98]
    },
    {
      total: "30,000",
      unit: "$",
      name: "revenue",
      data: [105,102,106,107,105,104,101,99,98,109,105,100,108,110,105,110,109]
    }
  ];

  $scope.stats = {
    new_items: 521,
    uploads: 930,
    comments: 432,
    feeds: 129,
    pie_data: [25, 75],
    revenue: 12670,
    goal: 60
  };

  $scope.reports = [
    {
      name: 'Consulting',
      value: 60,
      type: 'primary'
    },
    {
      name: 'Online Tutorials',
      value: 35,
      type: 'info'
    },
    {
      name: 'Edu Management',
      value: 25,
      type: 'warning'
    }
  ];

  $scope.counts = [
    {
      name: "Users",
      direction: "up",
      type: "success",
      value: "219k"
    },
    {
      name: "Items",
      direction: "down",
      type: "warning",
      value: "1230"
    },
    {
      name: "Orders",
      direction: "up",
      type: "success",
      value: "2839"
    },
    {
      name: "Visits",
      direction: "down",
      type: "danger",
      value: "2,300"
    }
  ];

  $scope.teammate = {
    stats: [
      {
        type: "primary",
        count: 12
      },
      {
        type: "info",
        count: 30
      },
      {
        type: "warning",
        count: 98
      }
    ],
    members: [
      {
        name: "Damon Parker",
        image: "img/a1.jpg",
        type: "primary",
        role: "Admin"
      },
      {
        name: "Joe Waston",
        image: "img/a2.jpg",
        type: "info",
        role: "Member"
      },
      {
        name: "Jannie Dvis",
        image: "img/a3.jpg",
        type: "warning",
        role: "Editor"
      },
      {
        name: "Emma Welson",
        image: "img/a4.jpg",
        type: "warning",
        role: "Editor"
      }
    ],
    total: 32
  };

  $scope.messages = [
    {
      name: "Chris Fox",
      image: "img/a4.jpg",
      content: "What's up, buddy",
      status: "on"
    },
    {
      name: "Amanda Conlan",
      image: "img/a5.jpg",
      content: "Come online and we need talk about the plans that we have discussed",
      status: "on"
    },
    {
      name: "Dan Doorack",
      image: "img/a6.jpg",
      content: "Hey, Some good news",
      status: "busy"
    },
    {
      name: "Lauren Taylor",
      image: "img/a7.jpg",
      content: "Nice to talk with you.",
      status: "busy"
    },
    {
      name: "Mike Jackson",
      image: "img/a8.jpg",
      content: "This is nice",
      status: "on"
    }
  ];

  $scope.followers = [
    {
      name: "Chris Fox",
      image: "img/a4.jpg",
      intro: "Designer, Blogger",
      status: "on"
    },
    {
      name: "Amanda Conlan",
      image: "img/a5.jpg",
      intro: "Writter, Mag Editor",
      status: "on"
    },
    {
      name: "Dan Doorack",
      image: "img/a6.jpg",
      intro: "Art director, Movie Cut",
      status: "busy"
    },
    {
      name: "Lauren Taylor",
      image: "img/a7.jpg",
      intro: "Musician, Player",
      status: "away"
    },
    {
      name: "Mike Jackson",
      image: "img/a8.jpg",
      intro: "Designer",
      status: "away"
    }
  ];

}]);