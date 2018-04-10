pragma solidity ^0.4.0;

contract AddressTest{

    function getBalance(address addr) public view returns (uint){
        return addr.balance;
    }

}