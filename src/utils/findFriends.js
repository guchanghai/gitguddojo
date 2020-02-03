var db = require("../server/db");
var logger = require("./logger");
var appConstant = require("../constant/app-constants");

const Constant = appConstant.CONST;

exports.getUserRole = userId => {
  const currentUser = (db.users.records || []).find(user => user.id === userId);

  let roles = [];
  roles.push(this.findCategory(currentUser.operator_a));
  roles.push(this.findCategory(currentUser.operator_b));
  roles.push(this.findCategory(currentUser.operator_c));

  roles = roles.filter(role => !!role);
  logger.logger.info("current user is in the categories: ", roles.join(","));

  return roles;
};

exports.findCategory = role => {
  if (!role) {
    return undefined;
  }

  let category = undefined;

  const foundMajor = Object.keys(Constant.OPERATORS).find(major => {
    const majorCategory = Constant.OPERATORS[major];
    return (category = Object.keys(majorCategory).find(operator =>
      majorCategory[operator].includes(role)
    ));
  });

  logger.logger.info(
    "find user category for current user",
    foundMajor,
    category
  );

  return { major: foundMajor, category };
};

exports.isUserSimilar = (currentUser, newUser) => {
  currentUser = currentUser || [];
  newUser = newUser || [];

  const rolesA = currentUser.map(user => user.category);
  const rolesB = newUser.map(user => user.category);

  return !!(
    rolesA.find(role => rolesB.includes(role)) ||
    rolesB.find(role => rolesA.includes(role))
  );
};

exports.findRandomFriends = (amount, currentUserId) => {
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

exports.findNonSimilarFriends = (amount, currentUserId) => {
  // get all stream users
  const allUsers = (db.users.records || []).filter(user => !!user.streamId);
  const allAmount = allUsers.length;

  let randomUsers = [];

  // return all users
  if (allAmount <= amount) {
    randomUsers = allUsers;
  } else {
    // find user randomly in the whole user base
    if (allAmount > 100) {
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
          // get current user roles
          const currentUserRoles = this.getUserRole(currentUserId);
          const newUserRoles = this.getUserRole(newUser.id);

          // ignore similar user
          if (this.isUserSimilar(currentUserRoles, newUserRoles)) {
            continue;
          } else {
            randomUsers.push(newUser);
          }
        }
      }
    } else {
      // find user from the start
      for (let i = 0; i < allAmount; i++) {
        const newUser = allUsers[i];

        // duplicated user found
        if (randomUsers.find(existUser => existUser.id === newUser.id)) {
          continue;
        } else {
          // get current user roles
          const currentUserRoles = this.getUserRole(currentUserId);
          const newUserRoles = this.getUserRole(newUser.id);

          // ignore similar user
          if (this.isUserSimilar(currentUserRoles, newUserRoles)) {
            continue;
          } else {
            randomUsers.push(newUser);
          }
        }

        if (randomUsers.length === amount) {
          break;
        }
      }
    }
  }

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

exports.findFriends = (amount, currentUserId) => {
  // Find not similar users firstly
  let recommendFriends = this.findNonSimilarFriends(amount, currentUserId);

  // If cannot find enough, then find some rand user
  if (recommendFriends.length < amount) {
    recommendFriends = recommendFriends.concat(
      this.findRandomFriends(amount - recommendFriends.length, currentUserId)
    );
  }

  return recommendFriends;
};
