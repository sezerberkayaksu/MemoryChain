// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.21 <8.10.0;

contract SimpleStorage {
  string[] storedData;

  function addMemory(string memory x) public {
    storedData.push(x);
  }

  function getMemory() public view returns (string[] memory) {
    return storedData;
  }
}
