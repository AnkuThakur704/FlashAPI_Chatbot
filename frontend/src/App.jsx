import { useState } from 'react'
import './App.css'
import ReactMarkdown from "react-markdown"
function App() {
  // const [aiRes, setaiRes] = useState([])
  const fetchres = async(quer)=>{
    console.log("start")
    const res = await fetch(`https://flashapi-chatbot-1.onrender.com/api/routes/gemini?msg=${quer}`)
    const data  = await res.text()
    setconvo(prev=>[...prev,{role:"ai",text:data.toString()}])
    console.log(convo)
    console.log("end")
  }
  const [convo, setconvo] = useState([])
  const [msg, setmsg] = useState([])
  const handleclick= ()=> {
   setconvo(prev=>[...prev,{role:"user",text:msg[msg.length-1]}])
   fetchres(msg[msg.length-1])
   setmsg([""])
  }
  function handlechange(message) {
   
    setmsg([...msg,message  ])
   
  } 
  return (
    <>
      <div className=' w-screen h-screen flex flex-col items-center'>
        <div className='text-white font-light text-2xl mt-[1vh]'>
          <div className='flex items-center font-[500] text-pink-400'>Flash
            <img className='h-[3vh]' src="./public/logo.svg" alt="" />
            API
          </div>
        </div>
        <div className='h-[85vh] md:w-[50vw] w-[95vw] rounded-2xl overflow-y-auto overflow-x-hidden'>
          {convo.map((item,i)=>{
            if(item.role==="user"){
              return(
              <p className='text-white w-fit md:max-w-[48vw] w-[98vw] min-h-[3vh] h-fit px-[1vw] p-[1vh] text-sm rounded-xl mb-[20px] border border-gray-400 bg-gray-600' key={i}>{item.text}</p>
            )
            }
            else if(item.role==="ai"){
               return(
                <div key={i} className='text-white w-fit min-h-[3vh] h-fit px-[1vw] p-[1vh] text-sm rounded-xl mb-[20px] border border-green-400 bg-gray-800'>
            <ReactMarkdown  >{item.text}</ReactMarkdown>
          </div>
              )
            }
            
          })}      
        </div>
        <div className='flex gap-1.5 items-center mt-[1vh]'>
          <input type="text" placeholder='Ask "explain multiverse"' className='border border-gray-400 p-1.75 rounded-2xl min-w-[30vw] focus:outline-none text-gray-500 text-sm focus:text-gray-500 focus:text-sm' autoComplete='off' autoCorrect='on' autoCapitalize='off' spellCheck={false} value={msg[msg.length-1]} onChange={(e)=>{handlechange(e.target.value)}}/>
          <button type="button" className="text-white h-fit overflow-y-auto bg-blue-500 box-border border border-transparent hover:bg-blue-600-strong   shadow-xs hover:bg-blue-600 hover:cursor-pointer font-medium leading-5 rounded-2xl text-sm px-4 py-2 focus:outline-none" name='message' onClick={handleclick}>Ask</button>
        </div>
      </div>
    </>
  )
}

export default App
