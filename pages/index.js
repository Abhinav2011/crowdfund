import React, { Component } from "react";
import CampaignFactory from "../ethereum/CampaignFactory";
import "semantic-ui-css/semantic.min.css";
import { Button, Card, Grid, Segment, Divider } from "semantic-ui-react";
import Layout from "../components/Layout";
import Link from "next/link";

class AllCampaignPage extends Component {
  static async getInitialProps() {
    const allCampaigns = await CampaignFactory.methods
      .getDeployedCampaigns()
      .call();
    return { allCampaigns };
  }
  renderCampaigns() {
    const items = this.props.allCampaigns.map((address) => {
      return {
        header: address,
        description: (
          <div>
            <Link
              href={{
                pathname: "/campaigns/[show]",
                query: { show: address },
              }}
            >
              <a>View Campaign</a>
            </Link>
          </div>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items}></Card.Group>;
  }
  render() {
    return (
      <Layout>
        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column>{this.renderCampaigns()}</Grid.Column>
            <Grid.Column>
              <Link href="/campaigns/new">
                <Button
                  id="newCampaign"
                  floated="right"
                  color="green"
                  content="Create a New Campaign"
                  icon="add circle"
                  labelPosition="right"
                />
              </Link>
            </Grid.Column>
          </Grid>
          <Divider vertical></Divider>
        </Segment>
      </Layout>
    );
  }
}

export default AllCampaignPage;
