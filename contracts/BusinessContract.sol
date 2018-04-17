pragma solidity ^0.4.2;

contract BusinessContract {
    struct Content{
        //甲方地址
        address firstParty;
        //乙方地址
        address secondParty;
        //甲方ID
        uint userId;
        //分润点 0-100 %
        uint shareProfit ;
        //有效时间  N 年
        uint expireYear;
        //交易哈希值
        uint txHash;
    }

    //合约内容集合
    mapping (address=>Content)  contents;

    event Save(address firstParty,address secondParty);

    //签署合约
    function signContract(address firstParty,address secondParty,uint userId,uint shareProfit,uint expireYear) public{
        Content con=Content(firstParty,secondParty,userId,shareProfit,expireYear);
        contents[msg.sender]=con;
        Save(msg.sender,secondParty);
    }


    function getContract(address signParty) public returns(address firstParty,address secondParty,uint userId,uint shareProfit,uint expireYear){
         firstParty=contents[signParty].firstParty;
         secondParty=contents[signParty].secondParty;
         userId=contents[signParty].userId;
         shareProfit=contents[signParty].shareProfit;
         expireYear=contents[signParty].expireYear;
    }
}