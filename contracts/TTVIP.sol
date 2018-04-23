pragma solidity ^0.4.2;
contract TTVIP {
    //合同内容
    struct Content{
        //string contractId;     //合约ID (用户地址加上用户ID)
        address firstParty;      //甲方地址
        address secondParty;     //乙方地址
        uint userId;             //甲方ID
        uint shareProfit;       //分润点 0-100 %
        uint expireYear;        //有效时间  N 年
        uint txHash;            //交易哈希值
        uint timestamp;          //交易时间戳
        string remark;          //备注
    }

    //用户资金账户
    struct Account{
        address userAddress;    //用户地址
        uint userId;            //用户ID
        uint balance;           //余额  精确至分 换算成元  balance/100
    }

    //交易记录
    struct Transaction{
        address from;          //发起人地址
        address to;           //接收方地址
        uint amount;          //交易金额
        uint timestamp;       //交易时间
        string remark;        //备注
        //byte[] data;        //附加数据
    }
    //合约创建人，管理员
    address admin;
    //资金账户数据
    mapping (address=>Account) public  accounts;
    //合约的总个数
    uint64 contentLength;
    //合约内容数据
    mapping (address=>Content[]) public contents;
    //交易记录
    Transaction[] public transactions;
    //交易序号
    mapping (address=>uint) public nounces;

    //签署事件
    event Signed(address indexed firstParty,address indexed secondParty,uint userId,uint timestamp);
    //交易事件
    event Transformed(address indexed from,address indexed to,uint timestamp);

    function TTVIP() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        if (msg.sender != admin) throw;
        _;
    }

    //签署合约
    function signContract(address firstParty,address secondParty,uint userId,uint shareProfit,uint expireYear,string remark) public{
        Content memory con=Content(firstParty,secondParty,userId,shareProfit,expireYear,now,now,remark);
        contents[msg.sender].push(con);
        contentLength++;
        Signed(msg.sender,secondParty,userId,now);
    }

    //获取合同内容列表
    function getContractsInternal(address useraddress) constant internal returns(uint[7][]) {
        uint[7][] memory temp;
        Content[] contracts;
        if(useraddress==admin){
            contracts = contents[useraddress];
            temp = new uint[7][](contentLength);
        }else{
            contracts = contents[useraddress];
            uint length=contracts.length;
            temp = new uint[7][](length);
        }
        for (uint64 i = 0; i < length; i++) {
            temp[i] = [uint(contracts[i].firstParty),uint(contracts[i].secondParty),contracts[i].userId,
            contracts[i].shareProfit,contracts[i].expireYear,contracts[i].txHash,contracts[i].timestamp];
        }
        return temp;
    }

    //用户获取合约签署列表
    function getContracts()public  view returns(uint[7][]) {
        return getContractsInternal(msg.sender);
    }


     //发起交易
    function transform(address to,uint amount,string remark) public{
        if(accounts[msg.sender].balance>amount){
            return;
        }
        var timestamp=now;
        accounts[msg.sender].balance-=amount;
        accounts[to].balance+=amount;
        nounces[msg.sender]++;
        this.takerecord(msg.sender,to,amount,timestamp,remark);
        Transformed(msg.sender,to,timestamp);
    }

    //记录交易内容
    function takerecord(address from,address to,uint amount,uint timestamp,string remark){
        transactions.push(Transaction(from,to,amount,timestamp,remark));
    }

    //获取合同内容列表
    function getTransactionsInternal(address from,address to,uint userId) constant internal returns(uint[4][]) {
         uint[4][] memory temp;

        if(from==admin){
          temp=new uint[4][](transactions.length);
          for (uint64 i = 0; i < transactions.length; i++) {
              Transaction t=transactions[i];
              if(t.to==to){
                 temp[i]=[uint(t.from),uint(t.to),t.amount,t.timestamp];
               }
          }
        }else{
            temp=new uint[4][](nounces[msg.sender]);
            for (uint64 j = 0; i < transactions.length; i++) {
              Transaction t2=transactions[j];
               if(t2.from==from||t2.to==to){
                 temp[i]=[uint(t2.from),uint(t2.to),t2.amount,t2.timestamp];
               }
          }
        }

        return temp;
    }

    //根据发送人或者接收人查看交易记录
   function getTransactions(address to,uint userId) public view returns(uint[4][]){
         return getTransactionsInternal(msg.sender,to,userId);
    }

    //获取账户信息
   function getAccountInfo() public view returns(uint userId,uint balance){
         Account account=accounts[msg.sender];
         return (account.userId,account.balance);
    }

    //给账户加款
   function addFund(address to,uint amount,string remark) public onlyAdmin() returns(address touser,uint userId,uint balance){
         accounts[to].balance+=amount;
         this.takerecord(msg.sender,to,amount,now,remark);
         nounces[msg.sender]++;
         Transformed(msg.sender,to,now);
         return (to,accounts[to].userId,accounts[to].balance);
    }

   //测试
   function test() public view returns(uint val){
       uint va=uint(now);
       return va;
   }
}