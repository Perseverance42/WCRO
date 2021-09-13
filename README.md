# WCRO

Wrapped CRO is a direct fork of [WETH10] (https://github.com/WETH10/WETH10) and was specificially adjusted to be used as a ERC20-Wrapper for Crypto.com Coin, the native token of the Cronos blockchain.


## Total Supply
The supply of WCRO is capped at `type(uint112).max`.

## Wrapping CRO
Any operation that ends with this contract holding Wrapped CRO is prohibited.

`deposit` CRO in this contract to receive Wrapped CRO (WCRO), which implements the ERC20 standard. WCRO is interchangeable with CRO in a 1:1 basis.

`withdraw` CRO from this contract by unwrapping WCRO from your wallet.

The `depositTo` and `withdrawTo` convenience functions allow to place the resulting WCRO or CRO in an address other than the caller.

The `withdrawFrom` function allows to unwrap CRO from an owner wallet to a recipient wallet, as long as the owner called `approve`

## Approvals
When an approval is set to `type(uint256).max` it will not decrease through `transferFrom` or `withdrawFrom` calls.

WCRO implements [EIP2612](https://eips.ethereum.org/EIPS/eip-2612) to set approvals through off-chain signatures

## Call Chaining
The `depositAndCall` and `transferAndCall` functions allow to deposit Ether or transfer WCRO, executing a call in a user-defined contract immediately afterwards, but within the same transaction.

This function will call `onTokenTransfer` on the recipient address, receiving and passing along a `bytes` parameter which can be used by the calling contract to process the callback. See [EIP667](https://github.com/ethereum/EIPs/issues/677).

## Flash Loans
This contract implements [EIP3156](https://eips.ethereum.org/EIPS/eip-3156) that allows to `flashLoan` an arbitrary amount of Wrapped CRO, unbacked by real CRO, with the condition that it is burned before the end of the transaction. No fees are charged.

This function will call `onFlashLoan` on the calling address, receiving and passing along a `bytes` parameter which can be used by the calling contract to process the callback.

## Function unrolling
For a minimal gas cost, all functions in WCRO are `external`, and a great deal of code repetition exists. To help in understanding the code, blocks that are used recurrently are preceded by a commented-out function call such as `// _transferFrom(msg.sender, to, value)` that describes the functionality of the block, and followed by a blank line.
