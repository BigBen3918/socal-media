import contracts from "./contract/contract.json"

import {ethers} from "ethers";

var RPC = "https://rpc.testnet.fantom.network/"
const provider = new ethers.providers.JsonRpcProvider(RPC);

export const ERC20ABI = contracts.Ox21.abi;
export const NFTContract = new ethers.Contract(contracts.NFT.address, contracts.NFT.abi, provider);

export const supportedTokens = {
    "Ether" : {
        address : "",
        decimals: 18
    },
    "Usdt" : {
        address : contracts.Usdt.address,
        decimals: 6
    },
    "Ox21" : {
        address : contracts.Ox21.address,
        decimals: 18
    },
}
