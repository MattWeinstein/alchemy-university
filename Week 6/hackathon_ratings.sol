// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Hackathon {
    struct Project {
        string title;
        uint[] ratings;
        uint average;
    }
    
    Project[] projects;

    // TODO: add the findWinner function

    function newProject(string calldata _title) external {
        // creates a new project with a title and an empty ratings array
        projects.push(Project(_title, new uint[](0),0));
    }

    function rate(uint _idx, uint _rating) external {
        // rates a project by its index
        uint result = 0;
        projects[_idx].ratings.push(_rating);
        for( uint i = 0; i< projects[_idx].ratings.length ; i++){
            result += projects[_idx].ratings[i];
        }

        projects[_idx].average = result/projects[_idx].ratings.length;
    }

    function findWinner() external view returns(Project memory){
        uint highestAverage = 0;
        Project memory currentWinner;
        for( uint i = 0; i< projects.length ; i++){
            if(projects[i].average> highestAverage){
                highestAverage = projects[i].average;
                currentWinner = projects[i];
            }
        }
        return currentWinner;
    }
}
