const { Blockchain, Transaction } = require("./blockchain");

const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "238c6075709df9ce0e9c9f588d95764c8efc5bd76a1345a878e585f5e26edeb7"
);
const myWalletAddress = myKey.getPublic("hex");

let gezimCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, "public key goes here", 10);
tx1.signTransaction(myKey);
gezimCoin.addTransaction(tx1);

console.log("\n Starting the miner...");
gezimCoin.minePendingTransactions(myWalletAddress);

console.log(
  "\nBalance of gezim is",
  gezimCoin.getBalanceOfAddress(myWalletAddress)
);

gezimCoin.chain[1].transactions[0].amount = 1;

console.log("Is chain valid?", gezimCoin.isChainValid());
