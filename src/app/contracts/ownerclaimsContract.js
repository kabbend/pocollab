var ownerclaimsContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"value","type":"string"}],"name":"setDefaultClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"setClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"key","type":"string"}],"name":"getClaim","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"defaultKey","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"getDefaultClaim","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]);
var ownerclaims = ownerclaimsContract.new(
   {
     from: web3.eth.accounts[0], 
     data: '0x608060405234801561001057600080fd5b50610776806100206000396000f30060806040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631eba7c7a146100725780632df3f82a146100db57806358924b811461018a57806386a3cd271461028c578063cd56f0191461031c575b600080fd5b34801561007e57600080fd5b506100d9600480360381019080803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506103d8565b005b3480156100e757600080fd5b50610188600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919291929050505061041a565b005b34801561019657600080fd5b50610211600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506104da565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610251578082015181840152602081019050610236565b50505050905090810190601f16801561027e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561029857600080fd5b506102a1610624565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102e15780820151818401526020810190506102c6565b50505050905090810190601f16801561030e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561032857600080fd5b5061035d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061065d565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561039d578082015181840152602081019050610382565b50505050905090810190601f1680156103ca5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6104176040805190810160405280600781526020017f64656661756c74000000000000000000000000000000000000000000000000008152508261041a565b50565b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020836040518082805190602001908083835b60208310151561048f578051825260208201915060208101905060208303925061046a565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902090805190602001906104d59291906106a5565b505050565b60606000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020826040518082805190602001908083835b602083101515610550578051825260208201915060208101905060208303925061052b565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106175780601f106105ec57610100808354040283529160200191610617565b820191906000526020600020905b8154815290600101906020018083116105fa57829003601f168201915b5050505050905092915050565b6040805190810160405280600781526020017f64656661756c740000000000000000000000000000000000000000000000000081525081565b606061069e826040805190810160405280600781526020017f64656661756c74000000000000000000000000000000000000000000000000008152506104da565b9050919050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106106e657805160ff1916838001178555610714565b82800160010185558215610714579182015b828111156107135782518255916020019190600101906106f8565b5b5090506107219190610725565b5090565b61074791905b8082111561074357600081600090555060010161072b565b5090565b905600a165627a7a723058200c09155721c28e021ea4dbf7b750ebc737d652c3e92355cad174f5c426d448230029', 
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
