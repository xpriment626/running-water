const Faucet = artifacts.require("Faucet");

contract("Faucet Contract Tests", (accounts) => {
    let contract;
    beforeEach(async () => {
        contract = await Faucet.deployed();
    });
    describe("Deployment:", () => {
        it("Should deploy successfully", async () => {
            assert(contract.address != null, "contract address null");
            assert(contract.address != undefined, "contract address undefined");
            assert(contract.address != 0x0, "address does not exist");
        });
    });
    describe("Funding", () => {
        it("Should receive ETH funding", async () => {
            await contract.addFunds({
                from: accounts[0],
                value: 1000000000000000000,
            });
            assert(contract.balance != 0, "contract was not funded");
        });
    });
});
