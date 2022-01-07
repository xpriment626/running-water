//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./IFaucet.sol";

contract Faucet is IFaucet {

    uint256 private funderCount;
    mapping(uint256 => address) private funders;
    uint256 private defaultEth = 0.5 ether;

    receive() external payable{}

    function addFunds() external override payable {
        uint256 index = funderCount++;
        funders[index] = msg.sender;
    }

    function withdraw() external override {
        require(address(this).balance != 0, 'faucet balance empty');
        payable(msg.sender).transfer(defaultEth);
    }

    function faucetBalance() external view returns(uint256) {
        return address(this).balance;
    }

    function funderByIndex(uint256 _index) external view returns(address) {
        return funders[_index];
    }

    function getAllFunders() external view returns(address[] memory) {
        address[] memory _funders = new address[](funderCount);
        for (uint256 i = 0; i < funderCount; i++) 
        {
            _funders[i] = funders[i];
        }
        return _funders;
    }
}