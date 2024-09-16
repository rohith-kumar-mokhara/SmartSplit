import { EventLog, Web3 } from "web3";
//import path from "path";

const web3 = new Web3("http://127.0.0.1:8545/");

// Read the contract address from the file system
//const deployedAddressPath = path.join(__dirname, "MyContractAddress.txt");
//const deployedAddress = fs.readFileSync(deployedAddressPath, "utf8");
const deployedAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your contract address
// Create a new contract object using the ABI and address
import abi from "./MyContractAbi.json";
const myContract = new web3.eth.Contract(abi, deployedAddress);
myContract.handleRevert = true;



async function interact() {
  // const accounts = await web3.eth.getAccounts();
  //const defaultAccount = accounts[0];

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

//let wasd = []
const createGroup = async (participants: any[],total_amount:number,payer:any)=>{
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

const whoPaid = async (groupId:number): Promise<String[]> =>{
  try{
    const accounts = await web3.eth.getAccounts();
    const account0 = accounts[0];
    const who_paid: String[] = await myContract.methods.whoPaid(groupId).call({from: account0});
    console.log(`These addresses paid: ${who_paid}`);
    return who_paid;
    
  }
  catch(err){
    console.log(err);
    return [];
  }
};


const whoDidntPay = async (groupId:number): Promise<String[]> =>{
  try{
    const accounts = await web3.eth.getAccounts();
    const account0 = accounts[0];
    const who_didnt_pay: String[] = await myContract.methods.whoDidntPay(groupId).call({from: account0});
    console.log(`These addresses unpaid: ${who_didnt_pay}`);
    return who_didnt_pay;
  }
  catch(err){
    console.log(err);
    return [];
  }
};

const DoPayment = async (groupId:number) =>{
  try{
    const accounts = await web3.eth.getAccounts();
    const account0 = accounts[0];
    const value = 30.0;
    const valueInWei = web3.utils.toWei(value.toString(), 'wei'); // Convert Ether to Wei
    const DoPayments = await myContract.methods.DoPayment(groupId).send({from: account0,value: valueInWei});
    console.log(`Payment did: ${DoPayments}`);
  }
  catch(err){
    console.log(err);
  }
};

const DoPaymentEvent =  ()=>{
  myContract.events.PaymentProcessed({
    fromBlock:0,
  }).on('data',(event: EventLog)=>{
    console.log(event.returnValues.payer,event.returnValues.amount);
  })
}

const unsubscribe = async (eventArg:any)=>{
  await eventArg.unsubscribe();
}



//module.exports= {DoPayment,whoDidntPay,whoPaid,viewBalance,createGroup};
//console.log(wasd[1]);
//createGroup(['0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
// '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
//  '0x90F79bf6EB2c4f870365E785982E1f101E93b906'],1000,'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
export {createGroup,DoPayment,whoDidntPay,whoPaid,viewBalance,DoPaymentEvent,unsubscribe};
interact();