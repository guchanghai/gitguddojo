const FindFriendUtil = require("../src/utils/findFriends");

describe("Test find friend utility function", () => {
  test("test lfg v0 function", () => {
    const ASH = FindFriendUtil.findCategory("ASH");
    expect(ASH).toMatchObject({ major: "ATTACKER", category: "ENTRY_FRAGGER" });

    const LESION = FindFriendUtil.findCategory("LESION");
    expect(LESION).toMatchObject({ major: "DEFENDER", category: "TRAPS" });
  });
});
