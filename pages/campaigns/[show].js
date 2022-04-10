import React, { Component } from "react";
import HeadComponent from "../../components/Header";
import Layout from "../../components/Layout";
import "semantic-ui-css/semantic.min.css";
import Campaign from "../../ethereum/Campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import ContributeForm from "../../components/ContributeForm";
import Web3 from "web3";
import Link from "next/link";

class ShowCampaign extends Component {
  static async getInitialProps({ query }) {
    const address = query.show;
    // console.log(address)
    const currentCampaign = Campaign(address);
    const summary = await currentCampaign.methods.getSummary().call();
    // console.log(summary)
    return {
      address: address,
      minContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approverCount: summary[3],
      manager: summary[4],
    };
  }
  renderAllCards() {
    const minContribution = this.props.minContribution;
    const balance = this.props.balance;
    const requestCount = this.props.requestCount;
    const approverCount = this.props.approverCount;
    const manager = this.props.manager;
    const getInEther = (balance) => {
      const balanceInEther = Web3.utils.fromWei(balance, "ether");
      return balanceInEther;
    };
    const items = [
      {
        header: manager,
        meta: "Address of manager",
        description:
          "This is the address of the manager of who created this campaign",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minContribution,
        meta: "Minimum contribution (wei) ",
        description: "You must contribute this much amount",
        style: { overflowWrap: "break-word" },
      },
      {
        header: getInEther(balance),
        meta: "Current balance",
        description:
          "This is the address of the manager of who created this campaign",
        style: { overflowWrap: "break-word" },
      },
      {
        header: requestCount,
        meta: "Total amount of request",
        description:
          "This is the address of the manager of who created this campaign",
        style: { overflowWrap: "break-word" },
      },
      {
        header: approverCount,
        meta: "Total amount of approvers",
        description:
          "This is the address of the manager of who created this campaign",
        style: { overflowWrap: "break-word" },
      },
    ];
    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout>
        <Grid style={{ marginTop: "15px" }}>
          <Grid.Row>
            <Grid.Column width="10">{this.renderAllCards()}</Grid.Column>

            <Grid.Column width="6">
              <ContributeForm address={this.props.address}></ContributeForm>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link
                href={{
                  pathname: "/campaigns/request/",
                  query: { show: this.props.address },
                }}
              >
                <Button color="green">View Requests</Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default ShowCampaign;
