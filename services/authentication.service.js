angular.module('libraryApp')
  .service('AuthService', AuthService);

AuthService.$inject = ['$http', '$q'];
function AuthService($http, $q) {
  console.log('service');
  var self = this;  // similar to vm = this,
                    // but we're not working with a view-model here
                    // so using a generic variable name in this closure
  self.currentUser = null;  // we'll fill this in when needed
  self.users = [           // this will hold all users and passwords
    { username: 'guest', password: 'password' }
  ];
  self.create = create;   // create a user
  self.login = login;     // try to authenticate a user with password, username
  self.logout = logout;

  function logout(){
    self.currentUser = null;
  }

  function login(userInfo){
    console.log('logging in user with user info: ', userInfo);
    var def = $q.defer();
    return def.promise;

    for(var i=0; i< self.users.length; i++){
      if(self.users[i].username === username && self.users[i].password === password){
        self.currentUser = self.users[i];
        def.resolve(currentUser);
      }
    });
  }

  function create(newUserInfo) {
    console.log('creating user: ', newUserInfo);
    var def = $q.defer();

    if (newUserInfo.password !== newUserInfo.passwordConfirm){
      def.reject('User create error: password and password confirmation do not match');
    }

    for (var i=0; i<self.users.length; i++){
      if(self.users[i].username === newUserInfo.username){
        def.reject('User create error: username is taken');
      }
    }

    var newUser = {
      username: newUserInfo.username,
      password: newUserInfo.password
    };

    self.users.push(newUser);
    self.currentUser = newUser; // "logs in" new user
    def.resolve(newUser);   // send back new user
  }


  function update(bookToUpdate) {
    console.log('service updating book: ', bookToUpdate);
    var def = $q.defer();

    $http({
      method: 'PUT',
      url: 'https://super-crud.herokuapp.com/books/' + bookToUpdate._id,
      data: {
        title : bookToUpdate.title,
        author : bookToUpdate.author,
        image : bookToUpdate.image,
        releaseDate : bookToUpdate.releaseDate
      }
    }).then(onBookUpdateSuccess, onError);

    // we return the promise here - whenever it's complete any other .then's you attach will get run too
    return def.promise;


    // note how these functions are defined within the body of another function?
    // that gives them access to variables from that function
    // - see lexical scope & closures https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
    function onBookUpdateSuccess(response){
      console.log('here\'s the UPDATED data for book', bookToUpdate._id, ':', response.data);
      self.book = response.data;
      // ok, we got data, resolve the deferred - at this point we get to choose what we send on to the controller
      def.resolve(self.book); // resolve the deferred and send along the book
    }

    function onError(error) {
      console.log('service reported error updating book', book);
      self.book = {error: error};
      // oh noes!  error - reject the deferred - at this point we get to choose what we send on to the controller
      def.reject(self.book);
    }
  }


}
