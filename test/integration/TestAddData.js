const CreateAccount = artifacts.require("TestCreateAccount");

contract('Create Account', () => {
  it("fetch add", async () => {
    const instance = await CreateAccount.deployed();
    
    const account_one = accounts[0];
    const cid = "QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t";
    const nhsNumber = "0123456789"; // unique for each medical record.

    const fetched_addr = await instance.returnNhsToAddr(nhsNumber).call(account_one);
    const fetched_cid = await instance.getHashByAddr(fetched_addr).call(account_one);

    const raw_data = await ipfs.cat(fetched_cid)
    const data = JSON.parse(raw_data)

    assert.equal(cid, fetched_cid, "CID's not matching")
      .then(assert.equal(data.nhsNumber, nhsNumber, 
      "NHS numbers not matching, incorrect record fetched"));
  });
})