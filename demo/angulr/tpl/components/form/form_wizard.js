angular.module('app')
.controller('WizardCtrl', function($scope, $q, $timeout, WizardHandler) {

    $scope.canExit = true;
    $scope.stepActive = true;

    $scope.finished = function() {
        alert("Wizard finished :)");
    };
    $scope.logStep = function() {
        console.log("Step continued");
    };
    $scope.goBack = function() {
        WizardHandler.wizard().goTo(0);
    };
    $scope.exitWithAPromise = function() {
        var d = $q.defer();
        $timeout(function() {
            d.resolve(true);
        }, 1000);
        return d.promise;
    };
    $scope.exitToggle = function() {
        $scope.canExit = !$scope.canExit;
    };
    $scope.stepToggle = function() {
        $scope.stepActive = !$scope.stepActive;
    }
    $scope.exitValidation = function() {
        return $scope.canExit;
    };






    /**multi step form **/
    $scope.form_steps = [
    {
        templateUrl: 'tpl/components/form/form_wizard_step1.html',
        title: 'Get the source'
    },
    {
        templateUrl: 'tpl/components/form/form_wizard_step2.html',
        title: 'Add it to your app'
    },
    {
        templateUrl: 'tpl/components/form/form_wizard_step3.html',
        title: 'Create your multi step forms / wizzards'
    },
    {
        template: '<div class="well">More docs available on Github</div>',
        title: 'Read the docs'
    }
];
});