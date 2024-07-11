import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { GameRender } from '../components/gamerender'
import { LoadingScreen, PauseButton, PauseScreen, TitleScreen } from '../components/gameScreen'

export let appContext = createContext(null)
function App() {
  const [count, setCount] = useState(0);
  let [gameState,setGameState] = useState('Play');
  let pauseScreenRef = useRef(null);
  let upButtonFunc = useRef(null);
  let upButtonFuncEnd = useRef(null);
  let leftButtonFunc = useRef(null);
  let leftButtonFuncEnd = useRef(null);
  let rigthButtonFunc = useRef(null);
  let rigthButtonFuncEnd = useRef(null);
  let coinValueRef = useRef(null);
  let scoreValueRef = useRef(null);
  let jumpspeedValueRef = useRef(null);
  let jumpx2ValueRef = useRef(null);
  let testRef = useRef(null);

  let togglePauseScreen = ()=>{pauseScreenRef.current.style.display = pauseScreenRef.current.style.display == 'block'? 'none' : 'block' }

  let restartGame = ()=>
     {
        setGameState('loading');
        setTimeout(()=>{setGameState('Play')},250);
     }
  let quitGame = ()=>
    {
      setGameState('title');
    }
  return (
    <>
        <appContext.Provider
          value={{upButtonFunc,upButtonFuncEnd,leftButtonFunc,leftButtonFuncEnd,rigthButtonFunc,rigthButtonFuncEnd,
                  coinValueRef,scoreValueRef,jumpspeedValueRef,jumpx2ValueRef,setGameState,pauseScreenRef,togglePauseScreen,restartGame,
                  quitGame
          }}
        >
            <style>
                {`
                  .bColor
                  {
                    color:white
                  }
                  
                `}
            </style>
            <div
                className={`absolute w-full max-w-[600px] h-[500px] bg-black`}
            >
                {gameState == "Play" && <GamePlay />}
                {gameState == 'title' && <TitleScreen />}
                {gameState == 'loading' && <LoadingScreen />}
            </div>
            
        </appContext.Provider>
    </>
  )
}

function GamePlay()
{
  let _appContext = useContext(appContext);
  return <>
                <Canvas>
                    <axesHelper  args={[10]}/>
                    <GameRender />
                </Canvas>
                <div
                    id='CONTROL BUTTON'
                    className={`w-[250px] h-[50px] absolute z-[1] left-[0] right-[0] mx-auto bottom-[10px]
                              flex justify-between `}
                >

                      <div
                        onTouchStart={()=>{_appContext.leftButtonFunc.current()}}
                        onTouchEnd={()=>{_appContext.leftButtonFuncEnd.current()}}
                        className={`w-[50px] h-[50px] bg-red-500 `}
                      ></div>
                      <div
                        onTouchStart={()=>{_appContext.upButtonFunc.current()}}
                        onTouchEnd={()=>{_appContext.upButtonFuncEnd.current()}}
                        className={`w-[50px] h-[50px] bg-red-500 `}
                      ></div>
                      <div
                        onTouchStart={()=>{_appContext.rigthButtonFunc.current()}}
                        onTouchEnd={()=>{_appContext.rigthButtonFuncEnd.current()}}
                        className={`w-[50px] h-[50px] bg-red-500 `}
                      ></div>
                </div>
                <PauseScreen />
                <PauseButton />
                <GameValueContainer icon='score' order={1} _ref={_appContext.scoreValueRef} />
                <GameValueContainer icon='coin' order={2} _ref={_appContext.coinValueRef} />
                <GameValueContainer icon='speed' order={3} _ref={_appContext.jumpspeedValueRef} />
                <GameValueContainer icon='jumpx2' order={4} _ref={_appContext.jumpx2ValueRef} />
         </>
}

function GameValueContainer(props)
  {
    let imgLink ="coinicon.png";
    let classValue;
    if(props.icon == 'coin'){imgLink ="coinicon.png";}
    else if(props.icon == 'score'){imgLink ="scoreicon.png"}
    else if(props.icon == 'speed'){imgLink ="speedicon.png"}
    else if(props.icon == 'jumpx2'){imgLink ="jumpx2.png"}
    if(props.order == 1){classValue = "h-[40px] absolute left-[0] top-[10px] bg-[#222322] pl-[5px] pr-[10px] rounded-r-[25px] flex "}
    else if(props.order == 2){classValue = "h-[40px] absolute left-[0] top-[60px] bg-[#222322] pl-[5px] pr-[10px] rounded-r-[25px] flex "}
    else if(props.order == 3){classValue = "h-[50px] absolute left-[-5px] top-[110px] bg-[#222322] py-[5px] pl-[5px] pr-[10px] rounded-r-[25px] flex border-[1px] border-yellow-500 "}
    else if(props.order == 4){classValue = "h-[50px] absolute left-[-5px] top-[170px] bg-[#222322] py-[5px] pl-[5px] pr-[10px] rounded-r-[25px] flex border-[1px] border-yellow-500 "}

    
    return <div 
              id='COIN CONTAINER'
              className={classValue} >
                  <img className='w-[40px] ' src={imgLink} alt="scoreicon" />
                  <div id="COIN VALUE"
                      className={`text-white text-[1.7rem] ml-[5px] `}
                      ref={props._ref}
                        >0</div>
          </div>
  }
export default App
