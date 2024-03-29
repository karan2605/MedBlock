const CreateAccount = artifacts.require("TestCreateAccount");

contract('Create Account', () => {
  it("can fetch public key from NHS number", async () => {
    const instance = await CreateAccount.deployed(); // create an instance of the smart contract
    
    const account_one = accounts[0]; // fetch the blockchain account
    const nhsNumber = "0123456789"; // unique for each medical record.

    const fetched_key = await instance.returnNhsToAddr(nhsNumber).call(); // find the blockchain address from the NHS number

    assert.equal(account_one, fetched_key, "Public Key's not matching"); // assertion checks if the blockchain public keys match, returns error otherwise
  });
})