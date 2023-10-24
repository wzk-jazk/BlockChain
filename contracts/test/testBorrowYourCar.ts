import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import * as assert from "assert";

describe("Test", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const BorrowYourCar = await ethers.getContractFactory("BorrowYourCar");
    const borrowYourCar = await BorrowYourCar.deploy();
    const myERC20 = await borrowYourCar.myERC20();

    return { borrowYourCar, owner, otherAccount,myERC20 };
  }

  describe("Deployment", function () {
    // it("Should return hello world", async function () {
    //   const { borrowYourCar } = await loadFixture(deployFixture);
    //   expect(await borrowYourCar.helloworld()).to.equal("hello world");
    // });
    // // it("car info",async function(){
    // //   const { borrowYourCar } = await loadFixture(deployFixture);
    // //   const info = await borrowYourCar.getCarInfo(0);
    // //   expect(info[0]).to.equal("0x57a25cD49FA9864d33F4F54b716282F47CDCe7AF");
    // // });
    //
    // // it("car info2",async function(){
    // //   const { borrowYourCar } = await loadFixture(deployFixture);
    // //   const info = await borrowYourCar.getCarInfo(1);
    // //   console.log(info[2])
    // // });
    // it("4907Test",async function(){
    //   const { borrowYourCar,owner,otherAccount } = await loadFixture(deployFixture);
    //   console.log(`alice:${owner.address}`);
    //   console.log(`bob:${otherAccount.address}`);
    //   const initialBalances = [await borrowYourCar.balanceOf(owner.address), await borrowYourCar.balanceOf(otherAccount.address)];
    //     console.log(`Initial balances: Alice - ${initialBalances[0]}, Bob - ${initialBalances[1]}`);
    //     await borrowYourCar.mint(0, owner.address);
    //     console.log(`Alice's balance after mint: ${await borrowYourCar.balanceOf(owner.address)}`);
    //     const expires = 1000;
    //     console.log(`expire:${expires}`);
    //     await borrowYourCar.setUser(0, otherAccount.address, BigInt(expires));
    //     console.log(`User of NFT 1 after setUser: ${await borrowYourCar.userOf(0)}`);
    //     console.log(`Owner of NFT 1 after setUser: ${await borrowYourCar.ownerOf(0)}`);
    //     console.log(`user of NFT1 expires:${await borrowYourCar.userExpires(0)}`);
    //   //   assert.equal(await instance.userOf(1), Bob, 'User of NFT 1 should be Bob');
    //   //   assert.equal(await instance.ownerOf(1), Alice, 'Owner of NFT 1 should be Alice');
    // });
    // it("owned list",async function(){
    //   const { borrowYourCar,owner,otherAccount } = await loadFixture(deployFixture);
    //   await borrowYourCar.init();
    //   const owned = await borrowYourCar.getOwned(owner.address);
    //   console.log(`a owned:${owned[1]}`);
    // });
    //
    // it("unBorrowed list",async function(){
    //   const { borrowYourCar,owner,otherAccount } = await loadFixture(deployFixture);
    //   await borrowYourCar.init();
    //   await borrowYourCar.setUser(0,owner.address,1000);
    //   const unBorrow = await borrowYourCar.getUnborrowed();
    //   console.log(`not borrowed: ${unBorrow}`);
    // });
    //
    // it("get owner",async function(){
    //   const { borrowYourCar,owner,otherAccount } = await loadFixture(deployFixture);
    //   await borrowYourCar.init();
    //   assert.equal(await borrowYourCar.getOwner(0), otherAccount.address);
    // });
    //
    // it("get borrower",async function(){
    //   const { borrowYourCar,owner,otherAccount } = await loadFixture(deployFixture);
    //   await borrowYourCar.init();
    //   assert.equal(await borrowYourCar.getBorrower(0), 0);
    //   await borrowYourCar.setUser(0,owner.address,1000);
    //   assert.equal(await borrowYourCar.getBorrower(0), owner.address);
    // });

    it("borrow test",async function(){
      const { borrowYourCar,myERC20,owner,otherAccount } = await loadFixture(deployFixture);
      //assert.equal(await borrowYourCar.getBorrower(0), 0);
      await borrowYourCar.borrowCar(0,owner.address,1000,20);
      console.log(await borrowYourCar.getBorrower(0));
      //assert.equal(await borrowYourCar.getBorrower(0),owner.address);
    });
  });

});