var myapp=angular.module("myapp",["ui.router"]);myapp.run(function($rootScope){$rootScope.page=1;$rootScope.base="http://swapi.co/api/planets/?page="});myapp.service("store",function($rootScope,$http,$stateParams){$rootScope.storage={};this.getData=function(){$rootScope.id=$stateParams.id;$http.get("http://swapi.co/api/people/"+$rootScope.id+"/?format=json").then(resp=>{var arr=[resp.data.name,resp.data.gender,resp.data.birth_year];$rootScope.storage[$rootScope.id]=arr;$rootScope[$rootScope.id]=resp.data.name}).catch(error=>console.error(error.status));return $rootScope.id}});myapp.controller("ResidentCtrl",function($scope,$rootScope,$stateParams,store){$scope.index=$stateParams.id;$scope.answer=$rootScope.storage;store.getData();});myapp.service("xxx",function($http,$rootScope,$stateParams){$rootScope.planets=[];this.asdf=$stateParams.page;console.log(this.asdf);this.getPlanets=function(){var url="http://swapi.co/api/planets/?page=#&format=json".replace(/\#/,$stateParams.page);$http.get(url).then(resp=>{$rootScope.planets=resp.data.results.map(planet=>{planet.residents=planet.residents.map(resident=>{resident={url:resident};resident.id=resident.url.match(/\d+/)[0];resident.name=$rootScope[resident.id];return resident});$rootScope.planets.push(planet);return planet})})}});myapp.controller("PlanetCtrl",function($scope,$state,$rootScope,$stateParams,xxx,store){xxx.getPlanets();$scope.planets=$rootScope.planets;$scope.answer=$rootScope.storage;$scope.doSomething=function(){$scope.page+=1;};$scope.backSomething=function(){$rootScope.page-=1;xxx.getPlanets();$state.go("planets")}});myapp.config(function($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/planets/1");$stateProvider.state("planets",{url:"/planets/:page",templateUrl:"planets.html",controller:"PlanetCtrl"}).state("resident",{url:"/resident/:id",templateUrl:"resident.html",controller:"ResidentCtrl"})});
