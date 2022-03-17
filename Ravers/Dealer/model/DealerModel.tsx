import * as THREE from 'three';
import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps, useFrame } from '@react-three/fiber';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer, Object3D } from 'three';
import { SkeletonUtils } from '../../utils/SkeletonUtils';

const MODEL_URL =
  'https://ravers-models.s3.us-east-2.amazonaws.com/RAVERz_AVATARzDEALERCOMPRESS.glb';

type GLTFResult = GLTF & {
  nodes: {
    lm3_PUFFY001_Plane060_lm3_PUFFY001_Plane060mesh_1: THREE.SkinnedMesh;
    lm3_PUFFY001_Plane060_lm3_PUFFY001_Plane060mesh_2: THREE.SkinnedMesh;
    lm3_PUFFY001_Plane060_lm3_PUFFY001_Plane060mesh_3: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    ['Material.004']: THREE.MeshStandardMaterial;
    ['MBLab_skin2.007']: THREE.MeshStandardMaterial;
    ['Fabric04.006']: THREE.MeshStandardMaterial;
  };
};

type ActionName = 'Armature.002|mixamo.com|Layer0.003';
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export default function DealerModel({
  ...props
}: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations, scene } = useGLTF(
    MODEL_URL
  ) as GLTFResult;

  Object.values(materials).forEach((material) => (material.skinning = true));
  const [mixer, setMixer] = useState<AnimationMixer | undefined>();
  const actions = useRef<GLTFActions>();

  useEffect(() => {
    const model = SkeletonUtils.clone(scene.children[0]) as Object3D;

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
    actions.current['Armature.002|mixamo.com|Layer0.003'].play();

    setMixer(_mixer);
  }, []);

  useFrame((_, delta) => {
    mixer && mixer.update(delta);
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.6}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          frustumCulled={false}
          geometry={
            nodes.lm3_PUFFY001_Plane060_lm3_PUFFY001_Plane060mesh_1.geometry
          }
          material={materials['Material.004']}
          skeleton={
            nodes.lm3_PUFFY001_Plane060_lm3_PUFFY001_Plane060mesh_1.skeleton
          }
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={
            nodes.lm3_PUFFY001_Plane060_lm3_PUFFY001_Plane060mesh_2.geometry
          }
          material={materials['MBLab_skin2.007']}
          skeleton={
            nodes.lm3_PUFFY001_Plane060_lm3_PUFFY001_Plane060mesh_2.skeleton
          }
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={
            nodes.lm3_PUFFY001_Plane060_lm3_PUFFY001_Plane060mesh_3.geometry
          }
          material={materials['Fabric04.006']}
          skeleton={
            nodes.lm3_PUFFY001_Plane060_lm3_PUFFY001_Plane060mesh_3.skeleton
          }
        />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_URL);
