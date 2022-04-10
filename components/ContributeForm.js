import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/Campaign";
import web3 from "../ethereum/web3";
import "semantic-ui-css/semantic.min.css";
import Router from "next/router";

class ContributeForm extends Component {
  state = {
    value: "",
    loading: "",
    errMsg: "",
  };
  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
      errMsg: '',
    });
    try {
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });
      Router.push({
        pathname: '/campaigns/[show]',
        query: { show: this.props.address },
      })
    } catch (err) {
      this.setState({
        errMsg: err.message,
      });
    }
    this.setState({
      loading: false,
    });
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            value={this.state.value}
            onChange={(event) => {
              this.setState({
                value: event.target.value,
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
          Contribute
        </Button>
      </Form>
    );
  }
}
export default ContributeForm;
