import React, { useRef } from 'react';
import {
  useGLTF,
  PerspectiveCamera,
  OrthographicCamera,
} from '@react-three/drei';

export function bot2(props) {
  const { nodes, materials } = useGLTF('/bot2.gltf');
  return (
    <group {...props} dispose={null}>
      <group scale={0.001}>
        <group
          position={[0, 0.236, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.8}
        >
          <mesh
            geometry={
              nodes['Default(C7358F57-AD61-49E5-8AF8-9DA37331221C)'].geometry
            }
            material={materials['Glass Droplets White #1']}
          />
          <mesh
            geometry={
              nodes['Default(03FCE1B1-D7E7-413B-A3B4-114CCE1C6889)'].geometry
            }
            material={materials['Glass Droplets White #1']}
          />
          <mesh
            geometry={
              nodes['Default(98FD495A-7D19-4160-BD9B-C4322F3BBCAF)'].geometry
            }
            material={materials['Hard Rough Plastic Black #1']}
          />
          <mesh
            geometry={
              nodes['Default(F20D1E7D-084A-4360-BB67-7AC403001B6F)'].geometry
            }
            material={materials['Glass Droplets White #1']}
          />
          <mesh
            geometry={
              nodes['Default(EA40679E-F627-4B18-8CAA-C8924236593C)'].geometry
            }
            material={materials['Liquid Water #4']}
          />
          <mesh
            geometry={
              nodes['Default(9010FB83-7752-4448-B70D-4274F7C46523)'].geometry
            }
            material={materials['Liquid Water #5']}
          />
        </group>
      </group>
      <PerspectiveCamera
        makeDefault={false}
        far={591.951}
        near={406.87}
        fov={48.174}
        position={[-0.223, -0.023, -0.42]}
        rotation={[2.849, -0.468, 3.029]}
        scale={0.001}
      />
      <PerspectiveCamera
        makeDefault={false}
        far={407.224}
        near={181.616}
        fov={48.174}
        position={[-0.048, 0.243, -0.273]}
        rotation={[-2.601, -0.17, -3.015]}
        scale={0.001}
      />
      <OrthographicCamera
        makeDefault={false}
        far={240.279}
        near={150.978}
        position={[-0.021, 0.058, 0.196]}
        scale={0.001}
      />
      <OrthographicCamera
        makeDefault={false}
        far={427.871}
        near={161.803}
        position={[0.003, -0.162, -0.118]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <OrthographicCamera
        makeDefault={false}
        far={497.441}
        near={408.079}
        position={[0.453, 0.492, -0.308]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
        scale={0.001}
      />
    </group>
  );
}

useGLTF.preload('/bot2.gltf');

export default bot2;
