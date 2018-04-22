var punchClock;
var owner;
var piEvent;
var poEvent;
var allMembers;
var allAdmins;
var punchClock;

window.onload = function () {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    var abi = [
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "admin",
                    "type": "address"
                }
            ],
            "name": "AdminAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "member",
                    "type": "address"
                }
            ],
            "name": "MemberAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "admin",
                    "type": "address"
                }
            ],
            "name": "AdminRemoved",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "member",
                    "type": "address"
                }
            ],
            "name": "MemberRemoved",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "member",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "inTime",
                    "type": "uint64"
                }
            ],
            "name": "PunchedIn",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "member",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "outTime",
                    "type": "uint64"
                }
            ],
            "name": "PunchedOut",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "oldOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnerChanged",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "admin",
                    "type": "address"
                }
            ],
            "name": "addAdmin",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "member",
                    "type": "address"
                }
            ],
            "name": "addMember",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getMyPunchCards",
            "outputs": [
                {
                    "name": "punchCards",
                    "type": "uint64[2][]"
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
                    "name": "member",
                    "type": "address"
                }
            ],
            "name": "getPunchCardsOf",
            "outputs": [
                {
                    "name": "punchcards",
                    "type": "uint64[2][]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getAllMembers",
            "outputs": [
                {
                    "name": "",
                    "type": "address[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getAllAdmins",
            "outputs": [
                {
                    "name": "",
                    "type": "address[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getOwner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "member",
                    "type": "address"
                },
                {
                    "name": "inTime",
                    "type": "uint64"
                }
            ],
            "name": "punchIn",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "member",
                    "type": "address"
                },
                {
                    "name": "outTime",
                    "type": "uint64"
                }
            ],
            "name": "punchOut",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "admin",
                    "type": "address"
                }
            ],
            "name": "removeAdmin",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "member",
                    "type": "address"
                }
            ],
            "name": "removeMember",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "person",
                    "type": "address"
                }
            ],
            "name": "isMember",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
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
                    "name": "person",
                    "type": "address"
                }
            ],
            "name": "isAdmin",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "changeOwner",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "destroy",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    var instance = web3.eth.contract(abi);
    punchClock = instance.at("0xebb8707b0d039642e3cdfb149bfa1909540756b7");

    var accounts = getAllAccounts();
    // Note: the defaultAccount must be the owner of the contract, so that we can perform actions with this account
    web3.eth.defaultAccount = accounts[0];
    document.getElementById("allAccounts").innerHTML = printAddresses(accounts);

    // Note: we'll use the instance created by 'truffle migrate --reset' command
    // Alternatively, you can create a new one every time by using:
    // PunchClock.new({
    //    from: web3.eth.defaultAccount, 
    //    gas: 4712388,
    //    gasPrice: 100000000000
    // })

    setupEventListeners();
    getAllAdmins();

}

function addAdmin() {
    var admin = document.getElementById("addAdmin").value;
    console.log("adding admin = " + admin);
    punchClock.addAdmin(admin);
    getAllAdmins();

}

function removeAdmin() {
    var admin = document.getElementById("removeAdmin").value;
    punchClock.removeAdmin(admin);
        getAllAdmins();

}

function addMember() {
    var member = document.getElementById("addMember").value;
    punchClock.addMember(member);
        getAllMembers();

}

function removeMember() {
    var member = document.getElementById("removeMember").value;
    punchClock.removeMember(member);
        getAllMembers();

}

function punchIn() {
    var member = document.getElementById("piMember").value;
    var ts = getCurrentTime();
    punchClock.punchIn(member, ts);
}

function punchOut() {
    var member = document.getElementById("poMember").value;
    var ts = getCurrentTime();
    punchClock.punchOut(member, ts);
}

function getAllAccounts() {
    return web3.eth.accounts;
}

function getCurrentTime() {
    return Math.floor(Date.now() / 1000);
}

function handlePunching(error, result) {
}

function setupEventListeners() {
    punchClock.PunchedIn(function (error, result) {
        if (error) {
            alert("Failed to punch in. Error = " + printAll(error));
        } else {
            alert("Punched in successfully. Result = " + printAll(result));
            getAllPunchCards();
        }
    });
    punchClock.PunchedOut(function (error, result) {
        if (error) {
            alert("Failed to punch out. Error = " + printAll(error));
        } else {
            alert("Punched out successfully. Result = " + printAll(result));
            getAllPunchCards();
        }
    });
    punchClock.AdminAdded(function (error, result) {
        if (error) {
            alert("Failed to add admin. Error = " + printAll(error));
        } else {
            alert("Add admin successfully. Result = " + printAll(result));
            getAllAdmins();
        }
    });
    punchClock.AdminRemoved(function (error, result) {
        if (error) {
            alert("Failed to remove admin. Error = " + printAll(error));
        } else {
            alert("Remove admin successfully. Result = " + printAll(result));
            getAllAdmins();
        }
    });
    punchClock.MemberAdded(function (error, result) {
        if (error) {
            alert("Failed to add member. Error = " + printAll(error));
        } else {
            alert("Add member successfully. Result = " + printAll(result));
            getAllMembers();
        }
    });
    punchClock.MemberRemoved(function (error, result) {
        if (error) {
            alert("Failed to remove member. Error = " + printAll(error));
        } else {
            alert("Remove member successfully. Result = " + printAll(result));
            getAllMembers();
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


function getAllAdmins() {
    document.getElementById("admins").innerHTML = "";
    // punchClock.getAllAdmins().then(function(admins) {
    //     this.allAdmins = sanitize(admins);
    //     document.getElementById("admins").innerHTML = printAddresses(this.allAdmins);
    // }).then(function() {
    //     getAllMembers();
    // })

    var admins = punchClock.getAllAdmins();
    this.allAdmins = sanitize(admins);
    document.getElementById("admins").innerHTML = printAddresses(this.allAdmins);
    getAllMembers();

}

function getAllMembers() {
    document.getElementById("members").innerHTML = "";
    var members = punchClock.getAllMembers();
    this.allMembers = sanitize(members);
    document.getElementById("members").innerHTML = printAddresses(this.allMembers);

    getAllPunchCards();
}

function getAllPunchCards() {
    document.getElementById("punchCards").innerHTML = "";

    // Note: need to handle processing of a list of Promise properly. This causes bug!
    for (i = 0; i < this.allMembers.length; i++) {
        var member = this.allMembers[i];
        var cards = punchClock.getPunchCardsOf(member);
        var resTxt = "Member: " + member + "<br>"
        for (j = 0; j < cards.length; j++) {
            var card = cards[j];
            resTxt += "In time: " + card[0] + ", out time: " + card[1] + "<br>";
        }
        document.getElementById("punchCards").innerHTML += resTxt;
    }
}

function printAddresses(accounts) {
    var allAccountTxt = "";
    for (i = 0; i < accounts.length; i++) {
        allAccountTxt += accounts[i] + "<br>";
    }
    return allAccountTxt;
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
