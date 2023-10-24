// // 在Hardhat任务中引入测试文件
// const { ethers } = require('ethers');
// const assert = require('assert');
//
// // 加载合约并设置测试环境
// const deployer = new ethers.ContractDeploys({
//     gasLimit: 5000000,
// });
//
// describe('ERC4907Demo', function() {
//     let Alice, Bob;
//     let instance;
//
//     // 设置账户信息
//     before(async function() {
//         [Alice, Bob] = await ethers.getSigners();
//         console.log(`Alice account: ${Alice.address}`);
//         console.log(`Bob account: ${Bob.address}`);
//         instance = await ethers.getContractAt('ERC4907Demo', deployer.address);
//         console.log(`Instance address: ${instance.address}`);
//     });
//
//     // 测试设置用户为Bob
//     it('should set user to Bob', async function() {
//         const initialBalances = [await instance.balanceOf(Alice.address), await instance.balanceOf(Bob.address)];
//         console.log(`Initial balances: Alice - ${initialBalances[0]}, Bob - ${initialBalances[1]}`);
//         await instance.mint(1, Alice);
//         console.log(`Alice's balance after mint: ${await instance.balanceOf(Alice.address)}`);
//         const expires = Math.floor(Date.now() / 1000) + 1000;
//         await instance.setUser(1, Bob, BigInt(expires));
//         console.log(`User of NFT 1 after setUser: ${await instance.userOf(1)}`);
//         console.log(`Owner of NFT 1 after setUser: ${await instance.ownerOf(1)}`);
//         assert.equal(await instance.userOf(1), Bob, 'User of NFT 1 should be Bob');
//         assert.equal(await instance.ownerOf(1), Alice, 'Owner of NFT 1 should be Alice');
//     });
// });