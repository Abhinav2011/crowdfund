import React from "react";
import { Button, Menu } from "semantic-ui-react";
import Link from "next/link";
const HeadComponent = () => {
  return (
    <Menu style={{ marginTop: "15px" }}>
      <Menu.Menu position="left">
        <Menu.Item>BlockChain CrowdFunding Platform</Menu.Item>
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item>
          <Link href="/">
            <Button id="viewAllCampaigns" content="View all campaign" icon="eye" />
          </Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default HeadComponent;
