const FindFriendUtil = require("../src/utils/findFriends");

describe("Test lfg v0 function", () => {
  test("find user role", () => {
    const ASH = FindFriendUtil.findCategory("ASH");
    expect(ASH).toMatchObject({ major: "ATTACKER", category: "ENTRY_FRAGGER" });

    const LESION = FindFriendUtil.findCategory("LESION");
    expect(LESION).toMatchObject({ major: "DEFENDER", category: "TRAPS" });
  });

  test("users are similar if have same role", () => {
    const userA = ["ASH", "BUCK", "MAVERICK"];
    const userB = ["ASH", "MONTAGNE", "MOZZIE"];

    const userARoles = userA.map(role => FindFriendUtil.findCategory(role));
    const userBRoles = userB.map(role => FindFriendUtil.findCategory(role));

    expect(FindFriendUtil.isUserSimilar(userARoles, userBRoles)).toBe(true);
  });

  test("user are similar if have similar role", () => {
    const userA = ["ASH", "BUCK", "MAVERICK"];
    const userB = ["TWITCH", "MONTAGNE", "MOZZIE"];

    const userARoles = userA.map(role => FindFriendUtil.findCategory(role));
    const userBRoles = userB.map(role => FindFriendUtil.findCategory(role));

    expect(FindFriendUtil.isUserSimilar(userARoles, userBRoles)).toBe(true);
  });

  test("users are different if all roles are different", () => {
    const userA = ["ASH", "BUCK", "MAVERICK"];
    const userB = ["VIGIL", "MONTAGNE", "MOZZIE"];

    const userARoles = userA.map(role => FindFriendUtil.findCategory(role));
    const userBRoles = userB.map(role => FindFriendUtil.findCategory(role));

    expect(FindFriendUtil.isUserSimilar(userARoles, userBRoles)).toBe(false);
  });
});
