import React, { useEffect, useState } from 'react'
import "./Speechtotext.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Link } from 'react-router-dom';
import axios from 'axios';

let my_text;

const Speechtotext = () => {

    const [from, setFrom] = useState("");
    const [option, setOption] = useState([]);

    useEffect(() => {

        const options = {
          method: 'GET',
          url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/support-languages',
          headers: {
            'X-RapidAPI-Key': '0408ec6ffbmshf20f16d41c4e58ep17b046jsn2d2d7ca45e4e',
            'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
          }
        };
    
        axios.request(options)
          .then((response) => {
            console.log(response.data);
            setOption(response.data)
          })
          .catch((error) => {
            console.error(error);
          })
    
      }, []);

    const start_Listening = ()=>{
        SpeechRecognition.startListening({ continuous:true, language: from })
    }

    const stop_Listening = ()=>{
        SpeechRecognition.stopListening();
    }


    const copy_to_clipboard = ()=>{
        navigator.clipboard.writeText(transcript);
        if(transcript.length > 0)
        {
            // alert("text copied")
            document.getElementById('msg_done').innerHTML="Copied to clipboard"
            document.getElementById('msg_done').style.display="block"
        }
        else
        {
            // alert("no text detected")
            document.getElementById('msg_err').innerHTML="No text detected"
            document.getElementById('msg_err').style.display="block"
        }
        
    }

    const{transcript, resetTranscript, browserSupportsSpeechRecognition} =  useSpeechRecognition();

    const send_to_translate =()=>{
        my_text = transcript
    }

    if(!browserSupportsSpeechRecognition)
    {
        return null
    }

  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className='alert alert-success' id="msg_done" style={{display:"none"}}></div>
                    <div className='alert alert-danger' id="msg_err" style={{display:"none"}}></div>
                    <h1 className='text-center mt-5'>Speech to Text Converter</h1>
                    <h3 className='text-center'>Just speak it will automatically start typing for you</h3>
                    <br/>
                    <h4>Select Languages from Here</h4>
                    <select className="form-control" onChange={(e) => setFrom(e.target.value)}>
                    {
                        option.map((opt) =>
                        <option key={opt.language} value={opt.code}>{opt.language}</option>
                        )
                    }
                    </select>
                    <br/>
                    <textarea className='form-control main_content' value={transcript}></textarea>
                    <button className='btn btn-primary m-2' onClick={copy_to_clipboard}>Copy</button>
                    <button className='btn btn-primary m-2' onClick={start_Listening}>Start Listening</button>
                    <button className='btn btn-primary m-2' onClick={stop_Listening}>Stop Listening</button>
                    <button className='btn btn-primary m-2' onClick={resetTranscript}>Clear</button>
                    <Link to="/translate" className='btn btn-primary m-2' onClick={send_to_translate}>Translate</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Speechtotext
export { my_text }