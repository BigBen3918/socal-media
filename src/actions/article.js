import { ethers } from "ethers"
import store from "../../store";
import { delay, toBigNum, fromBigNum } from "../utils"
import { ERC20ABI, NFTContract, supportedTokens } from "../contracts"

import ipfs from "../ipfs_api"

export const validateURI = (URI) => {
    new URL(URI.image);
    if (!!URI.title == false) throw new Error("d");
}

export const post = async (URI) => {
    try {
        validateURI(URI);
        var signer = new ethers.Wallet(store.privatekey, provider);
        const SignedNFTContract = NFTContract.connect(signer);
        var tx = await SignedNFTContract.create(URI);
        await tx.wait();
        return { success: true };
    } catch (err) {
        console.log(err);
        return { success: false };
    }
}

export const getURI = async (data) => {

    try {
        const basic_ipfs_url = "https://ipfs.io/ipfs/";

        const { image, title, description } = data;

        const imageContents = FileSystem.readAsStringAsync(image)

        var result = await ipfs.files.add(image);
        var ipfsHash = basic_ipfs_url + result[0].hash;
        console.log(ipfsHash);

        var URI = {
            image: ipfsHash,
            title: title,
            description: description
        }
        return {
            success: true,
            URI: JSON.stringify(URI)
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
        }
    }
}
