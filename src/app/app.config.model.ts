export interface IAppConfig {
    env: {
        name: string;
    };
    contracts: {
        claimContractAddr: string;
        loginContractAddrNode1: string;
        loginContractAddrNode2: string;
        loginContractAbi: string;
    };
}

