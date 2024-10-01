import { useContext, useEffect, useRef } from "react"
import { appContext } from "../src/App"

export function TitleScreen()
{
    let _appContext = useContext(appContext);
    return  <div
                style={{backgroundImage:'linear-gradient(180deg, hsl(150deg 100% 20%) 0%, hsl(135deg 59% 26%) 11%, hsl(118deg 45% 29%) 22%, hsl(103deg 52% 28%) 33%, hsl(91deg 59% 27%) 44%, hsl(82deg 66% 26%) 56%, hsl(74deg 75% 25%) 67%, hsl(67deg 85% 24%) 78%, hsl(61deg 94% 23%) 89%, hsl(55deg 100% 25%) 100%)'}}
                className="w-full h-full bg-blue-500 absolute left-0 top-0 z-[3] "
            >
                    <div
                        id={'TITLE'} 
                    className={`w-full max-w-[400px] h-[200px] mx-auto `} >
                        <img className="w-full h-full" src="titlepic.png" alt="title" />
                    </div>
                    <MenuButton func={_appContext.startGame} img={'bouton_play_new.png'} />
                    <div
                        className="flex justify-center mt-[35px] "
                    >

                        <MenuButtonSecond>
                                <svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 8.25A3.75 3.75 0 1 0 15.75 12 3.761 3.761 0 0 0 12 8.25ZM20.094 12c-.002.35-.027.7-.076 1.047l2.282 1.787a.543.543 0 0 1 .123.693l-2.159 3.727a.546.546 0 0 1-.663.231l-2.683-1.078a8.27 8.27 0 0 1-1.82 1.063l-.401 2.85a.56.56 0 0 1-.54.461H9.84a.562.562 0 0 1-.54-.447l-.4-2.849a7.94 7.94 0 0 1-1.82-1.063L4.396 19.5a.545.545 0 0 1-.663-.23l-2.159-3.728a.543.543 0 0 1 .123-.692l2.283-1.787A8.182 8.182 0 0 1 3.903 12c.002-.35.027-.7.077-1.047L1.697 9.166a.543.543 0 0 1-.123-.693l2.16-3.727a.546.546 0 0 1 .662-.231L7.08 5.593A8.276 8.276 0 0 1 8.9 4.53l.4-2.85a.56.56 0 0 1 .54-.461h4.318a.563.563 0 0 1 .54.446l.4 2.85c.653.271 1.266.63 1.823 1.063L19.602 4.5a.546.546 0 0 1 .663.23l2.16 3.728a.543.543 0 0 1-.124.693l-2.282 1.787c.048.352.074.707.076 1.062Z" />
                                </svg>
                        </MenuButtonSecond>
                        <MenuButtonSecond>
                                <svg fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
                                        <path d="M12 16v-4" />
                                        <path d="M12 8h.01" />
                                    </svg>
                        </MenuButtonSecond>
                        
                    </div>
            </div>
}

export function MenuButtonSecond(props)
{
    return  <div
            onClick={props.func}  
            className="mx-[20px] cursor-pointer bg-gray-500 w-[60px] h-[60px] rounded-full p-[5px] ">
                {props.children}
            </div>
}

function MenuButton(props)
{
    return  <div
                id={'PLAY BUTTON'}
                onClick={props.func} 
                className={`  mt-[30px] cursor-pointer w-[150px] h-[50px] mx-auto `} >
                <img className="w-full h-full" src={props.img} alt="play" />
            </div>
}

export function PauseButton(props)
{
    let _appContext = useContext(appContext);
    return  <div
            onClick={_appContext.togglePauseScreen}  
            className="absolute z-[4] right-[10px] top-[10px] cursor-pointer bg-gray-500 w-[50px] h-[50px] rounded-full p-[5px] ">
                <svg fill="none" stroke="#ffffff" strokeLinecap="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12c0-4.969-4.031-9-9-9s-9 4.031-9 9 4.031 9 9 9 9-4.031 9-9Z" />
                    <path d="M9.75 9v6" />
                    <path d="M14.25 9v6" />
                </svg>
            </div>
}

export function PauseScreen(props)
{
    let _appContext = useContext(appContext);
    return <div              
                ref={_appContext.pauseScreenRef}
                className="hidden w-full h-full bg-black/80 absolute left-[0] top-[0] z-[3] ">
                        <div>PAUSE</div>
                        <MenuButton func={()=>{_appContext.togglePauseScreen()}} img={'bouton_resume_new.png'} />
                        <MenuButton func={()=>{_appContext.restartGame()}} img={'bouton_restart_new.png'} />
                        <MenuButton func={()=>{_appContext.quitGame()}} img={'bouton_quit_new.png'} />
                </div>
}

export function LoadingScreen(props)
{
    let _appContext = useContext(appContext);
    return <div              
                ref={_appContext.loadingScreenRef}
                className="text-white text-center flex flex-col justify-center text-[1.5rem] w-full h-full bg-black absolute left-[0] top-[0] z-[10] ">
                        CHARGEMENT...
                </div>
}
export function GameOverScreen(props)
{
    let _appContext = useContext(appContext);
    return <div              
                ref={_appContext.gameOverScreenRef}
                className="hidden text-white text-[2rem] w-full h-full bg-black/80 absolute left-[0] top-[0] z-[9] ">
                        <div className="text-center">GAME OVER</div>
                        <MenuButton func={()=>{_appContext.restartGame()}} img={'bouton_restart_new.png'} />
                        <MenuButton func={()=>{_appContext.quitGame()}} img={'bouton_quit_new.png'} />

                </div>
}
export function GuiContainer(props)
{
    let _appContext = useContext(appContext);
    useEffect(()=>
        {
            // _ref.current.innerText = _appContext.gui_jumpDesc.current.jumpSpeed;
            
        },[])
    return      <div              
               
                className=" opacity-70 w-[250px] p-[5px] text-white absolute z-[12] left-[0] top-[0] bg-blue-500/50 ">
                        <div
                            className="flex justify-between  "
                        >
                                <div>JumpSpeed</div>
                                <div
                                    ref={_appContext.guiRef} 
                                ></div>
                                <div>
                                    <input onChange={(e)=>{_appContext.gui_jumpDesc.current.jumpSpeed =  _appContext.guiRef.current.innerText = e.target.value}} className="w-[30px] text-black " type="number" />
                                </div>
                                
                        </div>
                        <div
                            className="flex justify-between mt-[20px]  "
                        >
                                <div>JumpDistance Y</div>
                                <div
                                    ref={_appContext.guiRef2} 
                                ></div>
                                <div>
                                    <input onChange={(e)=>{_appContext.gui_jumpDesc.current.jumpDistanceY =  _appContext.guiRef2.current.innerText = e.target.value}} className="w-[30px] text-black " type="number" />
                                </div>
                                
                        </div>
                        <div
                            className="flex justify-between mt-[20px]  "
                        >
                                <div>JumpDistance X</div>
                                <div
                                    ref={_appContext.guiRef3} 
                                ></div>
                                <div>
                                    <input onChange={(e)=>{_appContext.gui_jumpDesc.current.jumpDistanceX =  _appContext.guiRef3.current.innerText = e.target.value}} className="w-[30px] text-black " type="number" />
                                </div>
                                
                        </div>
                        
                </div>
}