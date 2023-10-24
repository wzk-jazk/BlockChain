// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment the line to use openzeppelin/ERC721
// You can use this dependency directly because it has been installed by TA already
 import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// Uncomment this line to use console.log
 import "hardhat/console.sol";
import "./MyERC20.sol";

contract BorrowYourCar{

    // use a event if you want
    // to represent time you can choose block.timestamp
    event CarBorrowed(uint256 carTokenId, address borrower, uint256 startTime, uint256 duration);
    MyERC20 public myERC20;
    // maybe you need a struct to store car information
    struct Car {
        address owner;
        address borrower;
        uint256 borrowUntil;
    }
    uint256 public length = 5;

    mapping(uint256 => Car) public cars; // A map from car index to its information


    constructor()
    {
        myERC20 = new MyERC20("BorrowCarToken","BorrowCarTokenSymbol");
        mint(0,0xa8871B026f4D5b9B979d44aaaC03e689c82Ac78b);
        mint(1,0x13FE1E03987bf3A5D7D45E539734e2C6C153Db5A);
        mint(2,0x13FE1E03987bf3A5D7D45E539734e2C6C153Db5A);
        mint(3,0x22cA0337389f5CeBFa918e8E683f4EDFd4492Cec);
        mint(4,0x22cA0337389f5CeBFa918e8E683f4EDFd4492Cec);
    }


    function mint(uint256 tokenId, address to) public {
        cars[tokenId].owner = to;
    }

    function setUser(uint256 tokenId, address borrower, uint256 duration) public virtual{
        cars[tokenId].borrower = borrower;
        uint256 start = block.timestamp;
        cars[tokenId].borrowUntil = start+duration;
        emit CarBorrowed(tokenId,borrower,start,duration);
    }

    function userExpires(uint256 tokenId) public view virtual returns(uint256){
        return cars[tokenId].borrowUntil;
    }

    function userOf(uint256 tokenId) public view virtual returns(address){
        if( uint256(cars[tokenId].borrowUntil) >=  block.timestamp){
            return  cars[tokenId].borrower;
        }
        else{
            return address(0);
        }
    }


    function getCarInfo(uint256 carId) view public returns(address,address, uint256){
        Car storage info = cars[carId];
        return (info.owner,info.borrower,info.borrowUntil);
    }

    function helloworld() pure external returns(string memory) {
        return "hello world";
    }
    function getOwned(address userAddr) view public returns(uint256[] memory,uint256){
        uint256[] memory carList = new uint256[](length);
        uint256 idx = 0;
        for(uint256 i = 0;i < length;i++){
            if(cars[i].owner == userAddr){
                carList[idx] = i;
                idx++;
            }
        }
        return (carList,idx);
    }
    function getUnborrowed() view public returns(uint256[] memory,uint256){
        uint256[] memory unBorrowed = new uint256[](length);
        uint256 idx = 0;
        for(uint256 i = 0;i < length;i++){
            if(userOf(i) == address(0)){
                unBorrowed[idx] = i;
                idx++;
            }
        }
        return (unBorrowed,idx);
    }
    function getOwner(uint256 carId) view public returns(address){
        return cars[carId].owner;
    }
    function getBorrower(uint256 carId) view public returns(address){
        return userOf(carId);
    }
    function borrowCar(uint256 carId, address borrower, uint256 duration, uint256 price) public{
        setUser(carId,borrower,duration);
        myERC20.transferFrom(borrower,cars[carId].owner,price);
    }
}