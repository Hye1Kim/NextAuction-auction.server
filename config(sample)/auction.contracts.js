const fs = require('fs');
const BASE_ADDRESS_URL = __dirname+'/../res/auction/address/'
const BASE_ABI_URL = __dirname+'/../res/auction/abi/'


module.exports = {
    DEPLOYED_ADDRESS_CONTENT: fs.readFileSync(`${BASE_ADDRESS_URL}deployedAddressContentManagement`, 'utf8').replace(/\n|\r/g, ""),
    DEPLOYED_ABI_CONTENT: JSON.parse(fs.existsSync(`${BASE_ABI_URL}deployedABIContentManagement`) && fs.readFileSync(`${BASE_ABI_URL}deployedABIContentManagement`, 'utf8')),
    DEPLOYED_ADDRESS_NFT: fs.readFileSync(`${BASE_ADDRESS_URL}deployedAddressNFTManagement`, 'utf8').replace(/\n|\r/g, ""),
    DEPLOYED_ABI_NFT: JSON.parse(fs.existsSync(`${BASE_ABI_URL}deployedABINFTManagement`) && fs.readFileSync(`${BASE_ABI_URL}deployedABINFTManagement`, 'utf8')) ,
    DEPLOYED_ADDRESS_AUCTION:fs.readFileSync(`${BASE_ADDRESS_URL}deployedAddressAuctionManagement`, 'utf8').replace(/\n|\r/g, ""),
    DEPLOYED_ABI_AUCTION: JSON.parse(fs.existsSync(`${BASE_ABI_URL}deployedABIAuctionManagement`) && fs.readFileSync(`${BASE_ABI_URL}deployedABIAuctionManagement`, 'utf8'))
}