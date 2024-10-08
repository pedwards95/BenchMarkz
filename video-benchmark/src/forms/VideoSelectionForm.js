import "./css/VideoSelectionForm.css";
import React, { useState } from "react";
import useFields from "../hooks/useFields";

//form used to search for past videos
function VideoSelectionForm() {
    const [errorsCode,setErrorsCode] = useState([]);
    const [errorsSearch,setErrorsSearch] = useState([]);
    const [formData, handleChange, resetForm] = useFields({
        audience_code: '',
        key_phrase: ''
    })

    //TODO
    const handleSubmitCode = e => {
        e.preventDefault();
        resetForm();
    }
    
    //TODO
    const handleSubmitSearch = e => {
        e.preventDefault();
        resetForm();
    }

    return (
        <div className="VideoSelectionForm">
            <div className="form-text">Have a presentation code? Find what you are looking for right away with that!</div>
            <p className="red">NOTE: This part of the application does not currently function, as the hassle and costs of storing video data is too large.</p>
            <form onSubmit={handleSubmitCode}>
                <div className="form-box">
                    <label htmlFor="audience_code">Code: </label>
                    <input name="audience_code" type="text" placeholder="abc123" value={formData.audience_code} onChange={handleChange}></input>
                </div>
                <div>
                    {errorsCode.map((e)=>(
                        <li className="error" key={`error${e}`}>{e}</li>
                    ))}
                </div>
                <button className="submit-btn">Submit</button>
            </form>
            <br/>
            <hr/>
            <br/>
            <div className="form-text">OR maybe you are looking for a person or topic?</div>
            <form onSubmit={handleSubmitSearch}>
                <div className="form-box">
                    <label htmlFor="key_phrase">Phrase: </label>
                    <input name="key_phrase" type="text" placeholder="presentations" value={formData.key_phrase} onChange={handleChange}></input>
                </div>
                <div>
                    {errorsSearch.map((e)=>(
                        <li className="error" key={`error${e}`}>{e}</li>
                    ))}
                </div>
                <button className="submit-btn">Submit</button>
            </form>
        </div>
    );
}

export default VideoSelectionForm;