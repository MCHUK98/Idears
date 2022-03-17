import { useProximity } from './utils/proximity';
import { useRef } from 'react';
import { Group } from 'three';
import GreeterModel from './model/Greeter';
import { GroupProps } from '@react-three/fiber';
import { Dialogue, VisualDialogue } from '../layers/communication';

export default function Greeter(props: GroupProps) {
  const group = useRef<Group>();

  const proximity = useProximity(group);
  const dialogue: Dialogue = [
    {
      key: 'init',
      text: 'hey! welcome to the rave!.... go talk to the dj, or go look for the phone... you might find something prrettttyyy cool',
    },
  ];

  return (
    <group name="Greeter" {...props}>
      <group rotation-y={0}>
        <group ref={group}>
          <GreeterModel position={[-2.6, 0, -2.6]} />
        </group>
        {!proximity.walking && (
          <group position={[-0.05, -0.31, -0.4]}>
            <VisualDialogue
              enabled={proximity.speaking}
              position={[0, 1.4, 0.3]}
              dialogue={dialogue}
            />
          </group>
        )}
      </group>
    </group>
  );
}
