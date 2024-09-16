// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Payment{
    address[] private addressGroup ;
    /*
    struct User{
        address walletAddress;
        uint balance;
    }
`*/
    struct GroupStruct{
        address payer;
        address [] participants;
        uint totalAmount;
        address [] paidGuys;
        address [] unpaidGuys;
        bool isEveryonePaid;
    }

    mapping(uint => GroupStruct) public Groups;
    uint counter =0;
    //User user1;
    /*
    constructor(){
        user1.walletAddress = msg.sender;
        user1.balance = 50000;
    }
    */
    //function addFunds(uint64 amount) public{
    //    user1.balance +=amount;
    //}

    event PaymentProcessed(address payer, uint amount);

    function DoPayment(uint _groupID) payable public {
        /*
        for(uint j=0;j<inputArray.length;j++){
                if(user1.debt[inputArray[j]]!=0){
                    user1.balance=user1.balance-user1.debt[inputArray[j]];
                    user1.debt[inputArray[j]]=0;
                    //
                    emit PaymentProcessed(inputArray[j], user1.debt[inputArray[j]]);
                }
        }
        */
        
        GroupStruct storage existingGroup = Groups[_groupID];
        uint toBePaid = (existingGroup.totalAmount)/(existingGroup.participants.length);
        require(msg.value == toBePaid,"You should pay more");
        address payTo = existingGroup.payer;
        payable(payTo).transfer(msg.value);
        //user1.balance = user1.balance-msg.value;
        existingGroup.paidGuys.push(msg.sender);
        
        uint length = existingGroup.unpaidGuys.length;
        
        // Find the index of the address to remove
        uint index = length;
        for (uint i = 0; i < length; i++) {
            if (existingGroup.unpaidGuys[i] == msg.sender) {
                index = i;
                break;
            }
        }
        
        // Address not found in the array
        if (index == length) {
            revert("Address not found");
        }
        
        // Replace the element to be removed with the last element
        existingGroup.unpaidGuys[index] = existingGroup.unpaidGuys[length - 1];
        // Remove the last element
        existingGroup.unpaidGuys.pop();
        if(existingGroup.paidGuys.length == existingGroup.participants.length){
            existingGroup.isEveryonePaid=true;
        }
        else{
            existingGroup.isEveryonePaid=true;
        }
        emit PaymentProcessed(msg.sender, msg.value);
    }

    function createGroup(address[] memory participants,uint totalAmount,address payer) public{
        require(participants.length>0,"Atleast one participant required!");
        counter++;
        GroupStruct storage newGroup = Groups[counter];
        newGroup.payer = payer;
        newGroup.participants=participants;
        newGroup.totalAmount=totalAmount;
        newGroup.isEveryonePaid=false;
        newGroup.unpaidGuys=participants;
    }

    function viewBalance() public view returns (uint){
        return address(msg.sender).balance;
    }

    function whoPaid(uint _groupID) public view returns (address [] memory){
        GroupStruct storage existingGroup = Groups[_groupID];
        return existingGroup.paidGuys;
    }

    function whoDidntPay(uint _groupID) public view returns (address[] memory){
        GroupStruct storage existingGroup = Groups[_groupID];
        return existingGroup.unpaidGuys;
    }

    
    function paidAmount(uint _groupID) public view returns(uint){
        GroupStruct storage existingGroup = Groups[_groupID];
        uint payment= existingGroup.totalAmount/existingGroup.participants.length;
        return payment;
    }

    /*function getADDRESS() public view returns (address[] memory){
        return addressGroup;
    }

    function deleteAddress(address[] memory inpArr) public {
        for (uint64 i=0; i<= inpArr.length; i++) 
        {
            for (uint64 j=0;j<=addressGroup.length;j++){
                if (inpArr[i]==addressGroup[j]) {
                    delete(addressGroup[j]);
                }
            }
        }
    }
    function DoPayment(uint64 total) public view returns (uint){

        return total/addressGroup.length;
    }
*/
}