import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import Link from "next/link";
import "semantic-ui-css/semantic.min.css";
import Campaign from "../../../ethereum/Campaign"
import RequestRow from "../../../components/RequestRow";
class ShowRequest extends Component {
  static async getInitialProps({ query }) {
    const address = query.show;
    const campaign = Campaign(address)
    let requestCount = await campaign.methods.getRequestsCount().call()
    requestCount = parseInt(requestCount)
    console.log(requestCount)
    const requests = await Promise.all(
        Array(requestCount).fill().map((element,index) => {
            return campaign.methods.requests(index).call()
        })
    )
    console.log(requests)
    const approversCount = await campaign.methods.approversCount().call()

    return { address, requests, requestCount, approversCount };
  }
  renderRow(){
    return this.props.requests.map((request,index) => {
      return (
        <RequestRow>
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        </RequestRow>
      )
    })
  }
  render() {
    
    return (
      <Layout>
        <h3>Requests for this campaign</h3>
        <Link
          href={{
            pathname: "request/new",
            query: { show: this.props.address },
          }}
        >
          <Button color="green">Create Request</Button>
        </Link>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>ID</Table.HeaderCell>
              <Table.HeaderCell singleLine>Description</Table.HeaderCell>
              <Table.HeaderCell singleLine>Amount</Table.HeaderCell>
              <Table.HeaderCell singleLine>Recipient</Table.HeaderCell>
              <Table.HeaderCell singleLine>Approval</Table.HeaderCell>
              <Table.HeaderCell singleLine>Approve</Table.HeaderCell>
              <Table.HeaderCell singleLine>Finalize</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderRow()}
          </Table.Body>
        </Table>
        <div>Found {this.props.requestCount} request!!</div>
      </Layout>
    )
  }
}

export default ShowRequest;
