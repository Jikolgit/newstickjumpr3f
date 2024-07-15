export function createMapPlane(level,type,lastPlatformPos)
{
    let result = [];
    let _active = true,_firstStepactiveCount = 0,_secondStepactiveCount = 0;
    let platformDirection = 'LEFT';
    let xRightPos = 2,xLeftPos = 10;
    let xPos = xRightPos,zPos = 2;
    let coinLevelObject = [];
    let jumpDistanceLevelObject = [];
    let jumpSpeedLevelObject = [];
    let switchLevelObject = [];
    let bigJumpLevelObject = [];
    let row = 100;
    let arrLevel = level -1;
    let lastPosZ = 0;
    
    if(level == 1)
    {
        // coinLevelObject = [Math.floor(Math.random()*5)+2];
        // jumpDistanceLevelObject = [Math.floor(Math.random()*3)+8];
        // coinLevelObject = [3];

        // jumpDistanceLevelObject = [8];
        // jumpSpeedLevelObject = [4,7,8]
        // switchLevelObject = [{trigger:59,target:60}];
        // bigJumpLevelObject = [{start:52,size:4}];
    }
    else if(level >= 2)
    {

        // jumpDistanceLevelObject = [8];
        // jumpSpeedLevelObject = [5]
        // switchLevelObject = [{trigger:8,target:15}];

        switchLevelObject = [{trigger:59,target:60}];
        bigJumpLevelObject = [{start:52,size:4}];

    }
    if(type == 'NEXT')
    {
        zPos = 8;
        lastPosZ = lastPlatformPos;
    }
    // zPos = 2+(row*arrLevel);
    for(let i =0; i<row;i++)
    {
        platformDirection = platformDirection == 'LEFT'? 'RIGHT' : 'LEFT';
        result[i] = {
                     id:i+(row*arrLevel),
                     counter:Math.floor(Math.random()*3)+3,
                     active:_active,
                     platformDirection:platformDirection,
                     hasObject:false,
                     desc:{objectType:'none',objectToShowIndex:'none'},
                     posX:xPos,
                     posZ:zPos+lastPosZ
                    };

        // for(let i1 =0; i1 <coinLevelObject.length;i1++)
        // {
        //     if(coinLevelObject[i1] == i)
        //     {
        //         result[i].hasObject = true;
        //         result[i].desc.objectType = 'coin';    
        //     }
        // }
        // for(let i1 =0; i1 <jumpDistanceLevelObject.length;i1++)
        // {
        //     if(jumpDistanceLevelObject[i1] == i)
        //     {
        //         result[i].hasObject = true;
        //         result[i].desc.objectType = 'jumpDistance-BOOST';
        //     }
        // }
        // for(let i1 =0; i1 <jumpSpeedLevelObject.length;i1++)
        // {
        //     if(jumpSpeedLevelObject[i1] == i)
        //     {
        //         result[i].hasObject = true;
        //         result[i].desc.objectType = 'jumpSpeed-BOOST';
        //     }
        // }
        // for(let i1 =0; i1 <switchLevelObject.length;i1++)
        // {
        //     if(switchLevelObject[i1].trigger == i)
        //     {
        //         result[i].hasObject = true;
        //         result[i].desc.objectType = 'switch';
        //         result[i].desc.platformIndex = switchLevelObject[i1].trigger;
        //         result[i].desc.levelOwned = arrLevel;
        //         result[i].desc.target = switchLevelObject[i1].target;
        //         result[i].desc.targetInMap = switchLevelObject[i1].target+(row*arrLevel);
        //     }
        // }
        // for(let i1 =0; i1 <bigJumpLevelObject.length;i1++)
        // {
        //     if(bigJumpLevelObject[i1].start == i)
        //     {
        //         result[i].hasObject = true;
        //         result[i].desc.objectType = 'Bigjump';
        //         result[i].desc.platformIndex = bigJumpLevelObject[i1].start;
        //         result[i].desc.jumpSize =bigJumpLevelObject[i1].size;
        //     }
        // }
        if(i<3)
        {
            if(!_active)
            {
                _firstStepactiveCount++;
                if(_firstStepactiveCount == 2){_active = true,_firstStepactiveCount = 0}
            }
            else if(_active){_active = false;}
            if(i == 2)
            {
                _firstStepactiveCount = 0
            }
        }
        else
        {
            if(_active)
            {
                _firstStepactiveCount++;
                if(_firstStepactiveCount == 2){_active = false,_firstStepactiveCount = 0,_secondStepactiveCount =0}
            }
            else
            {
                _secondStepactiveCount++
                if(_secondStepactiveCount == 2){_active = true,_firstStepactiveCount = 0,_secondStepactiveCount =0}
            }
        }
        zPos = xPos == 10? zPos+8 : zPos;
        xPos = xPos == 2? 10 : 2;

    }
    
    let addObjectToPlatform = (elem)=>
        {
            
            let jumpDistanceLevelObject = [];
            let objectPosition;
            
            let getFreePlatform = (_objects)=>
                {   //GENERE PLATFORMES DISPONIBLES
                    objectPosition = Math.floor(Math.random()*elem.length);
                    
                    if(objectPosition > 4 && objectPosition < 80)
                    {   
                        getFreePlatformActive(_objects);
                    }
                    else
                    {
                        //ON RECOMMENCE
                        // console.log(objectPosition+' essai')
                        getFreePlatform(_objects);
                    }
                }
            let getFreePlatformForPlatformEffect = (_objects)=>
                {   //GENERE PLATFORMES DISPONIBLES
                    objectPosition = Math.floor(Math.random()*elem.length);
                    
                    if(objectPosition > 4 && objectPosition < 80)
                    {   
                        
                        getFreePlatformActiveForPlatformEffect(_objects);
                    }
                    else
                    {

                        getFreePlatformForPlatformEffect(_objects);
                    }
                }
            let getFreePlatformActive = (_objects)=>
                {
                    //GENERE PLATFORMES DISPONIBLES ET ACTIVE
                    if(elem[objectPosition].active == false)
                    {
                        // console.log(objectPosition+' essai actives')
                        getFreePlatform(_objects)
                    }
                    else
                    {
                        if(elem[objectPosition].desc.objectType == "none")
                        {
                            
                            if(_objects == 'jumpDistance-BOOST')
                            {
                                elem[objectPosition].hasObject = true;
                                elem[objectPosition].desc.objectType = 'jumpDistance-BOOST';
                            }
                            else if(_objects == 'jumpSpeed-BOOST')
                            {   
                                // console.log(objectPosition)
                                elem[objectPosition].hasObject = true;
                                elem[objectPosition].desc.objectType = 'jumpSpeed-BOOST';
                            }
                            else if(_objects == 'coin')
                            {   
                                // console.log(objectPosition)
                                elem[objectPosition].hasObject = true;
                                elem[objectPosition].desc.objectType = 'coin';
                            }
                            
                        }
                        else
                        {
                            getFreePlatform(_objects);
                        }
                        
                            
                    }

                }
            let getFreePlatformActiveForPlatformEffect = (_objects)=>
                    {
                        let generateSwitchTarget = ()=>
                            {
                                let value = Math.floor(Math.random()*7)+2;
                              
                                if(elem[value+objectPosition].active == false)
                                {
                                    generateSwitchTarget();
                                }
                                else
                                {
                                    elem[objectPosition].desc.target = value+objectPosition;
                                }
                                
                            }
                        //GENERE PLATFORMES DISPONIBLES ET ACTIVE
                        if(elem[objectPosition].active == false)
                        {
                            // console.log(objectPosition+' essai actives')
                            getFreePlatformForPlatformEffect(_objects)
                        }
                        else
                        {
                            if(elem[objectPosition].desc.objectType == "none")
                            {
                                if(_objects =='Bigjump' )
                                {
                                    elem[objectPosition].hasObject = true;
                                    elem[objectPosition].desc.objectType = 'Bigjump';
                                    elem[objectPosition].desc.platformIndex = objectPosition;
                                    elem[objectPosition].desc.jumpSize =12;
                                }
                                else if(_objects == 'switch')
                                {
                                elem[objectPosition].hasObject = true;
                                elem[objectPosition].desc.objectType = 'switch';
                                elem[objectPosition].desc.platformIndex = objectPosition;
                                elem[objectPosition].desc.levelOwned = arrLevel;
                                generateSwitchTarget();
                                elem[objectPosition].desc.targetInMap = elem[objectPosition].desc.target+(row*arrLevel);
                                }
                                
                                                
                            }
                            else
                            {
                                getFreePlatformForPlatformEffect(_objects);
                            }
                            
                                
                        }
    
                    }
            
                // if(level > 2)
                // {
                //     for(let i1 =0; i1 <3;i1++)
                //         {
                //             getFreePlatform('jumpDistance-BOOST');
                //         }
                // }

                for(let i1 =0; i1 <3;i1++)
                {
                    getFreePlatform('jumpDistance-BOOST');
                }
                for(let i1 =0; i1 <14;i1++)
                {
                    getFreePlatform('coin');
                }
                for(let i1 =0; i1 <1;i1++)
                {
                    getFreePlatformForPlatformEffect('Bigjump');
                }
                for(let i1 =0; i1 <3;i1++)
                {
                    getFreePlatform('jumpSpeed-BOOST');
                }
                for(let i1 =0; i1 <3;i1++)
                {
                    getFreePlatformForPlatformEffect('switch')
                }
                
                // elem[3].hasObject = true;
                // elem[3].desc.objectType = 'Bigjump';
                // elem[3].desc.platformIndex = 3;
                // elem[3].desc.jumpSize =12;
            

        }
        // console.log(result)
        addObjectToPlatform(result);
    return result;
}

//On va generer en même tous les objets qui seront utilisé par le jeux

export function generateMapObject(elem)
{
    let result=[];
    
    for(let i =0; i<30;i++)
        {
            
            result[i] = {id:i,visible:false,type:'coin'};
            
        }
    
        return result;
}
//ALGO GENERER MAP
//GENERER DABORD LA MAP
//AJOUTER LES OBJETS RANDOM