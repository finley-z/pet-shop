
var TTVIP;

window.onload = function () {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    var abi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "timestamp",
                    "type": "uint64"
                }
            ],
            "name": "Transformed",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "amount",
                    "type": "uint16"
                },
                {
                    "name": "remark",
                    "type": "string"
                }
            ],
            "name": "addFund",
            "outputs": [
                {
                    "name": "touser",
                    "type": "address"
                },
                {
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "secondParty",
                    "type": "address"
                },
                {
                    "name": "shareProfit",
                    "type": "uint8"
                },
                {
                    "name": "expireYear",
                    "type": "uint8"
                },
                {
                    "name": "remark",
                    "type": "string"
                }
            ],
            "name": "signContract",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "from",
                    "type": "address"
                },
                {
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "amount",
                    "type": "uint16"
                },
                {
                    "name": "timestamp",
                    "type": "uint64"
                },
                {
                    "name": "remark",
                    "type": "string"
                }
            ],
            "name": "takerecord",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "firstParty",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "secondParty",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "timestamp",
                    "type": "uint64"
                }
            ],
            "name": "Signed",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "amount",
                    "type": "uint16"
                },
                {
                    "name": "remark",
                    "type": "string"
                }
            ],
            "name": "transform",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "accounts",
            "outputs": [
                {
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "name": "status",
                    "type": "uint16"
                },
                {
                    "name": "balance",
                    "type": "uint16"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "contents",
            "outputs": [
                {
                    "name": "firstParty",
                    "type": "address"
                },
                {
                    "name": "secondParty",
                    "type": "address"
                },
                {
                    "name": "shareProfit",
                    "type": "uint8"
                },
                {
                    "name": "expireYear",
                    "type": "uint8"
                },
                {
                    "name": "txHash",
                    "type": "uint64"
                },
                {
                    "name": "timestamp",
                    "type": "uint64"
                },
                {
                    "name": "remark",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getAccountInfo",
            "outputs": [
                {
                    "name": "status",
                    "type": "uint16"
                },
                {
                    "name": "balance",
                    "type": "uint16"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getContracts",
            "outputs": [
                {
                    "name": "",
                    "type": "uint160[6][]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "getTransactions",
            "outputs": [
                {
                    "name": "",
                    "type": "uint160[4][]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "nounces",
            "outputs": [
                {
                    "name": "",
                    "type": "uint64"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "test",
            "outputs": [
                {
                    "name": "val",
                    "type": "address"
                },
                {
                    "name": "t",
                    "type": "uint64"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "transactions",
            "outputs": [
                {
                    "name": "from",
                    "type": "address"
                },
                {
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "amount",
                    "type": "uint16"
                },
                {
                    "name": "timestamp",
                    "type": "uint64"
                },
                {
                    "name": "remark",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];


    var instance = web3.eth.contract(abi);
    TTVIP = instance.at("0xabd166225cf3dbce25f28482ba09aafc07b1245b");

    // var tx=TTVIP.test();
    var from = "0x3b44fc7839a68a7773bd3dfbe9c71f3b06517318";
//        var tx=getTransactions(from);
//        var tx=getContracts(from);
//        var tx=getAccountInfo(from);
//        var tx =signContract(from,"0xf96679550736c9a5c6284709ca166c9497a3cf98", 15,3, "test signContract");
//        var tx =transform(from,"0xf96679550736c9a5c6284709ca166c9497a3cf98", 1888, "test transform");
       var tx =addFund(from,"0x3b44fc7839a68a7773bd3dfbe9c71f3b06517318", 1999, "test addfund");
    console.log("res:" + tx);
    setupEventListeners();
}

function getAllAccounts() {
    return web3.eth.accounts;
}

function signContract(from,secondParty,shareProfit,expireYear,remark) {
    TTVIP.signContract(secondParty,shareProfit,expireYear,remark,{from:from});
    // getAllAdmins();
}
function transform(from,to,amount,remark) {
    TTVIP.transform(to,amount,remark,{from:from});
    // getAllAdmins();
}

function addFund(from,to,amount,remark) {
    TTVIP.addFund(to,amount,remark,{from:from});
    // getAllAdmins();
}

function setupEventListeners() {
    TTVIP.Signed(function (error, result) {
        if (error) {
            alert("签署失败，失败原因= " + printAll(error));
        } else {
            alert("签署成功，返回结果 = " + printAll(result));
            // getAllPunchCards();
        }
    });
    TTVIP.Transformed(function (error, result) {
        if (error) {
            alert("交易失败，失败原因 = " + printAll(error));
        } else {
            alert("交易成功，返回结果 = " + printAll(result));
            // getAllPunchCards();
        }
    });
}

function sanitize(members) {
    var sanitized = [];
    for (i = 0; i < members.length; i++) {
        if (members[i] != "0x0000000000000000000000000000000000000000") {
            sanitized.push(members[i]);
        }
    }
    return sanitized;
}


function getContracts(from) {
    return TTVIP.getContracts({from:from});
}

function getTransactions(from,to) {
    return TTVIP.getTransactions(to,{from:from});
}

function getAccountInfo(from) {
    return TTVIP.getAccountInfo({from:from});
}


function printAll(p) {
    console.info(p);
    var res = "[";
    for (var key in p) {
        if (p.hasOwnProperty(key)) {
            res += key + " -> " + p[key] + ", ";
        }
    }
    return res + "]";
}
