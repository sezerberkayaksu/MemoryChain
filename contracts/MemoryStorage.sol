// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.21 <8.10.0;

contract MemoryStorage {
  struct MemoryData {
    uint256 ID;
    string text;
    int256 status;
  }

  struct User {
    string walletID;
    string chainID;
    MemoryData[] memories;
  }

  mapping(string => User) users;
  string[] userIds;

  function indexOf(string[] memory arr, string memory searchFor) private pure returns (bool) {
    for (uint256 i = 0; i < arr.length; i++) {
      if (keccak256(bytes(arr[i])) == keccak256(bytes(searchFor))) {
        return true;
      }
    }
    return false;
  }

  function setUser(string memory _walletID) public{
    User memory newUser = users[_walletID];
    userIds.push(_walletID);
  }

  function hasUser(string memory _walletID) public view returns(bool){
    return indexOf(userIds, _walletID);
  }

  function changeMemoryStatus(string memory _walletID, uint256 memoryIndex, int256 _status) public {
    User storage _user = users[_walletID];
    _user.memories[memoryIndex].status = _status;
  }

  function addMemory(string memory _walletID, string memory _memory) public {
    User storage _user = users[_walletID];
    MemoryData memory newMemory = MemoryData({ID: _user.memories.length, text: _memory, status: 0});
    _user.memories.push(newMemory);
  }

  function getMemoryList(string memory _walletID) public view returns (MemoryData[] memory) {
    User memory _user = users[_walletID];
    return _user.memories;
  }
}
