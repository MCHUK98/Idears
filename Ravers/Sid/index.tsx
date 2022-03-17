import { useProximity } from './utils/proximity';
import { useRef } from 'react';
import { Group } from 'three';
import SidModel from './model/Sid';
import { GroupProps } from '@react-three/fiber';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Sid(props: GroupProps) {
  const group = useRef<Group>();

  return (
    <group name="sid" {...props}>
      <group rotation-y={0}>
        <group ref={group}>
          <SidModel />
        </group>
      </group>
    </group>
  );
}
