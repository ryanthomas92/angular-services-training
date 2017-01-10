angular.module('libraryApp')
  .service('AuthService', AuthService);

AuthService.$inject = [];
function AuthService() {
  console.log('inside auth service');
  var self = this;  // similar to vm = this,
                    // but we're not working with a view-model here
                    // so using a generic variable name in this closure
  self.currentUser = { username: null, password: null };  // we'll fill this in when someone is logged in
  self.users = [           // this will hold all users and passwords
    { username: 'guest', password: 'password' }
  ];
  self.create = create;   // create a user
  self.update = update;   // update a user
  self.login = login;     // try to authenticate a user with password, username
  self.logout = logout;   // log out any current user

  function logout(){
    setCurrentUser(null, null);
  }

  function login(userInfo){
    console.log('logging in user with user info: ', userInfo);

    for(var i=0; i< self.users.length; i++){
      if(self.users[i].username === userInfo.username && self.users[i].password === userInfo.password){
        self.currentUser.username = self.users[i].username;
        self.currentUser.password = self.users[i].password;
        return { user: self.currentUser, error: null };
      }
    }
    return { user: null, error: 'incorrect login information' };

  }

  function create(newUserInfo) {
    console.log('creating user: ', newUserInfo);

    if (!newUserInfo.username){
      return { user: null, error: 'username required' };
    }
    if (!newUserInfo.password){
      return { user: null, error: 'password required' };
    }
    if (newUserInfo.password !== newUserInfo.passwordConfirm){
      return { user: null, error: 'password and password confirmation do not match' };
    }

    for (var i=0; i<self.users.length; i++){
      if(self.users[i].username === newUserInfo.username){
        return { user: null, error: 'username is taken' };
      }
    }

    var newUser = {
      username: newUserInfo.username,
      password: newUserInfo.password
    };

    self.users.push(newUser);
    setCurrentUser(newUser.username, newUser.password); // optional: "logs in" new user
    return { user: newUser, error: null };   // send back new user
  }


  function update(username, updatedInfo) {
    console.log('service updating user: ', username);
    if (username === self.currentUser.username){ // find user in array - usernames must be unique
      // get user index in array
      var index = self.users.indexOf(self.currentUser);

      // change user's info
      setCurrentUser(updatedInfo.username, updatedInfo.password);

      // make sure change is reflected in array
      self.users[index] = self.currentUser;

      // return
      return { user: self.currentUser, error: null };
    } else {
      return { user: null, error: 'must log in as user to edit' };
    }
  }

  function setCurrentUser(username, password){
    self.currentUser.username = username;
    self.currentUser.password = password;
  }
}
