// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract CampaignFactory {
    address payable[] public deployedCampaigns;

    function createCampaign(
        string memory name,
        string memory description,
        string memory img,
        uint minimum
    ) public {
        Campaign newCampaign = new Campaign(
            name,
            description,
            img,
            minimum,
            msg.sender
        );
        deployedCampaigns.push(payable(address(newCampaign)));
    }

    function getDeployedCampaigns()
        public
        view
        returns (address payable[] memory)
    {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    string public name;
    string public description;
    string public img;
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager, "Only manager can call this function");
        _;
    }

    constructor(
        string memory campaignName,
        string memory campaignDescription,
        string memory campaignImg,
        uint minimum,
        address creator
    ) {
        manager = creator;
        name = campaignName;
        description = campaignDescription;
        img = campaignImg;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(
            msg.value > minimumContribution,
            "Contribution is less than minimum"
        );

        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount++;
        }
    }

    function createRequest(
        string memory requestDescription,
        uint value,
        address recipient
    ) public restricted {
        Request storage newRequest = requests.push();
        newRequest.description = requestDescription;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender], "Only approvers can approve");
        require(!request.approvals[msg.sender], "Request already approved");

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(
            request.approvalCount > (approversCount / 2),
            "Not enough approvals"
        );
        require(!request.complete, "Request already finalized");

        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }

    function getDetails()
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint,
            uint,
            uint,
            uint,
            address
        )
    {
        return (
            name,
            description,
            img,
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}
