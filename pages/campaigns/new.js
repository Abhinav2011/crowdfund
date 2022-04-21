import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import CampaignFactory from "../../ethereum/CampaignFactory";
import web3 from "../../ethereum/web3";
import Router from "next/router";

class CreateNewCampagin extends Component {
  state = {
    minContribution: "",
    errMsg: "",
    loading: false,
  };
  
  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errMsg: "" });
    try {
      const accounts = await web3.eth.getAccounts()
      await CampaignFactory.methods
        .createCampaign(this.state.minContribution)
        .send({
          from: accounts[0],
        })
        
        Router.push("/")
      
    } catch (err) {
      this.setState({
        errMsg: err.message,
      })
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        <h1>Create a new campaign!</h1>
        <Form
          onSubmit={this.onSubmit}
          style={{ marginTop: "25px" }}
          error={!!this.state.errMsg}
          id="newCampaignForm"
        >
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              id="minValue"
              style={{ paddingTop: "5px" }}
              value={this.state.minContribution}
              onChange={(event) => {
                this.setState({
                  minContribution: event.target.value,
                });
              }}
            />
          </Form.Field>
          <Message
            error
            header="Something went wrong"
            content={this.state.errMsg}
          />
          <Button loading={this.state.loading} color="green" type="submit">
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CreateNewCampagin;
