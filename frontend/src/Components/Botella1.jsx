// src/components/Botella1.jsx
import React from 'react';
import { useGLTF, Text } from '@react-three/drei';
import { MeshBasicMaterial } from 'three';

export function Botella1(props) {
  const { nodes, materials } = useGLTF('/botella1.gltf');

  // Crear un material oscuro
  const darkMaterial = new MeshBasicMaterial({
    color: 0x333333, // Color más oscuro
    transparent: true,
    opacity: 0.8,
  });

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        {nodes['Default(98FD495A-7D19-4160-BD9B-C4322F3BBCAF)'] && (
          <mesh
            geometry={
              nodes['Default(98FD495A-7D19-4160-BD9B-C4322F3BBCAF)'].geometry
            }
            material={darkMaterial}
            position={[-0.325, -0.325, -1]}
          />
        )}
        {nodes['Default(EA40679E-F627-4B18-8CAA-C8924236593C)'] && (
          <mesh
            geometry={
              nodes['Default(EA40679E-F627-4B18-8CAA-C8924236593C)'].geometry
            }
            material={materials['Liquid Water Bubbles #1']}
          />
        )}
        {nodes['Default(9010FB83-7752-4448-B70D-4274F7C46523)'] && (
          <mesh
            geometry={
              nodes['Default(9010FB83-7752-4448-B70D-4274F7C46523)'].geometry
            }
            material={materials['Liquid Water Bubbles #1']}
          />
        )}
        {nodes['Default(9132A971-869A-4385-8DF0-A382E1FC651F)'] && (
          <mesh
            geometry={
              nodes['Default(9132A971-869A-4385-8DF0-A382E1FC651F)'].geometry
            }
            material={darkMaterial}
          />
        )}
        {nodes['Default(973A27FD-2A31-4991-984B-04D8645A9456)'] && (
          <mesh
            geometry={
              nodes['Default(973A27FD-2A31-4991-984B-04D8645A9456)'].geometry
            }
            material={darkMaterial}
          />
        )}
        {/* Agregar texto a la botella */}
        <Text
          position={[0, 0, 0.1]} // Ajusta la posición del texto
          fontSize={0.5} // Ajusta el tamaño del texto
          color="white" // Color del texto
          anchorX="center"
          anchorY="middle"
        >
          Hola
        </Text>
      </group>
    </group>
  );
}

useGLTF.preload('/botella1.gltf');

export default Botella1;
