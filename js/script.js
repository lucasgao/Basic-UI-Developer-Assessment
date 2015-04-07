(function(){

	var app = angular.module("routedTabs", ["ui.router", "ui.bootstrap"]);

	app.config(function($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise("/main/tab1");

		$stateProvider
			.state("main", { abtract: true, url:"/main", templateUrl:"view/main.html" })
				.state("main.tab1", { url: "/tab1", templateUrl: "view/tab1.html" })
				.state("main.tab2", { url: "/tab2", templateUrl: "view/tab2.html" })
				.state("main.tab3", { url: "/tab3", templateUrl: "view/tab3.html" })
				.state("main.tab4", { url: "/tab4", templateUrl: "view/tab4.html" });

	});








	app.controller("mainController", function($rootScope, $scope, $state) {		
	

		$scope.go = function(route){
			$state.go(route);
		};

		$scope.active = function(route){
			return $state.is(route);
		};

		$scope.tabs = [
			{ heading: "Step 1", route:"main.tab1", active:false },
			{ heading: "Step 2", route:"main.tab2", active:false, disabled:true },
			{ heading: "Step 3", route:"main.tab3", active:false, disabled:true },
			{ heading: "Step 4", route:"main.tab4", active:false, disabled:true }
		];

		$scope.$on("$stateChangeSuccess", function() {
			$scope.tabs.forEach(function(tab) {
				tab.active = $scope.active(tab.route);
			});
		});

	    $rootScope.$on("Tab", function(event, tab) {
	        console.log(tab);
	        $scope.tabs[tab].active = true;
	    });

	});

	app.controller('ExampleController', ['$scope',  '$rootScope', function($scope, $rootScope) {
	        
	        $scope.page = 1;

	        $scope.user={firstname:'',lastname:'',email:'',phone:''};
	        
			$scope.tabs =function(user) {
				$rootScope.user=$scope.user;
		
				$rootScope.$emit("Tab", $scope.page);
	
			};

	        $scope.master = {};

	        $scope.update = function(user) {
	            $scope.master = angular.copy(user);
	            console.log(user);
	        };

	        $scope.reset = function(form) {
	            if (form) {
	                form.$setPristine();
	                form.$setUntouched();
	            }
	            $scope.user = angular.copy($scope.master);
	        };

	        $scope.reset();


	    }]);

	}());



	angular.module('routedTabs').controller('TypeaheadCtrl', function($scope, $rootScope) {

    $scope.selected = undefined;
    $scope.states = ['Arizona', 'California', 'Florida', 'New Jersey', 'Pennsylvania'];
    $scope.statesWithFlags = [{'name':'Arizona','flag':'9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'},{'name':'California','flag':'0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'},{'name':'Florida','flag':'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'},{'name':'New Jersey','flag':'9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'},{'name':'Pennsylvania','flag':'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'}];

//
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open1 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened1 = true;
    };

    $scope.open2 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened2 = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

//
	$scope.page = 2;
    $scope.departTime = new Date();
    $scope.returnTime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.ismeridian = false;

    $rootScope.click = function() {
        
    	$rootScope.$emit("Tab", $scope.page);
    	console.log("222");
    	$rootScope.selected = $scope.selected;
    	$rootScope.departDate = $scope.departDate;
    	$rootScope.returnDate = $scope.returnDate;
    	$rootScope.departTime = $scope.departTime;
    	$rootScope.returnTime = $scope.returnTime;
    	$rootScope.states = $scope.states;
    	console.log($rootScope.departDate);
    };

});


angular.module('routedTabs').controller('ContentCtrl', function($scope, $rootScope) {
	$scope.tab3 = function(){
		$scope.page = 3;
		$rootScope.$emit("Tab", $scope.page);		
	}


    $scope.departDate = undefined;
    $scope.returnDate = undefined;
    $scope.departTime = undefined;
    $scope.returnTime = undefined;
    $scope.location = undefined;
    $scope.user = $rootScope.user;
     $scope.location = $rootScope.selected;
    	$scope.departDate = ($rootScope.departDate.getMonth() + 1) + "/" + $rootScope.departDate.getDate() + "/" + $rootScope.departDate.getFullYear();
    	$scope.returnDate = ($rootScope.returnDate.getMonth() + 1) + "/" + $rootScope.returnDate.getDate() + "/" + $rootScope.returnDate.getFullYear();
    	 $scope.departTime = $rootScope.departTime.getHours() + ":" + $rootScope.departTime.getMinutes();
    	$scope.returnTime = $rootScope.returnTime.getHours() + ":" + $rootScope.returnTime.getMinutes();
    	

});

angular.module('routedTabs').controller('FinalCtrl', function($scope, $rootScope) {
    $scope.hours = undefined;

    $scope.location = $rootScope.selected;
    $scope.states = [];
    diffday = Date.parse($rootScope.returnDate) - Date.parse($rootScope.departDate);
           diffday = diffday.toFixed(2) / 86400000;
        diffhour = $rootScope.returnTime.getHours()-$rootScope.departTime.getHours();
        if(diffhour<0){
            diffhour += 24;
            diffday -= 1;
        }
        $scope.hours = diffday*24+diffhour;
        for(var i=0;i<$rootScope.states.length;i++){
            if(location.name != $rootScope.states[i]) {
                $scope.states.push($rootScope.states[i]);
            }
        }

});