const AddData = artifacts.require("TestAddData");
let add;

contract('add data', () => {

    it("can add data", async () => {
      const storage = await AddData.deployed()
      const userId = 1
      
      const userInfo = await storage.profiles.call(userId)
      const username = web3.utils.toAscii(userInfo[1]).replace(/\u0000/g, '')
  
      assert.equal(username, "tristan")
    });
  
  })

