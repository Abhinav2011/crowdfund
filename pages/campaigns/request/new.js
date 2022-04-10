import React, { Component } from "react";
import web3 from "../../../ethereum/web3";
import { Form, Button, Message, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/Campaign";

class NewRequest extends Component {
  state = {
    description: "",
    value: "",
    givenTo: "",
    loading: false,
    errMsg: "",
  };
  static async getInitialProps({ query }) {
    const address = query.show;
    // console.log(address)
    return { address: address };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
      errMsg: "",
    });
    const { description, value, givenTo } = this.state;
    console.log(description);
    console.log(givenTo);
    const getInWei = (value) => {
      const valueInWei = web3.utils.toWei(value, "ether");
      return valueInWei;
    };
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(this.props.address);
      const val = getInWei(value);
      await campaign.methods.createRequest(description, val, givenTo).send({
        from: accounts[0],
      });
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
      <Layout>
        <h3>Add a new request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(event) => {
                this.setState({
                  description: event.target.value,
                });
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in ether</label>
            <Input
              label="ether"
              value={this.state.value}
              onChange={(event) => {
                this.setState({
                  value: event.target.value,
                });
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient Address</label>
            <Input
              value={this.state.givenTo}
              onChange={(event) => {
                this.setState({
                  givenTo: event.target.value,
                });
              }}
            />
          </Form.Field>
          <Message
            error
            header="Something went wrong"
            content={this.state.errMsg}
          />
          <Button
            loading={this.state.loading}
            color="green"
            type="submit"
            style={{ marginTop: "25px" }}
          >
            Add request
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default NewRequest;
