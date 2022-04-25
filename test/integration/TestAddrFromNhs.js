const CreateAccount = artifacts.require("TestCreateAccount");

contract('Create Account', () => {
  it("can fetch public key from NHS number", async () => {
    const instance = await CreateAccount.deployed();
    
    const account_one = accounts[0];
    const nhsNumber = "0123456789"; // unique for each medical record.

    const fetched_key = await instance.returnNhsToAddr(nhsNumber).call();

    assert.equal(account_one, fetched_key, "Public Key's not matching");
  });
})