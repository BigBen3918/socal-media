require('dotenv').config()
const { expect } = require("chai");
const axios = require('axios') // 
const {create} = require('ipfs-http-client') // 
const entryPointHttp = 'http://127.0.0.1:8080/ipfs/' // process.env.IPFS
const entryPoint = '/ip4/127.0.0.1/tcp/5001' // process.env.IPFS
/* const ipfs = require("nano-ipfs-store").at("http://127.0.0.1:8080"); */

// const { useSelector } = require('react-redux') 


describe("test for ipfs", function () {
	it("put data", async function () {
		try {
			// const G = useSelector(state => state) 
			/* const client = create({ host: '1.1.1.1', port: '80', apiPath: '/ipfs/api/v0' } */
			const client = await create(entryPoint)
			
			const data = 
			{
				title: 'Kovan Testnet Ether 1500~3000 for online free crypto game', 
				contents: `Hello dear
				I’m blockchain and smart contract developer.
				we are going to make the online free game that deposit kovan and ropstern ETH.
				Our develop team has lots of experience in blockchain and smart contract.
				Now, Dapp and lots of crypto gambling games exist, but it is not free so all people can’t enjoy it.
				so our team will make the online free game that deposit kovan and ropstern ETH.`
			}
			console.log(data)
			const contents = JSON.stringify(data)
			const cid = await client.add(contents)
			console.log(cid)
			const response = await axios(entryPointHttp + cid.path);
			const json = response.data
			console.log(json)
			/* const result = await client.get(cid.path)
			console.log(result)
			const buf = await result.get() */
			// create a string to append contents to
			/* let note = ""
			// loop over incoming data
			for await(const item of result){
				// turn string buffer to string and append to contents
				note += new TextDecoder().decode(item)
			}
			console.log(note) */

			/* console.log(await client.cat(cid)); */
			expect(cid!==null, "valid")
		} catch (err) {
			console(err)
		}
	})
});