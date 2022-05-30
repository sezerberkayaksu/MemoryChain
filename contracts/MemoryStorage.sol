// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.21 <8.10.0;

contract MemoryStorage {
  struct MemoryData {
    string text;
    string friendID;
  }

  struct User {
    string walletID;
    string[] friends;
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

  function addMemory(string memory _walletID, string memory _friendID, string memory _memory) public {
    User storage _user = users[_walletID];
    bool hasFriend  = indexOf(_user.friends, _friendID);
    if(!hasFriend){
      _user.friends.push(_friendID);
    }
    MemoryData memory newMemory = MemoryData({text: _memory, friendID: _friendID});
    _user.memories.push(newMemory);
  }

  function getMemoryList(string memory _walletID) public view returns (MemoryData[] memory) {
    User memory _user = users[_walletID];
    return _user.memories;
  }
}
