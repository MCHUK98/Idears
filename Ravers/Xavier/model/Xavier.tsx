/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer, Object3D } from 'three';
import { SkeletonUtils } from '../../utils/SkeletonUtils';

type GLTFResult = GLTF & {
  nodes: {
    X_SHOES_defaultMaterial002_Baked: THREE.SkinnedMesh;
    XAVIER_Armature: Object3D;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    ['X_SHOES_defaultMaterial.002_Bake1_baked']: THREE.MeshStandardMaterial;
  };
};

type ActionName = 'Xavier Hip Hop';
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

const MODEL_URL =
  'https://ravers-models.s3.us-east-2.amazonaws.com/RAVERz_AVATARzXAVIERCOMPRESS.glb';

export default function XavierModel(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(MODEL_URL) as GLTFResult;

  Object.values(materials).forEach((material) => (material.skinning = true));
  const actions = useRef<GLTFActions>();
  const [mixer, setMixer] = useState<AnimationMixer | undefined>();

  useEffect(() => {
    const model = SkeletonUtils.clone(nodes.XAVIER_Armature) as Object3D;
    model.traverse((obj) => (obj.frustumCulled = false));
    const _mixer = new AnimationMixer(model);

    // @ts-ignore
    actions.current = animations.reduce((acc, cur) => {
      const name = cur.name as ActionName;
      // @ts-ignore
      acc[name] = _mixer.clipAction(cur, group.current);
      return acc;
    }, {});

    // @ts-ignore
    actions.current['Xavier Hip Hop'].play();

    setMixer(_mixer);
  }, []);

  useFrame((_, delta) => {
    mixer && mixer.update(delta);
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[0, 0, 0]} frustumCulled={false}>
        <group
          rotation-x={Math.PI / 2}
          scale={0.00615}
          position-y={0}
          frustumCulled={false}
        >
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.X_SHOES_defaultMaterial002_Baked.geometry}
            material={materials['X_SHOES_defaultMaterial.002_Bake1_baked']}
            skeleton={nodes.X_SHOES_defaultMaterial002_Baked.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_URL);
