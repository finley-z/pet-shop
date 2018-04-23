pragma solidity ^0.4.2;
pragma experimental ABIEncoderV2;

contract BusinessContract {

    //合同内容
    struct Content{
        //合约ID (用户地址加上用户ID)
        //string contractId;

        //甲方地址
        address firstParty;

        //乙方地址
        address secondParty;

        //甲方ID
        uint userId;

        //分润点 0-100 %
        uint shareProfit;

        //有效时间  N 年
        uint expireYear;

        //交易哈希值
        uint txHash;

        //交易时间戳
        uint timestamp;

        //备注
        string remark;

    }

    //用户资金账户
    struct Account{

        //用户地址
        address userAddress;

        //用户ID
        uint userId;

        //余额    精确至分 换算成元  balance/100
        uint balance;
    }


    //交易记录
    struct Transaction{
        //发起人地址
        address from;

        //接收方地址
        address to;

        //交易金额
        uint amount;

        //交易时间
        uint timestamp;

        //备注
        string remark;

        //附加数据
        //byte[] data;

    }

    //资金账户数据
    mapping (address=>Account) public  accounts;

    //合约内容数据
    mapping (address=>mapping (address=>Content)) public  contents;
    mapping (address=>Content) public  cos;


    //交易记录
    Transaction[] public transactions;


    //合约事件
    event Save(address firstParty,address secondParty);

    //签署合约
    function signContract(address firstParty,address secondParty,uint userId,uint shareProfit,uint expireYear,string remark) public{

        Content memory con=Content(firstParty,secondParty,userId,shareProfit,expireYear,now,now,remark);

        contents[msg.sender][secondParty]=con;
        cos[msg.sender]=con;

       emit Save(msg.sender,secondParty);
    }

    //用户获取合约签署列表
    function getContracts(address secondParty) public  returns(address firstParty,address secondParty1,uint userId,uint shareProfit,uint expireYear,uint timestamp,string remark){
       return ( contents[msg.sender][secondParty].firstParty,contents[msg.sender][secondParty].secondParty,contents[msg.sender][secondParty].userId,
                contents[msg.sender][secondParty].shareProfit,contents[msg.sender][secondParty].expireYear,contents[msg.sender][secondParty].timestamp,contents[msg.sender][secondParty].remark);
    }

    //用户获取合约签署列表
    function getContract() public  returns(address firstParty,address secondParty1,uint userId,uint shareProfit,
                                                                   uint expireYear,uint timestamp,string remark){
       return ( cos[msg.sender].firstParty,cos[msg.sender].secondParty,cos[msg.sender].userId,
                cos[msg.sender].shareProfit,cos[msg.sender].expireYear,cos[msg.sender].timestamp,cos[msg.sender].remark);
    }

     //发起交易
    function transform(address to,uint amount,string remark) public{
        if(accounts[msg.sender].balance>amount){
            return;
        }
        accounts[msg.sender].balance-=amount;
        accounts[to].balance+=amount;
        this.takerecord(msg.sender,to,amount,now,remark);
    }

    //记录交易内容
    function takerecord(address from,address to,uint amount,uint timestamp,string remark){
        transactions.push(Transaction(from,to,amount,timestamp,remark));
    }

    //根据发送人或者接收人查看交易记录
  /*  function getTransactions(address from,address to,uint userId) public view returns(Transaction[] vars){
      Transaction[] tras;
      for (uint i = 0; i<transactions.length; i++) {
          Transaction t=transactions[i];
          if(t.from==from||t.to==to){
              tras.push(t);
          }
      }
      return tras;
    }
    */
}