import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Bottle(props) {
  const { nodes, materials } = useGLTF('/bottle.gltf');
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Object_3.geometry}
          material={materials['Scene_-_Root']}
          position={[-0.325, -0.325, -1]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/bottle.gltf');

export default Bottle;
