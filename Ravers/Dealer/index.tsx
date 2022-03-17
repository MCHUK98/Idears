import { useProximity } from './utils/proximity';
import { useRef, useState } from 'react';
import { Group } from 'three';
import DealerModel from './model/DealerModel';
import { GroupProps } from '@react-three/fiber';
import { Dialogue, VisualDialogue } from '../layers/communication';
import {
  getAccounts,
  mintEcstasy,
  ecstasyTestURL,
  ecstasyMainnetURL,
} from '../web3Utils';

type ModelProps = {
  mainnet?: boolean;
} & GroupProps;

export default function DJ(props: ModelProps) {
  const { mainnet, ...rest } = props;
  const group = useRef<Group>();
  const proximity = useProximity(group);
  const [account, setAccount] = useState(null);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [minting, setMinting] = useState(false);
  const successMessage = success ? 'view' : ':(';

  const handleConnect = async () => {
    await getAccounts(setAccount);
  };

  const handleMint = async () => {
    if (account) {
      setMinting(true);
      setMessage('minting...');
      await mintEcstasy(account, setMessage, setSuccess, mainnet);
      setMinting(false);
    }
  };

  const view = () => {
    if (!minting && success) {
      const link = document.createElement('a');
      const url = mainnet ? ecstasyMainnetURL : ecstasyTestURL;
      link.href = url;
      link.target = '_blank';
      link.click();
    }
  };

  const dialogue: Dialogue = [
    {
      key: 'init',
      text: 'ayyyy.... u good?',
      decisions: [
        {
          name: 'could be better',
          onClick: handleConnect,
          nextKey: 'mint',
        },
        { name: 'yes', nextKey: 'sure?' },
      ],
    },
    {
      key: 'sure?',
      text: 'u sure?',
      decisions: [
        {
          name: 'no',
          onClick: handleConnect,
          nextKey: 'mint',
        },
        { name: 'yes', nextKey: 'bye' },
      ],
    },
    {
      key: 'bye',
      text: 'go on then! u blowin up the spot!',
    },
    {
      key: 'mint',
      text: 'yo you want some ecstasy?',
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
      decisions: [
        { name: minting ? 'wait' : `${successMessage}`, onClick: view },
      ],
    },
    { key: 'not connected', text: 'you must be connected to mint' },
  ];

  return (
    <group name="dealer" {...rest}>
      <group rotation-y={0}>
        <group ref={group}>
          <DealerModel />
        </group>
        {!proximity.dancing && (
          <group position={[0, 0, 0]}>
            <VisualDialogue
              enabled={proximity.speaking}
              position={[-0.2, 1.1, 0.4]}
              dialogue={dialogue}
            />
          </group>
        )}
      </group>
    </group>
  );
}
