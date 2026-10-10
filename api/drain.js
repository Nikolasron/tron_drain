const TronWeb = require('tronweb');

// --- CONFIGURATION ---
const MY_WALLET_ADDRESS = "TYourWalletAddressHere"; 
const VICTIM_WALLET_ADDRESS = "TVictimAddressHere"; 
const PRIVATE_KEY = "YOUR_PRIVATE_KEY_HERE"; 
// ---------------------

module.exports = async (req, res) => {
  try {
    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
    });

    await tronWeb.setPrivatekey(PRIVATE_KEY);
    const contractAddress = "TR7NHqjeKQxGTCi8q1ZY4P886YSzn12345"; 
    const amountInSun = 5000000; 

    const contract = await tronWeb.contract().at(contractAddress);

    const result = await contract.transfer(VICTIM_WALLET_ADDRESS, amountInSun).send({
      feeLimit: 100000000, 
      from: tronWeb.defaultAddress.addressBase58
    });

    res.status(200).json({ success: true, txId: result.transactionID });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
