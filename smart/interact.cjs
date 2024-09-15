const { Web3 } = require("web3");
const path = require("path");
const fs = require("fs");

const web3 = new Web3("http://127.0.0.1:8545/");

// Read the contract address from the file system
const deployedAddressPath = path.join(__dirname, "MyContractAddress.txt");
const deployedAddress = fs.readFileSync(deployedAddressPath, "utf8");

// Create a new contract object using the ABI and address
const abi = require("./MyContractAbi.json");
const myContract = new web3.eth.Contract(abi, deployedAddress);
myContract.handleRevert = true;



async function interact() {
  const accounts = await web3.eth.getAccounts();
  const defaultAccount = accounts[0];

  try {
    // Get the current value of my number
    const myNumber = await myContract.methods.viewBalance().call();
    console.log("myNumber value: " + myNumber);

    // Increment my number
    /*
    const receipt = await myContract.methods
      .setMyNumber(BigInt(myNumber) + 1n)
      .send({
        from: defaultAccount,
        gas: 1000000,
        gasPrice: "10000000000",
      });
    console.log("Transaction Hash: " + receipt.transactionHash);

    // Get the updated value of my number
    const myNumberUpdated = await myContract.methods.viewBalance().call();
    console.log("myNumber updated value: " + myNumberUpdated);
    */
  } catch (error) {
    console.error(error);
  }
}

let wasd = []
const createGroup = async(participants,total_amount,payer)=>{
    try{
        const accounts = await web3.eth.getAccounts();
        //console.log("Accounts",accounts);
        //wasd=accounts;
        const account0 = accounts[0];

        try{
            const creating = await myContract.methods.createGroup(participants,total_amount,payer).send({from: account0});
            console.log(`Creating Group: ${creating}`);
        }
        catch(err){
            console.log(err);
        }
    }
    catch(err){
        console.log(err);
    }
};

const viewBalance = async ()=>{
  try{
    const accounts = await web3.eth.getAccounts();
    const account0 = accounts[0];
    const balance = await myContract.methods.viewBalance().call({from: account0});
    console.log(`Your balance is: ${balance}`);
  }
  catch(err){
    console.log(err);
  }
};

const whoPaid = async (groupId) =>{
  try{
    const accounts = await web3.eth.getAccounts();
    const account0 = accounts[0];
    const who_paid = await myContract.methods.whoPaid(groupId).call({from: account0});
    console.log(`These addresses paid: ${who_paid}`);
  }
  catch(err){
    console.log(err);
  }
};

const whoDidntPay = async (groupId) =>{
  try{
    const accounts = await web3.eth.getAccounts();
    const account0 = accounts[0];
    const who_didnt_pay = await myContract.methods.whoDidntPay(groupId).call({from: account0});
    console.log(`These addresses paid: ${who_didnt_pay}`);
  }
  catch(err){
    console.log(err);
  }
};

const DoPayment = async (groupId) =>{
  try{
    const accounts = await web3.eth.getAccounts();
    const account0 = accounts[0];
    const value = 10;
    const DoPayments = await myContract.methods.DoPayment(groupId).send({from: account0,value: value});
    console.log(`Payment did: ${DoPayments}`);
  }
  catch(err){
    console.log(err);
  }
};

export {DoPayment,whoDidntPay,whoPaid,viewBalance,createGroup};
//console.log(wasd[1]);
createGroup(['0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906'],1000,'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
interact();