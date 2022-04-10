import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Campaign from "../ethereum/Campaign";
import web3 from "../ethereum/web3";
class RequestRow extends Component {
  onApprove = async () => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0],
    });
  };
  onFinalize = async () => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0],
    });
  };
  render() {
    const { id, request, approversCount } = this.props;
    const getInEther = (value) => {
      const valueInEther = web3.utils.fromWei(value, "ether");
      return valueInEther;
    };
    return (
      <Table.Row>
        <Table.Cell>{id + 1}</Table.Cell>
        <Table.Cell>{request.description}</Table.Cell>
        <Table.Cell>{getInEther(request.value)}</Table.Cell>
        <Table.Cell>{request.recipient}</Table.Cell>
        <Table.Cell>
          {request.approvalCount}/{request.approversCount}
        </Table.Cell>
        <Table.Cell>
          {request.complete ? (
            <div>Completed</div>
          ) : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Table.Cell>
        <Table.Cell>
          {request.complete ? (
            <div>Completed</div>
          ) : (
            <Button color="blue" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default RequestRow;
