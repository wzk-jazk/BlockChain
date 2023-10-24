// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20 is ERC20 {
    mapping(address => bool) claimedAirdropPlayerList;
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
    }
    function airdrop() external {
        require(claimedAirdropPlayerList[msg.sender] == false, "This user has claimed airdrop already");
        uint256 amountInWei = 10000 * (10 ** decimals()); // 将数量转换为最小单位
        _mint(msg.sender, amountInWei);
        claimedAirdropPlayerList[msg.sender] = true;
    }

}
