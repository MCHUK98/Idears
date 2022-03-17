import Web3 from 'web3';
import {
  RAVERS_TEST_ADDRESS,
  RAVERS_MAINNET_ADDRESS,
  RAVERS_ABI,
  ECSTASY_TEST_ADDRESS,
  ECSTASY_MAINNET_ADDRESS,
  ECSTASY_ABI,
} from './contracts';

export const raversTestURL = `https://testnets.opensea.io/assets/${RAVERS_TEST_ADDRESS}`;

export const ecstasyTestURL = `https://testnets.opensea.io/assets/${ECSTASY_TEST_ADDRESS}/0`;

export const raversMainnetURL = `https://opensea.io/assets/${ECSTASY_MAINNET_ADDRESS}`;

export const ecstasyMainnetURL = `https://opensea.io/assets/${ECSTASY_MAINNET_ADDRESS}/0`;

export const getAccounts = async (cb) => {
  // eslint-disable-next-line no-undef
  const { ethereum } = window;
  await ethereum.request({ method: 'eth_requestAccounts' });
  const accounts = await ethereum.request({ method: 'eth_accounts' });
  cb(accounts[0]);
  return;
};

export const mintRaver = async (acct, cb1, cb2, mainnet) => {
  const address = mainnet ? RAVERS_MAINNET_ADDRESS : RAVERS_TEST_ADDRESS;
  const web3 = new Web3(Web3.givenProvider);
  const contract = new web3.eth.Contract(RAVERS_ABI, address);
  const price = await contract.methods.mintRate().call();
  try {
    await contract.methods
      .safeMint(acct)
      .send({ from: acct, value: price })
      .on('receipt', (receipt) => {
        const tokenId = receipt.events.Transfer.returnValues.tokenId;
        cb2(tokenId);
        cb1('success!');
      });
  } catch (error) {
    cb1('an error occured, try again later');
  }
};

export const mintEcstasy = async (acct, cb, cb2, mainnet) => {
  const address = mainnet ? ECSTASY_MAINNET_ADDRESS : ECSTASY_TEST_ADDRESS;
  const web3 = new Web3(Web3.givenProvider);
  const contract = new web3.eth.Contract(ECSTASY_ABI, address);
  const _balance = await contract.methods.balanceOf(acct, 0).call();
  const balance = web3.utils.fromWei(_balance, 'ether');
  if (balance > 0) {
    cb('you can only mint once');
    cb2(false);
    return;
  }
  try {
    await contract.methods
      .mint(acct, 0, 10, '0x')
      .send({ from: acct, value: 0 })
      .on('receipt', () => {
        cb('all done, tell ur friends im here by the phone');
        cb2(true);
      });
  } catch (error) {
    cb('an error ocurred, try again later');
    cb2(false);
  }
};
