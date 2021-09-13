const fs = require('fs')
const path = require('path')
require('@nomiclabs/hardhat-etherscan')
require('@nomiclabs/hardhat-truffle5')
require('solidity-coverage')
require('hardhat-gas-reporter')
require('hardhat-deploy')


// REQUIRED TO ENSURE METADATA IS SAVED IN DEPLOYMENTS (because solidity-coverage disable it otherwise)
const {
  TASK_COMPILE_GET_COMPILER_INPUT
} = require("hardhat/builtin-tasks/task-names");
task(TASK_COMPILE_GET_COMPILER_INPUT).setAction(async (_, bre, runSuper) => {
  const input = await runSuper();
  input.settings.metadata.useLiteralContent = bre.network.name !== "coverage";
  return input;
})

let mnemonic = process.env.MNEMONIC;
if (!mnemonic) {
  try {
    mnemonic = fs.readFileSync(path.resolve(__dirname, '.secret')).toString().trim()
  } catch(e){}
}
const accounts = mnemonic ? {
  mnemonic,
}: undefined;

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    testnet: {
      accounts,
      url: 'https://cronos-testnet.crypto.org:8545',
      gasPrice: 80000000000,
      gasLimit: 2500000000,
    },
    coverage: {
      url: 'http://127.0.0.1:8555',
    },
  },
  solidity: {
    version: '0.7.6',
    settings: {
      optimizer: {
        enabled: true,
        runs: 20000,
      }
    }
  },
  gasReporter: {
    enabled: true,
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    coverage: './coverage',
    coverageJson: './coverage.json',
    artifacts: './artifacts',
  },
  namedAccounts: {
    deployer: 0
  }
}
