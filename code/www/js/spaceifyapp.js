function SpaceifyApp()
{
var self = this;

var spaceifyApp = window.angular.module("spaceifyApp", []);
var spLocale = window.spaceifyPage["locale"];
var spSection = window.spaceifyPage["section"];

	// BOOTSTRAPPED IN js/spaceify.edge.js!!! -- -- -- -- -- -- -- -- -- -- //

	// CONTROLLERS -- -- -- -- -- -- -- -- -- -- //
spaceifyApp.controller("bodyController", ["$scope", "$window", "$compile", "$timeout", function($scope, $window, $compile, $timeout)
	{
	$scope.safeApply = function(fn)
		{ // Get rid of "$apply already in progress errors" - https://coderwall.com/p/ngisma/safe-apply-in-angular-js
		var phase = this.$root.$$phase;
		if(phase == '$apply' || phase == '$digest')
			{
			if(fn && (typeof(fn) === 'function'))
				fn();
			}
		else
			this.$apply(fn);
		};

	$scope.getString = function(index)
		{
		return window.spLocales[spLocale][spSection][index];
		}

	$scope.addTile = function(detail)
		{
		$scope.manifest = (detail.manifest ? detail.manifest : {});
		$scope.src = (detail.src ? detail.src : "");
		$scope.id = (detail.id ? detail.id : "");

		$scope.safeApply(function()
			{
			var content = $compile(window.spTiles[detail.type])($scope);	// compile, bind to scope and append

			$("#" + detail.container).append(content[0]);

			if(typeof detail.callback == "function")
				$timeout(detail.callback, 0);
			});
		};
	}]);

	// DIRECTIVES -- -- -- -- -- -- -- -- -- -- //
spaceifyApp.directive("bodyDirective", ["$rootScope", "$compile", "$timeout", function($rootScope, $compile, $timeout)
	{
	return {
			restrict: "AE",
			bindToController: true,
			controller: "bodyController",
			link: function(scope, element, attr, controller, transcludeFn) {}
		};
	}]);

	// FILTERS -- -- -- -- -- -- -- -- -- -- //
spaceifyApp.filter("replace", function()
	{
	return function(input, find, replace_)
		{
		return input.replace(find, replace_);
		};
	});

spaceifyApp.filter("capitalize", function()
	{
	return function(input)
		{
		return input.charAt(0).toUpperCase() + input.slice(1);
		};
	});

spaceifyApp.filter("trustasresourceurl", ["$sce", function($sce)
	{
	return function(input)
		{
		return $sce.trustAsResourceUrl(input);
		};
	}]);

self.bootstrap = function()
	{
	//window.addEventListener("load", function()
	angular.element(document).ready(function()
		{
		angular.bootstrap(document, ["spaceifyApp"]);
		window.angularReady();
		});
	}

}

var spaceifyApp = new SpaceifyApp();