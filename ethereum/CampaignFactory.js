import web3 from "./web3";
const compiledFactory = require("./build/CampaignFactory.json");
// console.log(JSON.stringify(compiledFactory.abi));
const instance = new web3.eth.Contract(JSON.parse(JSON.stringify(compiledFactory.abi)),'0x4A8dE9A1E747431A3D98235e7e54dD7e064eb3CE')
export default instance;
