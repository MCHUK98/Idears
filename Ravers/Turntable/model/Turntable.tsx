/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps, useFrame } from '@react-three/fiber';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer, Object3D } from 'three';
import { SkeletonUtils } from '../../utils/SkeletonUtils';

const MODEL_URL =
  'https://ravers-models.s3.us-east-2.amazonaws.com/RECORD_PLAYER_ANIMATION_2.glb';

type GLTFResult = GLTF & {
  nodes: {
    BezierCurve031: THREE.Mesh;
    BezierCurve031_1: THREE.Mesh;
    BezierCurve031_2: THREE.Mesh;
    BezierCurve031_3: THREE.Mesh;
    BezierCurve031_4: THREE.Mesh;
    BezierCurve031_5: THREE.Mesh;
    BezierCurve031_6: THREE.Mesh;
    BezierCurve031_7: THREE.Mesh;
    BezierCurve031_8: THREE.Mesh;
    BezierCurve031_9: THREE.Mesh;
    BezierCurve031_10: THREE.Mesh;
    BezierCurve031_11: THREE.Mesh;
    BezierCurve031_12: THREE.Mesh;
    BezierCurve031_13: THREE.Mesh;
    BezierCurve031_14: THREE.Mesh;
    BezierCurve031_15: THREE.Mesh;
    BezierCurve031_16: THREE.Mesh;
    BezierCurve031_17: THREE.Mesh;
    BezierCurve031_18: THREE.Mesh;
    BezierCurve031_19: THREE.Mesh;
    BezierCurve031_20: THREE.Mesh;
    BezierCurve031_21: THREE.Mesh;
    BezierCurve031_22: THREE.Mesh;
    BezierCurve031_23: THREE.Mesh;
    BezierCurve031_24: THREE.Mesh;
    BezierCurve031_25: THREE.Mesh;
    BezierCurve031_26: THREE.Mesh;
    BezierCurve031_27: THREE.Mesh;
    BezierCurve031_28: THREE.Mesh;
    BezierCurve031_29: THREE.Mesh;
    Circle215: THREE.Mesh;
    Circle215_1: THREE.Mesh;
    ['33_1-3_Record002']: THREE.Mesh;
  };
  materials: {
    ['plastica rossa.002']: THREE.MeshStandardMaterial;
    ['cromato.portadischi.004']: THREE.MeshStandardMaterial;
    ['Material.009']: THREE.MeshStandardMaterial;
    ['Material.010']: THREE.MeshStandardMaterial;
    ['Material.011']: THREE.MeshStandardMaterial;
    plast: THREE.MeshStandardMaterial;
    chrome: THREE.MeshStandardMaterial;
    stříbro: THREE.MeshStandardMaterial;
    ['lesk black']: THREE.MeshStandardMaterial;
    ['Material.008']: THREE.MeshStandardMaterial;
    ['Material.012']: THREE.MeshStandardMaterial;
    ['plastica_bianca.004']: THREE.MeshStandardMaterial;
    ['plastica_verde.004']: THREE.MeshStandardMaterial;
    ['plastica_blu.004']: THREE.MeshStandardMaterial;
    ['cromato.004']: THREE.MeshStandardMaterial;
    ['black metal']: THREE.MeshStandardMaterial;
    ['matne cerna']: THREE.MeshStandardMaterial;
    bronz: THREE.MeshStandardMaterial;
    ['emit_verde.004']: THREE.MeshStandardMaterial;
    ['chrome 2']: THREE.MeshStandardMaterial;
    ['led_bianco.004']: THREE.MeshStandardMaterial;
    ['cromato.piedi.004']: THREE.MeshStandardMaterial;
    ['Material.006']: THREE.MeshStandardMaterial;
    ['nero_lucido_piano.012']: THREE.MeshStandardMaterial;
    ['cromato.45giri.008']: THREE.MeshStandardMaterial;
    ['RÁMY TLAČÍTEK']: THREE.MeshStandardMaterial;
    ['cromato.45giri.009']: THREE.MeshStandardMaterial;
    ['emit_ross.004']: THREE.MeshStandardMaterial;
    ['plastica_base.onoff.004']: THREE.MeshStandardMaterial;
    ['Material.007']: THREE.MeshStandardMaterial;
    ['#REC0002_Textures.002']: THREE.MeshStandardMaterial;
  };
};

type ActionName = 'poggia_disco.001Action';
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export default function TurntableModel(props: GroupProps) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations, scene } = useGLTF(
    MODEL_URL
  ) as GLTFResult;

  Object.values(materials).forEach((material) => (material.skinning = true));
  const [armature, setArmature] = useState<Object3D | undefined>();
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
    actions.current['poggia_disco.001Action'].play();

    setMixer(_mixer);
    setArmature(model);
  }, []);

  useFrame((_, delta) => {
    mixer && mixer.update(delta);
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        position={[-1.98, 1.84, 7.54]}
        rotation={[-3.12, -0.71, -3.13]}
        scale={[0.17, 0.17, 0.17]}
      >
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031.geometry}
          material={materials['plastica rossa.002']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_1.geometry}
          material={nodes.BezierCurve031_1.material}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_2.geometry}
          material={nodes.BezierCurve031_2.material}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_3.geometry}
          material={materials['Material.010']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_4.geometry}
          material={materials['Material.011']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_5.geometry}
          material={materials.plast}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_6.geometry}
          material={materials.chrome}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_7.geometry}
          material={materials.stříbro}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_8.geometry}
          material={materials['lesk black']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_9.geometry}
          material={materials['Material.008']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_10.geometry}
          material={materials['Material.012']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_11.geometry}
          material={materials['plastica_bianca.004']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_12.geometry}
          material={materials['plastica_verde.004']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_13.geometry}
          material={materials['plastica_blu.004']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_14.geometry}
          material={materials['cromato.004']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_15.geometry}
          material={materials['black metal']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_16.geometry}
          material={materials['matne cerna']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_17.geometry}
          material={materials.bronz}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_18.geometry}
          material={materials['emit_verde.004']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_19.geometry}
          material={materials['chrome 2']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_20.geometry}
          material={materials['led_bianco.004']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_21.geometry}
          material={materials['cromato.piedi.004']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_22.geometry}
          material={materials['Material.006']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_23.geometry}
          material={materials['nero_lucido_piano.012']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_24.geometry}
          material={materials['cromato.45giri.008']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_25.geometry}
          material={materials['RÁMY TLAČÍTEK']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_26.geometry}
          material={materials['cromato.45giri.009']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_27.geometry}
          material={materials['emit_ross.004']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_28.geometry}
          material={materials['plastica_base.onoff.004']}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.BezierCurve031_29.geometry}
          material={materials['Material.007']}
        />
      </group>
      <group
        name="poggia_disco007"
        position={[-1.66, 1.81, 7.48]}
        rotation={[0, -0.55, 0]}
        scale={[0.48, 0.54, 0.48]}
      >
        <mesh
          frustumCulled={false}
          geometry={nodes.Circle215.geometry}
          material={nodes.Circle215.material}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes.Circle215_1.geometry}
          material={nodes.Circle215_1.material}
        />
        <mesh
          frustumCulled={false}
          geometry={nodes['33_1-3_Record002'].geometry}
          material={materials['#REC0002_Textures.002']}
          position={[0.01, 0.055, 0.02]}
          rotation={[3.13, -0.13, 0]}
          scale={[-5.87, -5.24, -5.87]}
        />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_URL);