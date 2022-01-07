import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import contract from "@truffle/contract";

export default function Home() {
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
    });

    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [reload, setReload] = useState(false);

    const reloadEffect = () => setReload(!reload);
    const canConnect = account && web3Api.contract;

    const accountListener = (provider) => {
        provider.on("accountsChanged", () => window.location.reload());
        provider.on("chainChanged", () => window.location.reload());
    };

    const loadContract = async (name, provider) => {
        const res = await fetch(`/contracts/${name}.json`);
        const Artifact = await res.json();
        const _contract = contract(Artifact);
        _contract.setProvider(provider);

        let deployedContract;
        try {
            deployedContract = await _contract.deployed();
        } catch (e) {
            console.error(e);
        }
        return deployedContract;
    };

    useEffect(() => {
        const loadProvider = async () => {
            const provider = await detectEthereumProvider();
            if (provider) {
                const contract = await loadContract("Faucet", provider);
                accountListener(provider);
                setWeb3Api({
                    web3: new Web3(provider),
                    provider,
                    contract,
                });
            } else {
                console.error("please install metamask");
            }
        };
        loadProvider();
    }, []);

    useEffect(() => {
        const getBalance = async () => {
            const { contract, web3 } = web3Api;
            const balance = await web3.eth.getBalance(contract.address);
            setBalance(web3.utils.fromWei(balance, "ether"));
        };
        web3Api.contract && getBalance();
    }, [web3Api, reload]);

    useEffect(() => {
        const getAccount = async () => {
            const accounts = await web3Api.web3.eth.getAccounts();
            setAccount(accounts[0]);
        };
        web3Api.web3 && getAccount();
    }, [web3Api.web3]);

    const ethAmount1 = useCallback(async () => {
        const { contract, web3 } = web3Api;
        await contract.addFunds({
            from: account,
            value: web3.utils.toWei("0.5", "ether"),
        });
        reloadEffect();
    }, [web3Api, account]);
    const ethAmount2 = useCallback(async () => {
        const { contract, web3 } = web3Api;
        await contract.addFunds({
            from: account,
            value: web3.utils.toWei("1", "ether"),
        });
        reloadEffect();
    }, [web3Api, account]);
    const ethAmount3 = useCallback(async () => {
        const { contract, web3 } = web3Api;
        await contract.addFunds({
            from: account,
            value: web3.utils.toWei("3", "ether"),
        });
        reloadEffect();
    }, [web3Api, account]);
    const ethAmount4 = useCallback(async () => {
        const { contract, web3 } = web3Api;
        await contract.addFunds({
            from: account,
            value: web3.utils.toWei("5", "ether"),
        });
        reloadEffect();
    }, [web3Api, account]);
    const withdraw = useCallback(async () => {
        const { contract } = web3Api;
        await contract.withdraw({
            from: account,
        });
        reloadEffect();
    }, [web3Api, account]);
    return (
        <div className="flex justify-center p-64 align-middle">
            <div className="faucet">
                <div className="topElements pb-3">
                    <span>
                        <strong className="mr-3 text-3xl font-extrabold">
                            Account:
                        </strong>
                    </span>
                    {account ? (
                        <div className="text-white pt-3">{`Account ${account} is connected!`}</div>
                    ) : (
                        <button
                            className="h-10 px-6 font-semibold rounded bg-orange-400 text-white hover:bg-orange-600 hover:text-bold"
                            onClick={() =>
                                web3Api.provider.request({
                                    method: "eth_requestAccounts",
                                })
                            }
                            disabled={!web3Api.provider}
                        >
                            Connect Wallet
                        </button>
                    )}
                </div>
                <div className="text-4xl pb-3">
                    Current Balance: <strong>{balance}</strong> ETH
                </div>
                {!canConnect && (
                    <i className="text-red-700 text-xl">
                        <strong>*WARNING*</strong> connect to Ropsten Testnet
                    </i>
                )}
                <div className="pb-3 space-x-2">
                    <button
                        className="h-10 px-6 font-semibold rounded-md bg-black text-white hover:bg-transparent hover:text-green-200 hover:text-bold hover:border-2 hover:border-black hover:shadow-black hover:shadow-lg disabled"
                        onClick={ethAmount1}
                        disabled={!canConnect}
                    >
                        0.5 ETH
                    </button>
                    <button
                        className="h-10 px-6 font-semibold rounded-md bg-black text-white hover:bg-transparent hover:text-green-200 hover:text-bold hover:border-2 hover:border-black hover:shadow-black hover:shadow-lg"
                        onClick={ethAmount2}
                        disabled={!canConnect}
                    >
                        1 ETH
                    </button>
                    <button
                        className="h-10 px-6 font-semibold rounded-md bg-black text-white hover:bg-transparent hover:text-green-200 hover:text-bold hover:border-2 hover:border-black hover:shadow-black hover:shadow-lg"
                        onClick={ethAmount3}
                        disabled={!canConnect}
                    >
                        3 ETH
                    </button>
                    <button
                        className="h-10 px-6 font-semibold rounded-md bg-black text-white hover:bg-transparent hover:text-green-200 hover:text-bold hover:border-2 hover:border-black hover:shadow-black hover:shadow-lg"
                        onClick={ethAmount4}
                        disabled={!canConnect}
                    >
                        5 ETH
                    </button>
                </div>
                <button
                    className="h-10 px-6 font-semibold rounded-md bg-black text-white hover:bg-transparent hover:text-purple-200 hover:text-bold hover:border-2 hover:border-black hover:shadow-black hover:shadow-lg"
                    onClick={withdraw}
                    disabled={!canConnect}
                >
                    Withdraw
                </button>
            </div>
        </div>
    );
}
