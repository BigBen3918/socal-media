import { ethers } from "ethers"
import store from "../../store";
import { delay, toBigNum, fromBigNum } from "../utils"
import { ERC20ABI, NFTContract, supportedTokens } from "../contracts"

export const sendEth = async (to, amount) => {

    var signer = new ethers.Wallet(store.privatekey, provider);
    try {
        var tx = await signer.sendTransaction({
            to: to,
            value: toBigNum(amount, 18)
        });
        await tx.wait();
    } catch (err) {
        console.log(err);
        return {
            success: false,
            // error: err.message
        }
    }
}

export const sendToken = async (token, to, amount) => {
    try {
        var signer = new ethers.Wallet(store.privatekey, provider);
        const ERC20Contract = new ethers.Contract(supportedTokens[token].address, ERC20ABI, signer);
        var tx = await ERC20Contract.transfer(to, toBigNum(amount, 18));
        await tx.wait();
        return { success: true };
    } catch (err) {
        console.log(err);
        return { success: false };
    }
}

export const checkBalances = async (tokens) => {
    var balances = {};
    try {
        for (token of tokens) {
            if (token == "Ether") {
                balances[token] = fromBigNum(await provider.getBalance(store.address), 18);
            }
            else {
                const ERC20Contract = new ethers.Contract(supportedTokens[token].address, ERC20ABI, provider);
                balances[token] = fromBigNum(await ERC20Contract.balaceOf(store.address), supportedTokens[token].decimals);
            }
        }
    } catch (err) {
        console.log(err);
        return balances;
    }
}


