const CreateAccount = artifacts.require("TestCreateAccount");

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

contract('Create Account', () => {
  it("fetch data from IPFS", async () => {
    const instance = await CreateAccount.deployed();
    
    const account_one = accounts[0];
    const cid = "QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t";
    const nhsNumber = "0123456789";

    const fetched_cid = await instance.getHash.call(account_one);

    const raw_data = await ipfs.cat(fetched_cid)
    const data = JSON.parse(raw_data)

    assert.equal(cid, fetched_cid, "CID's not matching")
      .then(assert.equal(data.nhsNumber, nhsNumber, "NHS numbers not matching, incorrect record fetched"));
  });
})
