angular.module('libraryApp')
  .controller('LayoutController', LayoutController)
  .controller('LoginController', LoginController)
  .controller('SignupController', SignupController);

LayoutController.$inject=['AuthService'];
function LayoutController( AuthService ) {
  var vm = this;
  vm.currentUser = AuthService.currentUser;
  vm.logout = AuthService.logout;
}

LoginController.$inject = ['AuthService'];
function LoginController (  AuthService  ){
  var vm = this;
  vm.error = "";
  vm.loginInfo = {};
  vm.useGuestInfo = function(){
    console.log('click');
    vm.loginInfo.name = 'guest';
    vm.loginInfo.pw = 'password';
  }
  vm.login = function(){
    var result = AuthService.login({username: vm.loginInfo.name, password: vm.loginInfo.pw});
    if (result.error){
      console.error('login error:', result.error);
      vm.error = result.error;
    }
    vm.loginInfo = {};
  }
}

SignupController.$inject = ['AuthService'];
function SignupController (  AuthService  ){
  var vm = this;
  vm.error = "";
  vm.signupInfo = {};
  vm.signup = function(){
    var result = AuthService.create({
      username: vm.signupInfo.name,
      password: vm.signupInfo.pw,
      passwordConfirm: vm.signupInfo.pwConfirm
    });
    if (result.error){
      console.error('signup erorr:', result.error);
      vm.error = result.error;
    }
  }
}
