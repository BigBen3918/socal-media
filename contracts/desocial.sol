// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Desocial {
    struct Article {
        address owner;
        string title;
        bytes32 hash;
        uint followers;
        uint created;
    }

    Article[] articles;
    mapping(bytes32=>uint) articleIds;

    constructor() {

    }

    function addBlog(string memory title, bytes32 extra) public {
        address _account = msg.sender;
        require(_account!=address(0), "ZERO ADDRESS");

        articles.push(Article({
            owner: _account,
            title: title,
            hash: extra,
            followers: 0,
            created: block.timestamp
        }));
    }
}