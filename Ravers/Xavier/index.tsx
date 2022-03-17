import { useProximity } from './utils/proximity';
import { useRef } from 'react';
import { Group } from 'three';
import XavierModel from './model/Xavier';
import { GroupProps } from '@react-three/fiber';

export default function Xavier(props: GroupProps) {
  const group = useRef<Group>();

  return (
    <group name="xavier" {...props}>
      <group rotation-y={0}>
        <group ref={group}>
          <XavierModel />
        </group>
      </group>
    </group>
  );
}
