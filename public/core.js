var app =  angular.module('myApp', ['uiGmapgoogle-maps']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', 
        {templateUrl: 'partials/main.html', 
        controller: 'mainController'
    	});
        
        $routeProvider.when('/main/:place', 
        {templateUrl: 'partials/main.html', 
        controller: 'mainController'
    	});
}]);

app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBwl_z0YfK4yPcZ_YYJPSU8lxrxoIKYv_c',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization, places'
    });
})


app.service('Map', function($q) {
    
    this.init = function() {
        var options = {
            center: new google.maps.LatLng(40.7127837, -74.00594130000002),
            zoom: 13,
            disableDefaultUI: true    
        }
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
    }
    
    this.search = function(str) {
        var d = $q.defer();
        this.places.textSearch({query: str}, function(results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    }
    
    this.addMarker = function(res) {
        if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP
        });
        this.map.setCenter(res.geometry.location);
    }
    
});

app.controller('mainController', function($scope, Map) {
    
    $scope.place = {};
    
    $scope.search = function() {
        $scope.apiError = false;
        Map.search($scope.searchPlace)
        .then(
            function(res) { // success
                Map.addMarker(res);
                $scope.place.name = res.name;
                $scope.place.lat = res.geometry.location.lat();
                $scope.place.lng = res.geometry.location.lng();
            },
            function(status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }
        );
    }
    
    $scope.send = function() {
        alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);    
    }
    
    Map.init();
});






// $scope.map = { control: {}, center: { latitude: 37.70, longitude: -122.344 }, zoom: 9, refresh: {}};

// function placeToMarker(searchBox, id) {

//   var place = searchBox.getPlaces();
//   if (!place || place == 'undefined' || place.length == 0) {
//     return;
//   }

//   var marker = {
//     id: id,
//     place_id: place[0].place_id,
//     name: place[0].name,
//     address: place[0].formatted_address,
//     latitude: place[0].geometry.location.lat(),
//     longitude: place[0].geometry.location.lng(),
//     latlng: place[0].geometry.location.lat() + ',' + place[0].geometry.location.lng()
//   };
// // push your markers into the $scope.map.markers array
// if (!$scope.map.markers) {
//     $scope.map.markers = [];
//   }

// // THIS IS THE KEY TO RECENTER/REFRESH THE MAP, to your question
// $scope.map.control.refresh({latitude: marker.latitude, longitude: marker.longitude});

// // the following defines the SearchBox on your Controller; events call placeToMarker function above
// var searchBoxEvents = {
//   places_changed: function (searchBox) {
//     placeToMarker(searchBox, id);
//   }
// };

// // this is defined on the Controller, as well. This specifies which template searchBoxEvents should match to; note the parentdiv
//   $scope.searchBox = { template:'searchBox.template.html', events:searchBoxEvents, parentdiv: 'searchBoxParent'};
	



// myApp.service('nameService', function(){
// 	var self = this;
// 	this.name = "isha";
// 	this.nameLength = function(){
// 	return self.name.length; 
// 	};
// });





	// $scope.inputData = {}; //initializing object

	//when landing on the page, get all todos and show
	// $http.get('/api/todos') //ADD GOOGLE API HERE
	// 	.success(function(data){
	// 		$scope.todos = data;
	// 		console.log(data);
	// 	})
	// 	.error(function(data){
	// 		console.log('Error: ' + data);
	// 	});

	// //when submitting the add form, send the text to the node API
	// $scope.createTodo = function(){
	// 	$http.post('/api/todos', $scope.inputData)
	// 	.success(function(data){
	// 		$scope.inputData = {}; //clear the form so our user can enter another
	// 		$scope.todos = data;
	// 		console.log(data);
	// 	})
	// 	.error(function(data){
	// 		console.log('Error: ' + data);
	// 	});
	// };
	// // delete a todo after checking it
	// $scope.deleteTodo = function(id){
	// 	$http.delete('/api/todos/' +id)
	// 	.success(function(data){
	// 		$scope.todos = data;
	// 		console.log(data);
	// 	})
	// 	.error(function(data){
	// 		console.log('Error: ' +data);
	// 	});
	// };

	

// myApp.controller('teamController', ['$scope', '$http', '$routeParams', 'nameService', function($scope, $http, $routeParams, nameService){
// 	$scope.person =  $routeParams.person || "";
// 	console.log(nameService.nameLength());

// 	$scope.name = nameService.name;
// 	$scope.$watch('name', function(){
// 		nameService.name = $scope.name;
// 	});	

// 	$scope.search = function(){
// 		$http.post('/team', $scope.inputData)
// 		.success(function(data){
// 			$scope.inputData = {}; //clear the form so our user can enter another
// 			$scope.todos = data;
// 			console.log(data);
// 		})
// 		.error(function(data){
// 			console.log('Error: ' + data);
// 		});
// 	};

// }]);


// myApp.directive("searchResult", function(){
// 	return {
// 		template: '<a href="#" class="list-group-item active"><h4 class="list-group-item-heading">List group item heading</h4><p class="list-group-item-text">...</p></a>',
// 		replace: true
// 	}
// });

