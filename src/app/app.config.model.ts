export interface IAppConfig {
    env: {
        name: string;
    };
    contracts: {
        claimContractAddr: string;
        loginContractAddrNode1: string;
        loginContractAddrNode2: string;
        loginContractAbi: string;
        p2pContractAddr: string;
        p2pContractAbi: string;
        vendorAddr: string;
        vendorPwd: string;
        buyerAddr: string;
        buyerPwd: string;
    };
}

