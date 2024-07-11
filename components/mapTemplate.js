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
    let row = 100;
    let arrLevel = level -1;
    let lastPosZ = 0;

    if(level == 1)
    {
        // coinLevelObject = [Math.floor(Math.random()*5)+2];
        // jumpDistanceLevelObject = [Math.floor(Math.random()*3)+8];
        // coinLevelObject = [3];
        jumpDistanceLevelObject = [8];
        jumpSpeedLevelObject = [5]
        switchLevelObject = [{trigger:3,target:4}];
    }
    else if(level >= 2)
    {
        // coinLevelObject = [Math.floor(Math.random()*5)];
        // jumpDistanceLevelObject = [Math.floor(Math.random()*10),Math.floor(Math.random()*6)+10];
        jumpDistanceLevelObject = [8];
        jumpSpeedLevelObject = [5]
        switchLevelObject = [{trigger:8,target:15}];

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
                     active:_active,
                     platformDirection:platformDirection,
                     hasObject:false,
                     desc:{objectType:'none',objectToShowIndex:'none'},
                     posX:xPos,
                     posZ:zPos+lastPosZ
                    };

        for(let i1 =0; i1 <coinLevelObject.length;i1++)
        {
            if(coinLevelObject[i1] == i)
            {
                result[i].hasObject = true;
                result[i].desc.objectType = 'coin';    
            }
        }
        for(let i1 =0; i1 <jumpDistanceLevelObject.length;i1++)
        {
            if(jumpDistanceLevelObject[i1] == i)
            {
                result[i].hasObject = true;
                result[i].desc.objectType = 'jumpDistance-BOOST';
            }
        }
        for(let i1 =0; i1 <jumpSpeedLevelObject.length;i1++)
        {
            if(jumpSpeedLevelObject[i1] == i)
            {
                result[i].hasObject = true;
                result[i].desc.objectType = 'jumpSpeed-BOOST';
            }
        }
        for(let i1 =0; i1 <switchLevelObject.length;i1++)
        {
            if(switchLevelObject[i1].trigger == i)
            {
                result[i].hasObject = true;
                result[i].desc.objectType = 'switch';
                result[i].desc.platformIndex = switchLevelObject[i1].trigger;
                result[i].desc.levelOwned = arrLevel;
                result[i].desc.target = switchLevelObject[i1].target;
            }
        }
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

    return result;
}

//On va generer en même tous les objets qui seront utilisé par le jeux

export function generateMapObject()
{
    let result=[];
    for(let i =0; i<30;i++)
        {
            
            result[i] = {id:i,visible:false,type:'coin'};
            
        }
    
        return result;
}
// export let mapPlane = [{id:0,posX:2,posZ:2},{id:0,posX:10,posZ:2},
//                 {id:0,posX:2,posZ:10},{id:0,posX:10,posZ:10}
// ]