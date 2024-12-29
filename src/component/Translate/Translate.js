import React, { useEffect, useState } from 'react'
import { my_text } from '../Speechtotext/Speechtotext'
import { useSpeechSynthesis } from "react-speech-kit";
import axios from "axios";

const Translate = () => {

  const [option, setOption] = useState([]);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { speak } = useSpeechSynthesis();

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

  const translate_btn = () => {
    
    const encodedParams = new URLSearchParams();
    encodedParams.set('from', from);
    encodedParams.set('to', to);
    encodedParams.set('text', input);

    const options = {
      method: 'POST',
      url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '0408ec6ffbmshf20f16d41c4e58ep17b046jsn2d2d7ca45e4e',
        'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
      },
      data: encodedParams,
    };

    axios.request(options)
      .then((response) => {
        console.log(response.data.trans);
        setOutput(response.data.trans)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const copy = ()=>{
    navigator.clipboard.writeText(output);
    if(output.length > 0)
    {
        alert("text copied")
    }
    else
    {
        alert("no text detected")
    }
  }
  
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            From:
            <br/>
              <select className="form-control" onChange={(e) => setFrom(e.target.value)}>
                  <option>----Select Language----</option>
              {
                option.map((opt) =>
                  <option key={opt.language} value={opt.code}>{opt.language}</option>
                )
              }
            </select>
            <br/>
            <textarea className='form-control main_content' value={my_text} onChange={(e) => setInput(e.target.value)} onInput={(e) => setInput(e.target.value)}></textarea>
            <p className='text-primary'>*NOTE : Please press space button before translate</p>
          </div>
          <div className="col-md-6">
            To:
            <br/>
              <select className="form-control" onChange={(e) => setTo(e.target.value)}>
                  <option>----Select Language----</option>
              {
                option.map(opt =>
                  <option key={opt.language} value={opt.code}>{opt.language}</option>
                )
              }
              </select>
            <br/>
            <textarea className='form-control main_content' value={output}></textarea>
            <div className='btn btn-primary mt-3' style={{float:'right'}} onClick={copy}>copy</div>
            {/* <button className="btn btn-primary mt-3" style={{ float: 'right' }} onClick={translate_btn}>
              Speech
            </button> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <button className='btn btn-primary ms-1 mt-0' onClick={translate_btn}>Translate</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Translate