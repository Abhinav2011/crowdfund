// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract CampaignFactory{
    // ==== Fields ====
    Campaign[] public deployedCampaigns;
    
    // ==== Modifier ====
    // ==== create a new contract ====
    function createCampaign(uint minimum) public {
        Campaign newCampaign = new Campaign(minimum,msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    // ==== returning all the address of the deployed contract
    function getDeployedCampaigns() public view returns (Campaign[] memory){
        return deployedCampaigns;
    }
    
}

contract Campaign{
    // collection of key value pairs
    struct Request{
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    // === Fields ===
    mapping(uint=>Request) public requests;
    uint numberOfRequests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    
    // === Methods ===
    
    // == Modifier ==
    modifier authorization(){
        require(msg.sender == manager);
        _;
    }
    
    // == constructor ==
    //Setting the manager and minimum amount to contribute
    constructor(uint minimum, address creator){
        manager = creator;
        minimumContribution = minimum;
        numberOfRequests = 0;
    }
    
    //donate money to compaign and became an approver
    function contribute() public payable{
        require(msg.value > minimumContribution);
        
        if(approvers[msg.sender]!= true){
            approvers[msg.sender] = true;
            approversCount++;
        }
    }
    
    //creating a new request by the manager
    function createRequest(string memory _description, uint _value, address payable _recipient) public authorization{
         Request storage newReq = requests[numberOfRequests];
         numberOfRequests++;
         newReq.description = _description;
         newReq.value = _value;.
         newReq.recipient = _recipient;
         newReq.complete = false;
         newReq.approvalCount = 0;
    }
        
    //approving a particular request by the user
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        require(!request.complete);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    //final approval of request by the manager and sending the amount
    function finalizeRequest(uint index) public authorization{
        Request storage request = requests[index];
        
        require(request.approvalCount > (approversCount/2));
        require(!request.complete);
        
        request.recipient.transfer(request.value);
        request.complete = true;
        
    }

    // function to retrieve Campaign balance, minimumContribution , no of requests , no of Contributors and manager address
    function getSummary() public view returns (
        uint, uint, uint, uint, address
        ) {
        return (
            minimumContribution,
            address(this).balance,
            numberOfRequests,
            approversCount,
            manager
            ); 
    }

    // returing no of requests
    function getRequestsCount() public view returns (uint) {
        return  numberOfRequests;
    }
    
}