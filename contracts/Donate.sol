pragma solidity ^0.4.2;

contract Donate {
    address public organizer;
    event FundTransfer(address backer, uint amount, bool isContribution);

    modifier onlyOwner() {
        if (msg.sender != organizer) throw;
        _;
    }

    function Donate() public{
        organizer = msg.sender;
    }

    function destory() onlyOwner{
        if(msg.sender == organizer) {
            suicide(organizer);
        }
    }
}