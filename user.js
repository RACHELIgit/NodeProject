const { v4: uuidv4 } = require("uuid");

let userDB = [
  { name: "aaa", email: "sss@gg", phone: "054847", date: new Date() },
];

function User(name, email, phone, date) {
  (this.id = uuidv4()), (this.name = name);
  this.email = email;
  this.phone = phone;
  this.date = date;
}
var obj = {};

// module.exports = {
(obj.create = async function (name, email, phone, date) {
  const user =  new User(name, email, phone, date);
  userDB.push(user);
  return user;
}),
  (obj.read = () => {
    return userDB;
  }),
  (obj.readreadById = function (id) {
    return userDB.find((user) => user.id === id);
  }),
  (obj.update = function (id, name, email, phone, date) {
    const userIndex = userDB.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      userDB[userIndex].name = name;
      userDB[userIndex].email = email;
      userDB[userIndex].phone = phone;
      userDB[userIndex].date = date;

      return userDB[userIndex];
    } else {
      return null;
    }
  }),
  (obj.delete = function (id) {
    const userIndex = userDB.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      userDB.splice(userIndex, 1);
      return true;
    } else {
      return false;
    }
  });

module.exports = obj;

// };
