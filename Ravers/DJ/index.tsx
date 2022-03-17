import { useProximity } from './utils/proximity';
import { useRef, useState } from 'react';
import { Group } from 'three';
import DJModel from './model/DJ';
import { GroupProps } from '@react-three/fiber';
import { Dialogue, VisualDialogue } from '../layers/communication';
import {
  getAccounts,
  mintRaver,
  raversTestURL,
  raversMainnetURL,
} from '../web3Utils';

type ModelProps = {
  mainnet?: boolean;
} & GroupProps;

export default function DJ(props: ModelProps) {
  const { mainnet, ...rest } = props;
  const group = useRef<Group>();
  const [account, setAccount] = useState(null);
  const [message, setMessage] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [minting, setMinting] = useState(false);
  const proximity = useProximity(group);

  const handleConnect = async () => {
    await getAccounts(setAccount);
  };

  const handleMint = async () => {
    if (account) {
      setMinting(true);
      setMessage('minting...');
      await mintRaver(account, setMessage, setTokenId, mainnet);
      setMinting(false);
    }
  };

  const viewNFT = () => {
    if (!minting) {
      const link = document.createElement('a');
      const url = mainnet ? raversMainnetURL : raversTestURL;
      link.href = `${url}/${tokenId}`;
      link.target = '_blank';
      link.click();
    }
  };

  const dialogue: Dialogue = [
    {
      key: 'init',
      text: 'hey, wanna mint a raver?',
      decisions: [
        {
          name: 'yes',
          onClick: handleConnect,
          nextKey: 'mint',
        },
        { name: 'no', nextKey: 'bye' },
      ],
    },
    {
      key: 'bye',
      text: 'enjoy the party',
    },
    {
      key: 'mint',
      text: 'click here to mint your raver',
      decisions: [
        {
          name: 'mint',
          onClick: handleMint,
          nextKey: account ? 'result' : 'not connected',
        },
      ],
    },
    {
      key: 'result',
      text: `${message}`,
      decisions: [{ name: minting ? 'wait' : 'view nft', onClick: viewNFT }],
    },
    { key: 'not connected', text: 'you must be connected to mint' },
  ];

  return (
    <group name="DJ" {...rest}>
      <group rotation-y={0}>
        <group ref={group}>
          <DJModel position={[0, 0, -0.3]} />
        </group>
        {!proximity.dancing && (
          <group position={[-0.05, -0.31, -0.4]}>
            <VisualDialogue
              enabled={proximity.speaking}
              position={[-0.2, 1.4, 0]}
              dialogue={dialogue}
            />
          </group>
        )}
      </group>
    </group>
  );
}
