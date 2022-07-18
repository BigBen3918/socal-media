require('colors');
const isProduction = false

const fs = require('fs');
const abiIrc20 = require("../artifacts/contracts/IRC20.sol/IRC20.json");
const abiDesocial = require("../artifacts/contracts/Desocial.sol/Desocial.json");

/* const hre = require("hardhat"); */

async function main() {
    const [signer] = await ethers.getSigners();

	/* const signer = await ethers.getSigner(); */
	const network = await signer.provider._networkPromise;
	const chainId = network.chainId;
	console.log('Starting deploy by '.blue + signer.address.yellow + (' ICICB (' + String(chainId).red + ')').blue);
    
    let oxToken = '';
    let usdtToken = '';

    if (!isProduction) {
        console.log('Deploying test purpose token contracts...'.blue);
        const DeployTokens = await ethers.getContractFactory("DeployTokens");
        const tokens = [
            '0x21',
            'USDT'
        ];
        const deployTokens = await DeployTokens.deploy(tokens, signer.address);
        const addrs = await deployTokens.getTokens();
        oxToken = addrs[0]
        usdtToken = addrs[1]
        console.log('\t0x\t' + oxToken.green);
        console.log('\tUSDT\t' + usdtToken.green);
    }
    const cOxToken = new ethers.Contract(oxToken, abiIrc20.abi, signer);
    const cUsdtToken = new ethers.Contract(usdtToken, abiIrc20.abi, signer);
    const oxDecimals = Number(await cOxToken.decimals())
    const usdtDecimals = Number(await cUsdtToken.decimals())

	console.log('Deploying Desocial contract...'.blue);
	const Desocial = await ethers.getContractFactory("Desocial");
	const desocial = await Desocial.deploy();
	const desocialAddress = desocial.address;
	console.log('\tDesocial\t' + desocialAddress.green);

	console.log('writing abis and addresses...'.blue);

	/* -------------- writing... -----------------*/
	fs.writeFileSync(`./src/config/abis/irc20.json`,  	 JSON.stringify(abiIrc20.abi, null, 4));
	fs.writeFileSync(`./src/config/abis/decocial.json`,	 JSON.stringify(abiDesocial.abi, null, 4));
	fs.writeFileSync(`./src/config/v1.json`,	 JSON.stringify({
        desocial : {
            address : desocialAddress,
        },
        ether : {
            address : "",
            decimals: 18
        },
        usdt : {
            address : usdtToken,
            decimals: usdtDecimals
        },
        "0x21" : {
            address : oxToken,
            decimals: oxDecimals
        },
    }, null, 4));

}

main().then(() => {
}).catch((error) => {
	console.error(error);
	process.exit(1);
});
