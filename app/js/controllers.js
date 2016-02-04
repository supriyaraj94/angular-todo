'use strict';

/* Controllers */

var todoApp = angular.module('todoApp',[]);

todoApp.controller('todoListCtrl', function($scope,$filter){
  $scope.items = localStorage.getItem("todo")?JSON.parse(localStorage.getItem("todo")):[];
  $scope.editedItem=null;
  $scope.remainingCount=0
  $scope.currentItem="";
  $scope.select="";
  $scope.changeItem=function(event)
    {
  	if($scope.currentItem && event.keyCode==13)
  		{ 
  			$scope.items.push({name:$scope.currentItem,status:false});
  			$scope.currentItem="";
  		}
      $scope.save();  
    }

  $scope.removeItem=function(item)
    {
  	$scope.items.splice($scope.items.indexOf(item),1);
    $scope.save();
    }

  $scope.editItem = function ($event,item)
    {
		$scope.editedItem = item;
		};

  $scope.saveEdits=function(item)
    {	
 	  $scope.editedItem = null;
    $scope.save();
    };

  $scope.$watch('items', function ()
    {
          $scope.save();
		$scope.remainingCount = $filter('filter')($scope.items, { status: false }).length;
		}, true);

  $scope.save = function () 
    {
      localStorage["todo"] = JSON.stringify($scope.items);
      //alert(localStorage.todo);
    }


});

todoApp.directive('showFocus', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.showFocus, 
      function (newValue) { 
        $timeout(function() {
            newValue && element.focus();
        });
      },true);
  };    
});
