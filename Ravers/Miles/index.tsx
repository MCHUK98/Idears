import { useProximity } from './utils/proximity';
import { useRef } from 'react';
import { Group } from 'three';
import MilesModel from './model/Miles';
import { GroupProps } from '@react-three/fiber';

export default function Miles(props: GroupProps) {
  const group = useRef<Group>();

  return (
    <group name="miles" {...props}>
      <group rotation-y={0}>
        <group ref={group}>
          <MilesModel />
        </group>
      </group>
    </group>
  );
}
