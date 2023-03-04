// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
	enum ConnectionTypes { 
		Unacquainted,
		Friend,
		Family
	}
	
	// TODO: create a public nested mapping `connections` 
		// This mapping takes arguments of 2 addresses, and returns the conenction type
		// The first argument can have many connections (see enum)
	mapping(address => mapping(address =>ConnectionTypes)) public connections;

	function connectWith(address other, ConnectionTypes connectionType) external {
        // TODO: make the connection from msg.sender => other => connectionType
			// In the connections mapping, find the original address
			// Then set the connectionType to the 'other' address
		connections[msg.sender][other] = connectionType;

	}
}
