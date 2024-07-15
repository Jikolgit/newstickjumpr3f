import * as THREE from 'three';
import React from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import vertex from './vertex.glsl'
import fragmen from './frag.glsl'
import cubevertex from './cubeVertex.glsl'
import cubefragmen from './cubeFrag.glsl'
export function PlatformModel(props)
{
    const { scene } = useGLTF('/Pogoblender.glb');
    let platformTexture = useTexture('/platform.jpg');
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
    const { nodes, materials, animations } = useGraph(clone);

    platformTexture.flipY = false;
    platformTexture.colorSpace = THREE.SRGBColorSpace; 
    platformTexture.minFilter = THREE.LinearFilter;
    platformTexture.magFilter = THREE.LinearFilter;

    let platformTxt = new THREE.MeshBasicMaterial({map:platformTexture})
    return  <>
            <mesh name="ground" 
                scale={0.8}
                visible={props._visible}
                geometry={nodes.ground.geometry} 
                material={platformTxt} position={[props.position[0],props.position[1],props.position[2]]} />
            </>
}
export function PlayerModel(props)
{
    const { scene } = useGLTF('/Pogoblender.glb');
    let platformTexture = useTexture('/pogotxt.jpg');
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
    const { nodes, materials, animations } = useGraph(clone);

    platformTexture.flipY = false;
    platformTexture.colorSpace = THREE.SRGBColorSpace; 
    platformTexture.minFilter = THREE.LinearFilter;
    platformTexture.magFilter = THREE.LinearFilter;

    let platformTxt = new THREE.MeshBasicMaterial({map:platformTexture})
    return  <>
            <mesh ref={props._ref} scale={0.7} name="pogo_1" geometry={nodes.pogo_1.geometry} material={platformTxt} position={[props.position[0],props.position[1],props.position[2]]}>
            <mesh name="helmet" geometry={nodes.helmet.geometry} material={platformTxt}  rotation={[-0.279, 0, 0]} scale={2.35} />
                    <group name="armature_template001" position={[-0.043, 3.643, -0.675]} scale={3.774}>
                        <primitive object={nodes.Bone11} />
                        <primitive object={nodes.poleL} />
                        <primitive object={nodes.Bone029L} />
                        <primitive object={nodes.poleR} />
                        <primitive object={nodes.Bone029R} />
                        <skinnedMesh name="newbody" geometry={nodes.newbody.geometry} material={platformTxt} skeleton={nodes.newbody.skeleton} />
                    </group>
                    <mesh name="led" geometry={nodes.led.geometry} material={platformTxt} position={[0.028, 9.969, -0.007]} />
            </mesh>
            </>
}
export function JumpSpeedModel(props)
{
    const { scene } = useGLTF('/Pogoblender.glb');
    let platformTexture = useTexture('/coltxt.png');
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
    const { nodes, materials, animations } = useGraph(clone);

    platformTexture.flipY = false;
    platformTexture.colorSpace = THREE.SRGBColorSpace; 
    platformTexture.minFilter = THREE.LinearFilter;
    platformTexture.magFilter = THREE.LinearFilter;

    let platformTxt = new THREE.MeshBasicMaterial({map:platformTexture})
    return  <>
                <mesh scale={0.8} ref={props._ref} name="speedicon" geometry={nodes.speedicon.geometry} 
                        visible={props._visible} matrixAutoUpdate={props._matrixAutoUpdate}
                    material={platformTxt} position={[props.position[0],props.position[1],props.position[2]]} />

            </>
}
export function JumpDistanceModel(props)
{
    const { scene } = useGLTF('/Pogoblender.glb');
    let platformTexture = useTexture('/coltxt.png');
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
    const { nodes, materials, animations } = useGraph(clone);

    platformTexture.flipY = false;
    platformTexture.colorSpace = THREE.SRGBColorSpace; 
    platformTexture.minFilter = THREE.LinearFilter;
    platformTexture.magFilter = THREE.LinearFilter;

    let platformTxt = new THREE.MeshBasicMaterial({map:platformTexture})
    return  <>
                <mesh scale={0.8} ref={props._ref} name="jumpx2icon" geometry={nodes.jumpx2icon.geometry} 
                        visible={props._visible} matrixAutoUpdate={props._matrixAutoUpdate}
                    material={platformTxt} position={[props.position[0],props.position[1],props.position[2]]} />

            </>
}
export function CoinModel(props)
{
    const { scene } = useGLTF('/Pogoblender.glb');
    let platformTexture = useTexture('/pogotxt.jpg');
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
    const { nodes, materials, animations } = useGraph(clone);

    platformTexture.flipY = false;
    platformTexture.colorSpace = THREE.SRGBColorSpace; 
    platformTexture.minFilter = THREE.LinearFilter;
    platformTexture.magFilter = THREE.LinearFilter;

    let platformTxt = new THREE.MeshBasicMaterial({map:platformTexture})
    return  <>
                <mesh
                 rotation={[0,0,Math.PI*0.5]}
                 scale={0.8} ref={props._ref} name="coin" geometry={nodes.coin.geometry} 
                        visible={props._visible} matrixAutoUpdate={props._matrixAutoUpdate}
                    material={platformTxt} position={[props.position[0],props.position[1],props.position[2]]} />

            </>
}
export function JumpBigModel(props)
{
    const { scene } = useGLTF('/Pogoblender.glb');
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
    const { nodes, materials, animations } = useGraph(clone);
    let _ucol = props._col == "blue"? new THREE.Vector3(0,0,1) : new THREE.Vector3(1,1,1)

    let platformTxt = new THREE.ShaderMaterial({transparent:true ,vertexShader:vertex,fragmentShader:fragmen,side:THREE.DoubleSide
        ,uniforms:{utime:{value:0.2},uColor:{value:_ucol}}
    })
    let testMat = new THREE.MeshBasicMaterial({color:'red',visible:false})
    return  <>
                {/* <mesh
                 
                 scale={0.8} ref={props._ref} name="coin" geometry={nodes.cylinder_2.geometry} 
                        visible={props._visible} matrixAutoUpdate={props._matrixAutoUpdate}
                    material={platformTxt} position={[props.position[0],props.position[1],props.position[2]]} /> */}
                
                {/* <mesh name="cylinder_2" geometry={nodes.cylinder_2.geometry} ref={props._ref} 
                        visible={props._visible} matrixAutoUpdate={props._matrixAutoUpdate}
                        position={[props.position[0],props.position[1],props.position[2]]}>
                    <mesh name="cylinder_2001" geometry={nodes.cylinder_2001.geometry} material={platformTxt} />
                    <mesh name="cylinder_2002" geometry={nodes.cylinder_2002.geometry} material={platformTxt} />
                </mesh> */}
                <mesh name="cylinder_2" geometry={nodes.cylinder_2.geometry} ref={props._ref}  material={testMat} 
                visible={props._visible} matrixAutoUpdate={props._matrixAutoUpdate}
                position={[props.position[0],props.position[1],props.position[2]]}>
                        <mesh name="cylinder_2001" geometry={nodes.cylinder_2001.geometry} material={platformTxt} />
                        <mesh name="cylinder_2002" geometry={nodes.cylinder_2002.geometry} material={platformTxt} />
                        <mesh name="cylinder_2003" geometry={nodes.cylinder_2003.geometry} material={platformTxt} />
                        <mesh name="cylinder_2004" geometry={nodes.cylinder_2004.geometry} material={platformTxt} />
                        <mesh name="cylinder_2005" geometry={nodes.cylinder_2005.geometry} material={platformTxt} />
                        <mesh name="cylinder_2006" geometry={nodes.cylinder_2006.geometry} material={platformTxt} />
                        <mesh name="cylinder_2007" geometry={nodes.cylinder_2007.geometry} material={platformTxt} />
                        <mesh name="cylinder_2008" geometry={nodes.cylinder_2008.geometry} material={platformTxt} />
                        <mesh name="cylinder_2009" geometry={nodes.cylinder_2009.geometry} material={platformTxt} />
                        <mesh name="cylinder_2010" geometry={nodes.cylinder_2010.geometry} material={platformTxt} />
                        <mesh name="cylinder_2011" geometry={nodes.cylinder_2011.geometry} material={platformTxt} />
                        <mesh name="cylinder_2012" geometry={nodes.cylinder_2012.geometry} material={platformTxt} />
                        <mesh name="cylinder_2013" geometry={nodes.cylinder_2013.geometry} material={platformTxt} />
                        <mesh name="cylinder_2014" geometry={nodes.cylinder_2014.geometry} material={platformTxt} />
                        <mesh name="cylinder_2015" geometry={nodes.cylinder_2015.geometry} material={platformTxt} />
                        <mesh name="cylinder_2016" geometry={nodes.cylinder_2016.geometry} material={platformTxt} />
                        <mesh name="cylinder_2017" geometry={nodes.cylinder_2017.geometry} material={platformTxt} />
                        <mesh name="cylinder_2018" geometry={nodes.cylinder_2018.geometry} material={platformTxt} />
                        <mesh name="cylinder_2019" geometry={nodes.cylinder_2019.geometry} material={platformTxt} />
                        <mesh name="cylinder_2020" geometry={nodes.cylinder_2020.geometry} material={platformTxt} />
                        <mesh name="cylinder_2021" geometry={nodes.cylinder_2021.geometry} material={platformTxt} />
                        <mesh name="cylinder_2022" geometry={nodes.cylinder_2022.geometry} material={platformTxt} />
                        <mesh name="cylinder_2023" geometry={nodes.cylinder_2023.geometry} material={platformTxt} />
                        <mesh name="cylinder_2024" geometry={nodes.cylinder_2024.geometry} material={platformTxt} />
                </mesh>
                
                {/* <mesh
                    ref={props._ref} name="coin"
                    material={platformTxt}
                    visible={props._visible} matrixAutoUpdate={props._matrixAutoUpdate}
                    position={[props.position[0],3.5,props.position[2]]}
                >
                    <cylinderGeometry args={[3,3,6,20,1,true]} />
                </mesh> */}

            </>
}

export function JumpSwitchModel(props)
{
    const { scene } = useGLTF('/Pogoblender.glb');
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
    const { nodes, materials, animations } = useGraph(clone);
    let _ucol = props._col == "blue"? new THREE.Vector3(0,0,1) : new THREE.Vector3(1,1,1)

    let platformTxt = new THREE.ShaderMaterial({transparent:true ,vertexShader:cubevertex,fragmentShader:cubefragmen,side:THREE.DoubleSide
        ,uniforms:{utime:{value:0.2},uColor:{value:_ucol}}
    })
    let testMat = new THREE.MeshBasicMaterial({color:'red',visible:false})
    return  <>
                
                <mesh name="cube_1" geometry={nodes.cube_1.geometry} ref={props._ref}  material={testMat} 
                        rotation={[0,0,Math.PI]}
                        scale={0.8}
                visible={props._visible} matrixAutoUpdate={props._matrixAutoUpdate}
                position={[props.position[0],4.6,props.position[2]]}>
                    <mesh name="cube_1001" geometry={nodes.cube_1001.geometry} material={platformTxt}  />
                    <mesh name="cube_1002" geometry={nodes.cube_1002.geometry} material={platformTxt}  />
                    <mesh name="cube_1003" geometry={nodes.cube_1003.geometry} material={platformTxt}  />
                    <mesh name="cube_1004" geometry={nodes.cube_1004.geometry} material={platformTxt}  />
                </mesh>
               

            </>
}
useGLTF.preload('/Pogoblender.glb')