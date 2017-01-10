angular.module('libraryApp')
  .controller('LayoutController', LayoutController);

LayoutController.$inject=['AuthService'];
function LayoutController( AuthService) {
  var vm = this;
  // exports
  vm.currentUser = AuthService.currentUser;
  vm.login = function(userInfo){
    AuthService.login(userInfo);
  }
  vm.logout = AuthService.logout;
}
