import web3 from "./web3";
const compiledFactory = require("./build/CampaignFactory.json");
// console.log(JSON.stringify(compiledFactory.abi));
const instance = new web3.eth.Contract(JSON.parse(JSON.stringify(compiledFactory.abi)),'0x62BEBf5F6B521Ec2C1e76E79fADC87Bf4BE72FB5')
export default instance;
