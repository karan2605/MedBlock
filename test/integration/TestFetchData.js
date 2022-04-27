const CreateAccount = artifacts.require("TestCreateAccount");

// connect to the IPFS using the infura IPFS gateway
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

contract('Create Account', () => {
  it("fetch data from IPFS", async () => {
    const instance = await CreateAccount.deployed(); // create an instance of the smart contract
    
    const account_one = accounts[0]; // fetch the blockchain account
    const cid = "QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t"; 
    const nhsNumber = "0123456789"; // unique for each medical record.

    const fetched_cid = await instance.getHash.call(account_one); // get the IPFS hash using blockchain address

    const raw_data = await ipfs.cat(fetched_cid) // fetch medical record from the IPFS
    const data = JSON.parse(raw_data) // parse the medical record into JSON format

    // Assertion below checks if the CID's first match, then if the NHS numbers match to
    // verify the correct record has been fetched.
    assert.equal(cid, fetched_cid, "CID's not matching")
      .then(assert.equal(data.nhsNumber, nhsNumber, "NHS numbers not matching, incorrect record fetched"));
  });
})
