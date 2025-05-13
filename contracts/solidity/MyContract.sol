// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title MyContract – an ERC-20 port for Polkadot Frontier/PVM
/// @dev constructor mints `initialSupply` to deployer; extend with Polkadot hooks as needed
contract MyContract is ERC20 {
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply
    ) ERC20(name_, symbol_) {
        _mint(msg.sender, initialSupply);
    }

    // ──────────────────────────────────────────────────────────────────────
    // TODO: add any Polkadot-specific hooks here, e.g.:
    //   function checkMultiAssetBalance(address user) external view returns (uint256) { … }
    // ──────────────────────────────────────────────────────────────────────
}
