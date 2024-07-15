import * as THREE from 'three';
import { useFrame, useThree } from "@react-three/fiber";
import { createMapPlane, generateMapObject } from "./mapTemplate";
import gsap from "gsap";
import React, { useContext, useEffect, useRef } from "react";
import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import { appContext } from '../src/App';
import * as dat from 'dat.gui';
import { CoinModel, JumpBigModel, JumpDistanceModel, JumpSpeedModel, JumpSwitchModel, PlatformModel, PlayerModel } from './GameModels';



export function GameRender()
{
 
    let _appContext = useContext(appContext);
    let level = 1;
    let playertStep = 0;
    let playerCoinValue = 0;
    let scoreValue = 0;
    let playerPreviousMove = 'none'
    let jumpSpeedBoostActived = false;
    let jumpSpeedCounter = 0;
    let playerMoveTimeline = null;
    let previousPlatform;
    let actualPlatform; 

    let jumpSpeed = 0.5;
    let jumpDistanceX = 1;
    let jumpDistanceY = 2;
    let jumpDesc = useRef({jumpSpeed:1,jumpDistanceX:1,jumpDistanceY:2});
    _appContext.gui_jumpDesc.current =jumpDesc.current;
    // console.log(_appContext.gui_jumpDesc)
    let jumpDistanceBosstActived = false
    let jumpDistanceBoostCounter = 0;
    let platformLength = 100
    let platformMid = platformLength*0.5;
    let modelContainer = [];
    let coinmodelContainer = [];
    let coinmodelInfo = [];
    let jumpmodelContainer = [];
    let jumpmodelInfo = [];
    let jumpSpeedmodelContainer = [];
    let jumpSpeedmodelInfo = [];
    let jumpBigmodelContainer = [];
    let jumpBigmodelInfo = [];
    let jumpSwitchmodelContainer = [];
    let jumpSwitchmodelInfo = [];
    
    
    let mapPlane = createMapPlane(1,'START','none');
    let initialmMapPlane = structuredClone(mapPlane);
    let platformCounter = useRef(null);
    let platformGroup1Ref = useRef(null);
    let platformGroup2Ref = useRef(null);
    let platformOrder = [platformGroup1Ref,platformGroup2Ref];
    let playerRef = useRef(null);
    let cameraRef = useRef(null);
    let orbitRef = useRef(null);
    let coinObjectRef = useRef([]);
    let jumpObjectRef = useRef([]);
    let jumpSpeedObjectRef = useRef([]);
    let jumpBigObjectRef = useRef([]);
    let jumpSwitchObjectRef = useRef([]);
    // let notUedObjectDesc = generateMapObject();
    let notUedObject=[] ;
    let eachGroupPlatformInfo = [{hasReachCenter:false,executeOnce:false},{hasReachCenter:false,executeOnce:false}]
    let platformRef = useRef([]);
    let keyIsPressed = false;
    let jumpIsOver = true;
    let keyPressed = 'none';
    let playerPosition = {x:2,y:0,z:2};
    let cameraPosition = {x:5.5,y:20,z:-15};
    let orbitPosition = {x:5.5,y:0,z:20};
    let playerStandAnimation,playerMoveAnimation,playerJumpMoveAnimation,cameraMoveAnimation,orbitMoveAnimation;

    let testObj = new THREE.Mesh(new THREE.BoxGeometry(5,5,5),new THREE.MeshBasicMaterial({color:'red'}))
    testObj.position.set(0,0,0)
    // for(let i =0;i<notUedObjectDesc.length;i++)
    // {
    //     notUedObject[i] = <mesh>
    //                             <sphereGeometry args={[1,10,10]} />
    //                             <meshBasicMaterial color={'white'}/>
    //                       </mesh>
    // }

    //On va recycler les anciens objets pour la nouvelle map
    for(let i =0;i<mapPlane.length;i++)
    {
        let col = 'blue'
        if(mapPlane[i].hasObject && mapPlane[i].desc.objectType=='switch')
        {
            col = 'white'
        }
        modelContainer[i] = 
                                // <mesh key={i}  
                                //    visible={mapPlane[i].active? true : false}
                                //    position={[mapPlane[i].posX,0,mapPlane[i].posZ]} rotation={[-Math.PI*0.5,0,0]} >
                                //     <planeGeometry args={[4,4]} />
                                //     <meshBasicMaterial wireframe color={"blue"} />
                                // </mesh>
                                <PlatformModel key={i} _visible={mapPlane[i].active? true : false}   
                                position={[mapPlane[i].posX,0,mapPlane[i].posZ]} rotation={[-Math.PI*0.5,0,0]}
                                />
                                
                            
    }
    for(let i =0;i<30;i++)
    {
        coinmodelContainer[i] = <group key={i}>
                                    {/* <mesh matrixAutoUpdate = {false} visible={false} position={[mapPlane[i].posX,1,mapPlane[i].posZ]}
                                        ref={(val)=>{coinObjectRef.current[i] = val}} 
                                    >
                                            <boxGeometry args={[1.5,1.5,1.5]} />
                                            <meshBasicMaterial color={'white'}/>
                                    </mesh> */}
                                    <CoinModel 
                                    _matrixAutoUpdate = {false} _visible={false} _ref={(val)=>{coinObjectRef.current[i] = val}}  
                                    position={[mapPlane[i].posX,2.8,mapPlane[i].posZ]} 
                                    />
                                </group>;
        coinmodelInfo[i] ={isUsed:false,index:i,currentLevel:1};
    }
    for(let i =0;i<20;i++)
    {
        jumpmodelContainer[i] = <group key={i}>
                                        {/* <mesh matrixAutoUpdate = {false} visible={false} position={[mapPlane[i].posX,1,mapPlane[i].posZ]}
                                            ref={(val)=>{jumpObjectRef.current[i] = val}} 
                                        >
                                                <sphereGeometry args={[2,10,10]} />
                                                <meshBasicMaterial wireframe color={'red'}/>
                                        </mesh> */}
                                        <JumpDistanceModel 
                                        _matrixAutoUpdate = {false} _visible={false} _ref={(val)=>{jumpObjectRef.current[i] = val}}  position={[mapPlane[i].posX,1,mapPlane[i].posZ]} 
                                        />
                                </group>;
        jumpmodelInfo[i] ={isUsed:false,index:i,currentLevel:1};

    }
    for(let i =0;i<20;i++)
    {
        jumpSpeedmodelContainer[i] = <group key={i}>
                                        {/* <mesh matrixAutoUpdate = {false} visible={false} position={[mapPlane[i].posX,1,mapPlane[i].posZ]}
                                            ref={(val)=>{jumpSpeedObjectRef.current[i] = val}} 
                                        >
                                                <circleGeometry args={[2,10,10]} />
                                                <meshBasicMaterial wireframe color={'red'}/>
                                        </mesh> */}
                                        <JumpSpeedModel _matrixAutoUpdate = {false} _visible={false} _ref={(val)=>{jumpSpeedObjectRef.current[i] = val}}  position={[mapPlane[i].posX,1,mapPlane[i].posZ]} />
                                    </group>;
        jumpSpeedmodelInfo[i] ={isUsed:false,index:i,currentLevel:1};

    }
    for(let i =0;i<20;i++)
    {
        jumpBigmodelContainer[i] = <group key={i}>
                                        <JumpBigModel _matrixAutoUpdate = {false} _visible={false} 
                                                     _col={'blue'}
                                                      _ref={(val)=>{jumpBigObjectRef.current[i] = val}}  position={[mapPlane[i].posX,1,mapPlane[i].posZ]} 
                                        />
                                    </group>;
        jumpBigmodelInfo[i] ={isUsed:false,index:i,currentLevel:1};

    }
    for(let i =0;i<20;i++)
    {
        jumpSwitchmodelContainer[i] = <group key={i}>
                                        <JumpSwitchModel _matrixAutoUpdate = {false} _visible={false} 
                                                        _col={'white'}
                                                        _ref={(val)=>{jumpSwitchObjectRef.current[i] = val}}  position={[mapPlane[i].posX,1,mapPlane[i].posZ]} 
                                        />
                                    </group>;
        jumpSwitchmodelInfo[i] ={isUsed:false,index:i,currentLevel:1};

    }
    let jumpAnimation = ()=>
        {
            playerStandAnimation = gsap.to(playerRef.current.position,{
                y:5,
                
                duration:0.4,
                repeat:1,
                yoyo:true,
                onStart:()=>{
                    
                },
                onUpdate: ()=>{
                    
                },
                onComplete:()=>{

                    
                    stopAnimation('STAND');
                    jumpAnimation();
                    if(playertStep>0)
                    {
                        startPlatformCounter();
                    }
                }
            })
        }
    let resumeAnimation = ()=>
        {

                if(playerStandAnimation)
                {playerStandAnimation.resume()}            
            

                if(playerMoveAnimation)
                {playerMoveAnimation.resume()}
                
            
            
                if(cameraMoveAnimation)
                {cameraMoveAnimation.resume()}
                
            
            
                if(orbitMoveAnimation)
                {orbitMoveAnimation.resume()}

                if(playerMoveTimeline)
                {playerMoveTimeline.resume()}
                
            

        }
    let pauseAnimation = ()=>
        {

                if(playerStandAnimation)
                {playerStandAnimation.pause()}            
            

                if(playerMoveAnimation)
                {playerMoveAnimation.pause()}
                
            
            
                if(cameraMoveAnimation)
                {cameraMoveAnimation.pause()}
                
            
            
                if(orbitMoveAnimation)
                {orbitMoveAnimation.pause()}

                if(playerMoveTimeline)
                {playerMoveTimeline.pause()}
                
            

        }
    let stopAnimation = (_animation)=>
        {
            if(_animation == 'STAND')
            {
                if(playerStandAnimation)
                playerStandAnimation.kill();
                playerStandAnimation = null;
            }
            else if(_animation == 'PLAYER-MOVE')
            {
                if(playerMoveTimeline)
                {
                    playerMoveTimeline.kill();
                    playerMoveTimeline = null;
                }
            }


        }
    let move = (direction,duration,distance)=>
        {
                previousPlatform = actualPlatform;
                playerMoveTimeline = gsap.timeline({onComplete:()=>
                    {   
                      
                        jumpIsOver = true;
                        playerRef.current.position.y = 1.5;
                        stopAnimation('PLAYER-MOVE');
                        jumpAnimation();
                        getPlatformInfo(playerPosition)
                    }});
                
                playerRef.current.position.y = 1.5;
                jumpIsOver = false;
                playerPreviousMove = direction;
                if(direction == 'TOP')
                { 
                    playerPosition.z += 4*distance;
                    cameraPosition.z += 4*distance;
                    orbitPosition.z += 4*distance;
    
                }
                else
                {
                    playerPosition.z += 8*distance;
                    cameraPosition.z += 8*distance;
                    orbitPosition.z += 8*distance;
    
                }
                if(direction == 'LEFT'){playerPosition.x += 8;}
                if(direction == 'RIGHT'){playerPosition.x -= 8;}
                

                if(direction == 'RIGHT' || direction == 'LEFT')
                {
                    playerMoveTimeline.to(playerRef.current.position,{
                        x:playerPosition.x,
                        z:playerPosition.z,
                        ease: "circ.out",
                        duration:duration,
                        onStart:()=>{
                            
                        },
                        onUpdate: ()=>{
                            
                            
                        },
                        onComplete:()=>{
                           
                        }
                        },0);
                }
                else
                {
                    playerMoveTimeline.to(playerRef.current.position,{
                        z:playerPosition.z,
                        ease: "circ.out",
                        duration:duration,
                        onStart:()=>{
                            
                        },
                        onUpdate: ()=>{
                            
                            
                        },
                        onComplete:()=>{
                           
                        }
                        },0);
                }
                
                playerMoveTimeline.to(playerRef.current.position,{
                    y:10,
                    duration:duration*0.5,
                    repeat:1,
                    yoyo:true,
                    onStart:()=>{
                        
                    },
                    onUpdate: ()=>{
                        
                    },
                    onComplete:()=>{
                        // jumpIsOver = true;
                        // playerRef.current.position.y = 1.5;
                        // stopAnimation('STAND');
                        // jumpAnimation();
                        // getPlatformInfo(playerPosition)
                    }
                },0)
                playerMoveTimeline.to(cameraRef.current.position,{
                z:cameraPosition.z,
                ease: "circ.out",
                duration:duration,
                onStart:()=>{
                },
                onUpdate: ()=>{
                    
                    
                },
                onComplete:()=>{
                    
                    // stopAnimation('CAMERA-MOVE');
                }
                },0)
                playerMoveTimeline.to(orbitRef.current.target,{
                z:orbitPosition.z,
                ease: "circ.out",
                duration:duration,
                onStart:()=>{
                    
                },
                onUpdate: ()=>{
                    
                    
                },
                onComplete:()=>{
                    // stopAnimation('ORBIT-MOVE');
                }
                },0)

        }
    let checkIfCanAddNewPlatforme = (platform)=>
        {
            if(platform.id >= (mapPlane.length *0.5)+platformMid*(level-1))
            {

                if(!eachGroupPlatformInfo[level-1].executeOnce)
                {
                    
                   
                    if(level==1)
                    {
                        platformOrder[level].current.visible = true;
                    }
                    else
                    { 
                        
                       
                        resetNextPlatform();
                          //On envoi la dernière plateforme au bout de l'array
                        platformOrder[level] = platformOrder[level-2]
                        clearPreviousObject()
                    }
                    //On ajoute les nouvelles infos de la plateforme
                    eachGroupPlatformInfo.push({hasReachCenter:false,executeOnce:false})
                    eachGroupPlatformInfo[level-1].executeOnce = true;
                    
                    level++;
                    let nextPlane = createMapPlane(level,'NEXT',mapPlane[mapPlane.length-1].posZ);
                    platformOrder[level-1].current.position.z = mapPlane[mapPlane.length-1].posZ+6

                    mapPlane.push(...nextPlane);
                    addObjectsToPlatform();
                   
                }
            }
        }
    let setGameOver = ()=>
        {   
            // console.log('GAME OVER OVER')
            pauseForGameOver();
            _appContext.gameOverScreenRef.current.style.display = 'block';
        }
    let resetNextPlatform = ()=>
        {
            // On netoie la platform
            for(let i = 0;i<platformOrder[level-2].current.children.length;i++)
                {   
                    // platformOrder[level-2].current.children[i].material.color = new THREE.Color(0,0,1);
                    platformOrder[level-2].current.children[i].position.x = initialmMapPlane[i].posX;
                }
            
        }
    let startPlatformCounter = ()=>
        {
            platformCounter.current.visible = true;
            platformCounter.current.text --;
            if(platformCounter.current.text == 0)
            {
                
                setGameOver();
            }
        }
    let getPlatformInfo = (_playerPosition)=>
        {
            let findPlatformFunc = (elem)=>
            {
                return elem.posX == _playerPosition.x && elem.posZ == _playerPosition.z 
            }
            let result = mapPlane.find(findPlatformFunc);

            if(result)
            {   
                if(result.active)
                {
                   
                    actualPlatform = result;
                    platformCounter.current.position.x = result.posX;
                    platformCounter.current.position.z = result.posZ;
                    platformCounter.current.text = result.counter;

                    playertStep++;
                    scoreValue++;
                    _appContext.scoreValueRef.current.innerText  = scoreValue;
                    if(previousPlatform?.desc.objectType && previousPlatform.desc.objectType == 'Bigjump')
                    {
                        // jumpDesc.current.jumpDistanceY = 2;
                        if(jumpSpeedBoostActived)
                        {
                            jumpDesc.current.jumpSpeed = 0.5;
                            jumpDesc.current.jumpDistanceY = 4;
                        }
                        else
                        {
                            jumpDesc.current.jumpSpeed = 1;
                            jumpDesc.current.jumpDistanceY = 2;
                        }
                        
                    }
                    if(playerPreviousMove == 'LEFT' || playerPreviousMove == 'RIGHT' || playerPreviousMove == 'TOP')
                    {
                        if(jumpDistanceBosstActived)
                        {
                            jumpDistanceBoostCounter --;
                            if(jumpDistanceBoostCounter == 0)
                            {
                                jumpDistanceBosstActived = false;
                                jumpDesc.current.jumpDistanceX = 1
                            }
                            _appContext.jumpx2ValueRef.current.innerText  = jumpDistanceBoostCounter;
    
                        }
                    }
                    if(jumpSpeedBoostActived)
                    {
                        jumpSpeedCounter --;
                        if(jumpSpeedCounter == 0)
                        {
                            jumpSpeedBoostActived = false;
                            jumpDesc.current.jumpSpeed = 1
                        }
                        _appContext.jumpspeedValueRef.current.innerText  = jumpSpeedCounter;

                    }
                    
                    checkPlatformEffect(result)
                    checkIfCanAddNewPlatforme(result)    
                }
                else{setGameOver();}
            }
            else
            {
                setGameOver();
                
            }
            
           
        }
    let playerMovePressedEventHandlerCallB = (evt)=>
        {  
            if(_appContext.gameOverScreenRef.current.style.display == 'block' || 
                _appContext.loadingScreenRef.current.style.display == 'block' || 
                _appContext.pauseScreenRef.current.style.display == 'block'
            )
            {
                if(_appContext.pauseScreenRef.current.style.display == 'block')
                {
                    if(evt.key == 'p')
                    {
                        _appContext.togglePauseScreen();                
                    }
                }
            }
            else
            {
                if(evt.key == 'p')
                {
                    _appContext.togglePauseScreen();                   
                }
                else
                {
                    if(!keyIsPressed && jumpIsOver)
                        {
                            keyIsPressed = true;
                            keyPressed = evt.key;
                            if(evt.key == 'ArrowLeft')
                            {
                                stopAnimation('STAND');
                                move('LEFT',jumpDesc.current.jumpSpeed,jumpDesc.current.jumpDistanceX);
                            }
                            else if(evt.key == 'ArrowRight')
                            {
                                stopAnimation('STAND');
                                move('RIGHT',jumpDesc.current.jumpSpeed,jumpDesc.current.jumpDistanceX);
                
                            }
                            else if(evt.key == 'ArrowUp')
                            {
                                stopAnimation('STAND');
                                move('TOP',jumpDesc.current.jumpSpeed,jumpDesc.current.jumpDistanceY);
                            }
                           
                            else if(evt.key == ' ')
                            {   
                                // console.log(platformOrder[level].current.children.length);
                                
                                // coinObjectRef.current[3].matrixAutoUpdate = !coinObjectRef.current[3].matrixAutoUpdate;
                            }
                        }
                }

            }

            

        }
    let checkPlatformEffect = (_platform)=>
        {
            if(_platform.hasObject)
            {
                if(_platform.desc.objectType == 'switch')
                {   
                    slidePlatform(platformOrder[_platform.desc.levelOwned].current.children[_platform.desc.target],_platform)
                }
                else if(_platform.desc.objectType == 'coin')
                {   
                    takeCoin(_platform)
                }
                else if(_platform.desc.objectType == 'jumpDistance-BOOST')
                {   
                    // console.log('take jump Distance Boost')
                    takeJumpDistance(_platform)
                }
                else if(_platform.desc.objectType == 'jumpSpeed-BOOST')
                {   
                    // console.log('take jump Speed Boost')
                    takeJumpSpeed(_platform)
                }
                else if(_platform.desc.objectType == 'Bigjump')
                {   
                    // jumpDesc.current.jumpDistanceY = _platform.desc.jumpSize
                    // playerMovePressedEventHandlerCallB({key:'ArrowUp'})
                    stopAnimation('STAND');
                    jumpDesc.current.jumpDistanceY = _platform.desc.jumpSize
                    jumpDesc.current.jumpSpeed = 2;
                    move('TOP',jumpDesc.current.jumpSpeed,jumpDesc.current.jumpDistanceY);
                }
            }
        }
    let takeCoin = (elem)=>
        {
            playerCoinValue ++;
            coinObjectRef.current[elem.desc.objectToShowIndex].visible = false;
            _appContext.coinValueRef.current.innerText  = playerCoinValue;
        }
    let takeJumpDistance = (elem)=>
        {
            jumpDesc.current.jumpDistanceX = 3;
            jumpDesc.current.jumpDistanceY = 4;
            jumpDistanceBoostCounter += 5;
            jumpDistanceBosstActived = true;
            jumpObjectRef.current[elem.desc.objectToShowIndex].visible = false;
            _appContext.coinValueRef.current.innerText  = jumpDistanceBoostCounter;
        }
    let takeJumpSpeed = (elem)=>
        {
            jumpDesc.current.jumpSpeed = 0.5;
            jumpSpeedCounter += 10;
            jumpSpeedBoostActived = true;
            jumpSpeedObjectRef.current[elem.desc.objectToShowIndex].visible = false;
            _appContext.jumpspeedValueRef.current.innerText  = jumpSpeedCounter;
        }
    let slidePlatform = (elem,platformInfo)=>
        {
            let slideAnimation;
            let xTarget = mapPlane[platformInfo.desc.targetInMap].platformDirection == 'LEFT'? 2 : 10;
            slideAnimation =   gsap.to(elem.position,{
                x:xTarget,
                ease: "none",
                duration:0.3,
                onStart:()=>{
                    
                },
                onUpdate: ()=>{
                    
                    
                },
                onComplete:()=>{
                    slideAnimation.kill();
                    slideAnimation = null;
                    if(mapPlane[platformInfo.desc.targetInMap].platformDirection == 'RIGHT')
                    {
                        mapPlane[platformInfo.desc.targetInMap+1].active = true
                        mapPlane[platformInfo.desc.targetInMap].active = false
                    }
                    else
                    {
                        mapPlane[platformInfo.desc.targetInMap-1].active = true
                        mapPlane[platformInfo.desc.targetInMap].active = false

                    }
                }
                });
        }
    let playerMoveUpEventHandlerCallB = (evt)=>
        {
            if(evt.key == keyPressed)
            {
                keyIsPressed = false;
            }
        }
    

    useFrame((clock)=>
        {
            // console.log('o')
            if(_appContext.pauseScreenRef.current.style.display == 'block')
            {}
            else
            {
                for(let i =0;i<coinObjectRef.current.length;i++)
                {
                    coinObjectRef.current[i].rotation.y += 0.05;
                }
                for(let i =0;i<jumpObjectRef.current.length;i++)
                {
                    jumpObjectRef.current[i].rotation.y += 0.025;
                }
                for(let i =0;i<jumpSpeedObjectRef.current.length;i++)
                {
                    jumpSpeedObjectRef.current[i].rotation.y += 0.025;
                }
                for(let i =0;i<jumpBigObjectRef.current.length;i++)
                {
                    // jumpBigObjectRef.current[i].rotation.y += 0.025;
                    // jumpBigObjectRef.current[i].childern[0].material.uniforms.utime.value += 0.05;
                    // jumpBigObjectRef.current[i].material.color = new THREE.Color(0,0,1);
                    jumpBigObjectRef.current[i].children[0].material.uniforms.utime.value += 0.05;
                }
                for(let i =0;i<jumpSwitchObjectRef.current.length;i++)
                {
                    // jumpSwitchObjectRef.current[i].children[0].material.uniforms.utime.value += 0.05;
                }
            }
            
        })
    let searchForCoinToShow = (_index)=>
        {   
            let findFreeCoinObject = (elem)=>
                {
                    return elem.isUsed == false;
                }  
            let freeCoinObject = coinmodelInfo.find(findFreeCoinObject);
            coinObjectRef.current[freeCoinObject.index].visible = true;
            coinObjectRef.current[freeCoinObject.index].matrixAutoUpdate = true;
            coinObjectRef.current[freeCoinObject.index].position.x = mapPlane[_index].posX;
            coinObjectRef.current[freeCoinObject.index].position.z = mapPlane[_index].posZ;
            coinmodelInfo[freeCoinObject.index].isUsed = true;
            coinmodelInfo[freeCoinObject.index].currentLevel = level;
            mapPlane[_index].desc.objectToShowIndex = freeCoinObject.index;
        }
    let searchForJumpToShow = (_index)=>
        {   
            let findFreeCoinObject = (elem)=>
                {
                    return elem.isUsed == false;
                }  
            let freeJumpObject = jumpmodelInfo.find(findFreeCoinObject);
            jumpObjectRef.current[freeJumpObject.index].visible = true;
            jumpObjectRef.current[freeJumpObject.index].matrixAutoUpdate = true;
            jumpObjectRef.current[freeJumpObject.index].position.x = mapPlane[_index].posX;
            jumpObjectRef.current[freeJumpObject.index].position.z = mapPlane[_index].posZ;
            jumpmodelInfo[freeJumpObject.index].isUsed = true;
            jumpmodelInfo[freeJumpObject.index].currentLevel = level;
            mapPlane[_index].desc.objectToShowIndex = freeJumpObject.index;
            
            
        }
    let searchForJumpSpeedToShow = (_index)=>
        {   
            let findFreeJumpSpeedObject = (elem)=>
                {
                    return elem.isUsed == false;
                }  
            let freeJumpSpeedObject = jumpSpeedmodelInfo.find(findFreeJumpSpeedObject);
            // console.log(jumpSpeedObjectRef.current)
            jumpSpeedObjectRef.current[freeJumpSpeedObject.index].visible = true;
            jumpSpeedObjectRef.current[freeJumpSpeedObject.index].matrixAutoUpdate = true;
            jumpSpeedObjectRef.current[freeJumpSpeedObject.index].position.x = mapPlane[_index].posX;
            jumpSpeedObjectRef.current[freeJumpSpeedObject.index].position.z = mapPlane[_index].posZ;
            jumpSpeedmodelInfo[freeJumpSpeedObject.index].isUsed = true;
            jumpSpeedmodelInfo[freeJumpSpeedObject.index].currentLevel = level;
            mapPlane[_index].desc.objectToShowIndex = freeJumpSpeedObject.index;

        }
    let searchForBigJumpToShow = (_index)=>
        {   
            let findFreeJumpBigObject = (elem)=>
                {
                    return elem.isUsed == false;
                }  
            let freeBigjumpObject = jumpBigmodelInfo.find(findFreeJumpBigObject);
            
            jumpBigObjectRef.current[freeBigjumpObject.index].visible = true;
            jumpBigObjectRef.current[freeBigjumpObject.index].matrixAutoUpdate = true;
            jumpBigObjectRef.current[freeBigjumpObject.index].position.x = mapPlane[_index].posX;
            jumpBigObjectRef.current[freeBigjumpObject.index].position.z = mapPlane[_index].posZ;
            jumpBigmodelInfo[freeBigjumpObject.index].isUsed = true;
            jumpBigmodelInfo[freeBigjumpObject.index].currentLevel = level;
            mapPlane[_index].desc.objectToShowIndex = freeBigjumpObject.index;

        }
    let searchForSwitchToShow = (_index)=>
        {   
            let findFreeJumpBigObject = (elem)=>
                {
                    return elem.isUsed == false;
                }  
            let freeBigjumpObject = jumpSwitchmodelInfo.find(findFreeJumpBigObject);
            
            jumpSwitchObjectRef.current[freeBigjumpObject.index].visible = true;
            jumpSwitchObjectRef.current[freeBigjumpObject.index].matrixAutoUpdate = true;
            jumpSwitchObjectRef.current[freeBigjumpObject.index].position.x = mapPlane[_index].posX;
            jumpSwitchObjectRef.current[freeBigjumpObject.index].position.z = mapPlane[_index].posZ;
            jumpSwitchmodelInfo[freeBigjumpObject.index].isUsed = true;
            jumpSwitchmodelInfo[freeBigjumpObject.index].currentLevel = level;
            mapPlane[_index].desc.objectToShowIndex = freeBigjumpObject.index;

        }
    let clearPreviousObject = ()=>
        {
            for(let i =0;i<jumpmodelInfo.length;i++)
            {
                if(jumpmodelInfo[i].isUsed && jumpmodelInfo[i].currentLevel == (level-1) )
                {
                    jumpmodelInfo[i].isUsed = false;
                    jumpmodelInfo[i].currentLevel = 0;

                    jumpObjectRef.current[jumpmodelInfo[i].index].visible = false;
                    jumpObjectRef.current[jumpmodelInfo[i].index].matrixAutoUpdate = false;
                    
                }
            }
            for(let i =0;i<jumpSpeedmodelInfo.length;i++)
            {
                if(jumpSpeedmodelInfo[i].isUsed && jumpSpeedmodelInfo[i].currentLevel == (level-1) )
                {
                    jumpSpeedmodelInfo[i].isUsed = false;
                    jumpSpeedmodelInfo[i].currentLevel = 0;

                    jumpSpeedObjectRef.current[jumpSpeedmodelInfo[i].index].visible = false;
                    jumpSpeedObjectRef.current[jumpSpeedmodelInfo[i].index].matrixAutoUpdate = false;
                    
                }
            }
            for(let i =0;i<jumpBigmodelInfo.length;i++)
            {
                if(jumpBigmodelInfo[i].isUsed && jumpBigmodelInfo[i].currentLevel == (level-1) )
                {
                    jumpBigmodelInfo[i].isUsed = false;
                    jumpBigmodelInfo[i].currentLevel = 0;

                    jumpBigObjectRef.current[jumpBigmodelInfo[i].index].visible = false;
                    jumpBigObjectRef.current[jumpBigmodelInfo[i].index].matrixAutoUpdate = false;
                    
                }
            }
            for(let i =0;i<jumpSwitchmodelInfo.length;i++)
            {
                if(jumpSwitchmodelInfo[i].isUsed && jumpSwitchmodelInfo[i].currentLevel == (level-1) )
                {
                    jumpSwitchmodelInfo[i].isUsed = false;
                    jumpSwitchmodelInfo[i].currentLevel = 0;

                    jumpSwitchObjectRef.current[jumpSwitchmodelInfo[i].index].visible = false;
                    jumpSwitchObjectRef.current[jumpSwitchmodelInfo[i].index].matrixAutoUpdate = false;
                    
                }
            }
            for(let i =0;i<coinmodelInfo.length;i++)
            {
                if(coinmodelInfo[i].isUsed && coinmodelInfo[i].currentLevel == (level-1) )
                {
                    coinmodelInfo[i].isUsed = false;
                    coinmodelInfo[i].currentLevel = 0;

                    coinObjectRef.current[coinmodelInfo[i].index].visible = false;
                    coinObjectRef.current[coinmodelInfo[i].index].matrixAutoUpdate = false;
                    
                }
            }
           
        }
    let addObjectsToPlatform = ()=>
        {   let objectIndex = 0;
            for(let i =(platformLength*(level-1));i<mapPlane.length;i++)
                {
                    if(objectIndex == 0)
                    {
                        platformOrder[level-1].current.children[objectIndex].material.color = new THREE.Color(1,0,0);
                    }
                    if(objectIndex == platformMid+1)
                    {
                        platformOrder[level-1].current.children[objectIndex].material.wireframe = false;
                        platformOrder[level-1].current.children[objectIndex].material.color = new THREE.Color(1,1,1);
                    }
                    if(mapPlane[i].hasObject)
                    {
                        if(mapPlane[i].desc.objectType == 'coin')
                        {   
                            
                            searchForCoinToShow(i)
                
                        }
                        else if(mapPlane[i].desc.objectType == 'jumpDistance-BOOST')
                        {
                            searchForJumpToShow(i)
                
                        }
                        else if(mapPlane[i].desc.objectType == 'jumpSpeed-BOOST')
                        {   
                            searchForJumpSpeedToShow(i)
                
                        }
                        else if(mapPlane[i].desc.objectType == 'switch')
                        {   
                            
                            searchForSwitchToShow(i)
                                // platformOrder[level-1].current.children[mapPlane[i].desc.platformIndex].material.color = new THREE.Color(1,1,1);
                                    
                        }
                        else if(mapPlane[i].desc.objectType == 'Bigjump')
                        {   
                            searchForBigJumpToShow(i)
                                // platformOrder[level-1].current.children[mapPlane[i].desc.platformIndex].material.wireframe = false;
                                    
                        }
                    }
                    objectIndex++;
                }
                
              
        }
    let pauseForGameOver = ()=>
        {
            pauseAnimation();
        }
        
    useEffect(()=>
        {   
            if( _appContext.devMode.current)
            {
                _appContext.guiRef.current.innerText =jumpDesc.current.jumpSpeed;
                _appContext.guiRef2.current.innerText =jumpDesc.current.jumpDistanceY;
                _appContext.guiRef3.current.innerText =jumpDesc.current.jumpDistanceX;
    
            }

            _appContext.loadingScreenRef.current.style.display = 'none'
            addObjectsToPlatform();
        })
    useEffect(()=>
        {  
            _appContext.pauseAnimationFunc.current = ()=>{pauseAnimation()};
            _appContext.resumeAnimationFunc.current = ()=>{resumeAnimation()};
            _appContext.leftButtonFunc.current = ()=>{playerMovePressedEventHandlerCallB({key:'ArrowLeft'})};
            _appContext.leftButtonFuncEnd.current = ()=>{playerMoveUpEventHandlerCallB({key:'ArrowLeft'})};
            _appContext.upButtonFunc.current = ()=>{playerMovePressedEventHandlerCallB({key:'ArrowUp'})};
            _appContext.upButtonFuncEnd.current = ()=>{playerMoveUpEventHandlerCallB({key:'ArrowUp'})};
            _appContext.rigthButtonFunc.current = ()=>{playerMovePressedEventHandlerCallB({key:'ArrowRight'})};
            _appContext.rigthButtonFuncEnd.current = ()=>{playerMoveUpEventHandlerCallB({key:'ArrowRight'})};
            window.addEventListener('keydown',playerMovePressedEventHandlerCallB,true);
            window.addEventListener('keyup',playerMoveUpEventHandlerCallB,true);
            jumpAnimation();


            platformGroup2Ref.current.position.z = platformGroup1Ref.current.children[mapPlane.length-1].position.z+6;

            return ()=>
                {
                    window.removeEventListener('keydown',playerMovePressedEventHandlerCallB,true);
                    window.removeEventListener('keyup',playerMoveUpEventHandlerCallB,true);

                    stopAnimation('STAND')
                    stopAnimation('CAMERA-MOVE')
                    stopAnimation('ORBIT-MOVE')
                    stopAnimation('PLAYER-MOVE')
                    
                }
        },[])
      
    return <>
            <PerspectiveCamera ref={cameraRef} position={[cameraPosition.x,cameraPosition.y,cameraPosition.z]} makeDefault/>
            <OrbitControls 
            // enablePan={false} enableRotate={false} enableZoom={false} 
            ref={orbitRef} target={[orbitPosition.x,orbitPosition.y,orbitPosition.z]} />
            <group>
                {/* <mesh ref={playerRef} position={[2,1.5,2]} >
                    <boxGeometry args={[0.5,3,1]} />
                    <meshBasicMaterial color={'red'} />
                </mesh> */}
                <PlayerModel _ref={playerRef} position={[2,1.5,2]} />
                <group
                    
                    ref={platformGroup1Ref} 
                >
                    {modelContainer}
                </group>
                <group
                    visible={false}
                    ref={platformGroup2Ref} 
                >
                    {modelContainer}
                </group>
                

            </group>
            {coinmodelContainer}
            {jumpmodelContainer}
            {jumpSpeedmodelContainer}
            {jumpBigmodelContainer}
            {jumpSwitchmodelContainer}
            <Text
                            
                ref={platformCounter}     
                characters='1234567890'
                visible={false}
                fontSize={2.5} fontWeight={700}
                rotation={[Math.PI*0.2,-(Math.PI),0]}
                position={[mapPlane[0].posX,0.8,mapPlane[0].posZ-0.4]} color={'white'} anchorX={"center"} anchorY={"middle"}
                >
                {mapPlane[0].counter}
            </Text>
            </>
}