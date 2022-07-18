/* import React from 'react' */
import { useSelector, useDispatch}	from 'react-redux';

const useWallet = () => {
	const G = useSelector(state=>state)
	const dispatch = useDispatch()
	const update = (payload) => dispatch(Slice.actions.update(payload))
	/* const connected = G.status===CONNECTED; */

	/* React.useEffect(() => {
		if (connected) {
			getChainId().then(chainId=>{
				if (chainId===G.chainId) {
					update({status:CONNECTED})
				} else {
					update({status:DISCONNECTED, err:ERR_DISCONNECTED})
				}
			});
		}
	}, [G.chainId, connected])

	React.useEffect(() => {
		const { ethereum } = window
		if (ethereum && connected) {
			ethereum.on('accountsChanged', accountChanged)
			ethereum.on('chainChanged', chainChanged)
		}
	}) */

	

	

	/* 
    const getPending = ():{pending:PendingTypes, txs:TxTypes} => {
		let pending:PendingTypes = {}
		let txs:TxTypes = {}
		try {
			let buf = window.localStorage.getItem(AppKey)
			if (buf) pending = JSON.parse(buf)
			buf = window.localStorage.getItem(AppKey + '-txs')
			if (buf) txs = JSON.parse(buf)
			
		} catch (err) {
			console.log(err)
		}
		return {pending, txs}
	}

    const setPending = (key:string, tx:PendingType) => {
		const pending:PendingTypes = {...G.pending, [key]:tx}
		window.localStorage.setItem(AppKey, JSON.stringify(pending))
		update({pending})
	}
	const setTxs = (txs:TxTypes) => {
		window.localStorage.setItem(AppKey + '-txs', JSON.stringify(txs))
		update({txs})
	}
    const call = async (to:string, abi:any, method:string, args:Array<string|number|boolean>, rpc?:string): Promise<any> => {
		const web3 = new window.Web3(rpc || G.rpc)
		const contract = new web3.eth.Contract(abi, to)
		return await contract.methods[method](...args).call()
	}

    const send = async (to:string, abi:any, value:string, method:string, args:Array<string|number|boolean>): Promise<string|undefined> => {
		let err = '';
		try {
			const { ethereum } = window
			if (ethereum && ethereum.isConnected) {
				const web3 = new window.Web3(ethereum)
				const contract = new web3.eth.Contract(abi, to)
				const data = contract.methods[method](...args).encodeABI()
				const json = {from:G.address, to, value, data}
				const res = await ethereum.request({method: 'eth_sendTransaction', params: [json]})
				if (res) return res
                err = ERR_UNKNOWN
			} else {
                err = ERR_ASKCONNECT
			}
		} catch (error:any) {
			if (error.code===4001) {
				err = ERR_CANCELLED
			} else if (error.code===-32603) {
				const matches = error.message.match(/'(\{[^']*\})'/)
				if (matches.length===2) {
					let json:any;
					try {
						json = JSON.parse(matches[1])
						if (json.value && json.value.data) {
							const {code, message} = json.value.data
							err = '🦊 ' + message + ' (' + code + ')'
						} else {
							err = '🦊 ' + error.message	
						}
					} catch (err1) {
						err = '🦊 ' + error.message		
					}
					
				} else {
					err = '🦊 ' + error.message	
				}
			} else {
				err = '🦊 ' + error.message
			}
		}
		throw new Error(err)
	} */
	
    /* const waitTransaction = async (txId:string): Promise<boolean> => {
		const web3 = new window.Web3(G.rpc)
		let repeat = 100
		while (--repeat > 0) {
			const receipt = await web3.eth.getTransactionReceipt(txId)
			if (receipt) {
				const resolvedReceipt = await receipt
				if (resolvedReceipt && resolvedReceipt.blockNumber) {
					return true;
				}
			}
			await new Promise((resolve) => setTimeout(resolve, 3000))
		}
		return false;
	} */
	
	/* const balance = async (token:string): Promise<string|undefined> => {
		const web3 = new window.Web3(G.rpc)
		if (token==='-') {
			return await web3.eth.getBalance(G.address)
		} else {
			return await call(token, abiIrc20, 'balanceOf', [G.address])
		}
	}
	const approval = async (token:string): Promise<string|undefined> => {
		return await call(token, abiIrc20, 'allowance', [G.address, networks[G.chain].bridge])
	}

    const approve = async (token:string, value:string): Promise<string|undefined> => {
		return await send(token, abiIrc20, '0x0', 'approve', [networks[G.chain].bridge, value])
	} */
	return {...G, update, check, addNetwork, getPending, setPending, removePending, setTxs, connect, balance, bridgebalance, waitTransaction, approval, approve, /* depositToIcicb,  */deposit};
}

export default useWallet
