var db = require("../server/db");
var logger = require("./logger");

/*var Constant = require("../constant/app-constants");

const findCategory = (majorCategory, role) => {
  if (!role) {
    return undefined;
  }

  let category = undefined;

  const foundMajor = Object.keys(Constant.OPERATORS).find(major => {
    const majorCategory = Constant.OPERATORS[major];
    return (category = Object.keys(majorCategory).find(operator =>
      operator.includes(role)
    ));
  });

  logger.info("find user category for current user", foundMajor, category);

  return category;
};

const currentUserRole = currentUserId => {
  const currentUser = (db.users.records || []).find(
    user => user.id === currentUserId
  );

  let roles = [];
  roles.push(findCategory(currentUser.operator_a));
  roles.push(findCategory(currentUser.operator_b));
  roles.push(findCategory(currentUser.operator_c));

  roles = roles.filter(role => !!role);

  logger.info("current user is in the categories: ", roles.join(","));
};

exports.currentUserRole = currentUserRole;
*/

exports.findFriends = (amount, currentUserId) => {
  // get all stream users
  const allUsers = (db.users.records || []).filter(user => !!user.streamId);
  const allAmount = allUsers.length;
  let randomUsers = [];

  // return all users
  if (allAmount <= amount) {
    randomUsers = allUsers;
  } else {
    // find one more user and then filter
    while (
      randomUsers.length < amount + 1 &&
      randomUsers.length !== allAmount
    ) {
      const newIndex = Math.floor(Math.random() * allAmount);
      const newUser = allUsers[newIndex];

      // duplicated user found
      if (randomUsers.find(existUser => existUser.id === newUser.id)) {
        continue;
      } else {
        randomUsers.push(newUser);
      }
    }
  }

  // currentUserRole(currentUserId);

  // filter current user
  randomUsers = randomUsers.filter(
    randomUser => randomUser.id !== currentUserId
  );

  // remove extra user
  if (randomUsers.length > amount) {
    randomUsers = randomUsers.slice(0, amount);
  }

  logger.logger.info("Find friends amount:", randomUsers.length);
  return randomUsers;
};
