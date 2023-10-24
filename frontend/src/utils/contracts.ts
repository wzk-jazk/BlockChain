import Addresses from './contract-address.json'
import BorrowYourCar from './abis/BorrowYourCar.json'
import MyERC20 from './abis/MyERC20.json'

const  Web3  = require('web3');

// @ts-ignore
// ����web3ʵ��
// �����Ķ���ȡ������Ϣhttps://docs.metamask.io/guide/provider-migration.html#replacing-window-web3
let web3 = new Web3(window.web3.currentProvider)

// �޸ĵ�ַΪ����ĺ�Լ��ַ
const BorrowYourCarAddress = Addresses.BorrowYourCar
const BorrowYourCarABI = BorrowYourCar.abi
const myERC20Address = Addresses.myERC20
const myERC20ABI = MyERC20.abi

// ��ȡ��Լʵ��
const borrowYourCarContract = new web3.eth.Contract(BorrowYourCarABI, BorrowYourCarAddress);
const myERC20Contract = new web3.eth.Contract(myERC20ABI, myERC20Address);
console.log(BorrowYourCarABI)
// ����web3ʵ������������ĺ�Լ
export {web3, borrowYourCarContract, myERC20Contract}