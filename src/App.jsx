import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
    import { GoogleGenerativeAI } from "@google/generative-ai";
import './App.css'

function App() {
  let[essay,setessay] = useState("");
      let [data,setdata] = useState(0);
      function wordscount(e){
              let x=e.target.value.trim();
              setessay(x);
              if(x.length==0){
                setdata(0);
                return;
              }
              let arr=x.split(" ");
              setdata(arr.length);
      }
      let[data2, setdata2] = useState(0);
      function backspacecount(e){
          if(data!=0 && (e.key==='Backspace' || e.key==='Delete')){
            data2++;
            setdata2(data2);
          }
      }
      let[data3,setdata3] = useState(0);
      function charcount(e){
           let y=e.target.value;
           if(y=="") {
            setdata3(0);
            return;
           }
             let matches = y.match(/[a-zA-Z0-9]/g);
        let count = matches ? matches.length : 0;
          setdata3(count);
      }
      const genAI = new GoogleGenerativeAI("AIzaSyCMUelTuvLjROfWxPpejde4zflhVQg9iZI");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  async function generate (prompt){
    const result = await model.generateContent(prompt);
  return result.response.text();
  }
const [feedback, setfeedback] = useState("");

 async function analyze(){
  const prompt = `just give me 3-4 lines about the feedback of my essay and below rate my essay  ${essay}`;
    let dat= await generate(prompt);
    setfeedback(dat);
 }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-5 font-sans">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Essay Writing</h1>
      {/* Counter Panel */}
      <div className="flex gap-8 mb-6 bg-white shadow-md rounded-xl px-8 py-5 w-full md:w-3/4 justify-around">
        <div className="text-center">
          <h2 className="text-base font-semibold text-slate-700">Word Count</h2>
          <p className="text-2xl font-bold text-indigo-700">{data}</p>
        </div>
        <div className="text-center">
          <h2 className="text-base font-semibold text-slate-700">Backspace Count</h2>
          <p className="text-2xl font-bold text-rose-600">{data2}</p>
        </div>
        <div className="text-center">
          <h2 className="text-base font-semibold text-slate-700">Character Count</h2>
          <p className="text-2xl font-bold text-green-600">{data3}</p>
        </div>
      </div>
      {/* Text Area */}
      <textarea
        onKeyDown={backspacecount}
        onChange={e => { wordscount(e); charcount(e); }}
        placeholder="Start writing your essay here..."
        className="bg-white p-4 w-full md:w-3/4 h-64 text-gray-800 text-lg border border-gray-300 rounded-xl shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200"
      />
       <button className="text-black w-215 p-1 mt-3 rounded-2xl bg-green-700"onClick={analyze} >Analyze</button>

      {/* <h3 className='text-black'>@nidhiandmayank</h3> */}

      <h3 className="text-black">{feedback}</h3>
    </div>
  )
}

export default App
