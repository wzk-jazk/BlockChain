import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    ganache: {
      // rpc url, change it according to your ganache configuration
      url: 'http://127.0.0.1:8545',
      // the private key of signers, change it according to your ganache user
      accounts: [
        '0x25a90d1beeb13a0f088f129c7d5a545c51711c35d4d1ac10c2e5f9b489f04976',
          '0xacbafb82631fb0fd597cc3e1fbd922753bc3b30cc1b98f4513238bbc620a353a',
          '0xed2da2b72cc5649de9661bfa5c233c1fcbc2e8e120621b7ce78d1e9b602b4b16',
          '0xc9ff7cfa1d879013e20cc957e3ee6a198fb78f95fbc03de2f63058e9a9757b38',
          '0xe476c0f15c0b954da986c6a872af033ca850d7d0aee86c7d3623326a58949964'
      ]
    },
  },
};

export default config;
