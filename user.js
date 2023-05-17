let userDB = [{name:"aaa","email":"sss@gg","phone":"054847"}];

function User(name, email, phone) {
  this.id = userDB.length + 1;
  this.name = name;
  this.email = email;
  this.phone = phone;
}

module.exports = {
  create: function(name, email, phone) {
    const user = new User(name, email, phone);
    debugger
    userDB.push(user);
    return user;
  },
  read: function() {
    return userDB;
  },
  readById: function(id) {
    return userDB.find(user => user.id === id);
  },
  update: function(id, name, email, phone) {
    const userIndex = userDB.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      userDB[userIndex].name = name;
      userDB[userIndex].email = email;
      userDB[userIndex].phone = phone;
      return userDB[userIndex];
    } else {
      return null;
    }
  },
  delete: function(id) {
    const userIndex = userDB.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      userDB.splice(userIndex, 1);
      return true;
    } else {
      return false;
    }
  },
};