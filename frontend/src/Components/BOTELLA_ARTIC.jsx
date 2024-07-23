import React, { useRef } from 'react';
import {
  useGLTF,
  PerspectiveCamera,
  OrthographicCamera,
} from '@react-three/drei';

import { useFrame } from '@react-three/fiber';

export function Model(props) {
  const { nodes, materials } = useGLTF('/BOTELLA_ARTIC.gltf');
  const modelRef = useRef();

  // Use useFrame to rotate the model on its y-axis
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Adjust the rotation speed as needed
    }
  });

  // // Ajustar la transparencia del material
  const liquidMaterial = materials['Liquid Water Bubbles #1'];
  liquidMaterial.transparent = true;
  liquidMaterial.opacity = 0; // Ajusta este valor según tus necesidades

  const glassMaterial = materials['Glass (Solid) White #1'];
  glassMaterial.transparent = true;
  glassMaterial.opacity = 10; // Ajusta este valor según tus necesidades

  return (
    <group {...props} dispose={null}>
      <group scale={0.0022}>
        <group position={[0, -90, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={
              nodes['Default(98FD495A-7D19-4160-BD9B-C4322F3BBCAF)'].geometry
            }
            material={materials['Soft Textured Black #1']}
          />
          <mesh
            geometry={
              nodes['Default(EA40679E-F627-4B18-8CAA-C8924236593C)'].geometry
            }
            material={materials['Liquid Water Bubbles #1']}
          />
          <mesh
            geometry={
              nodes['Default(9010FB83-7752-4448-B70D-4274F7C46523)'].geometry
            }
            material={materials['Liquid Water Bubbles #1']}
          />
          <mesh
            geometry={
              nodes['Default(973A27FD-2A31-4991-984B-04D8645A9456)'].geometry
            }
            material={materials['Glass (Solid) White #1']}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/BOTELLA_ARTIC.gltf');

export default Model;
