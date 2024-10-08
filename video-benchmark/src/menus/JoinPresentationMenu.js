import "./css/JoinPresentationMenu.css";
import React, { useContext,useState,useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../hooks/UserContext";
import CodeForm from "../forms/CodeForm";
import VideoAPI from "../api/VideoAPI";

// the main menu used when joining a presentation. This is used by both the audience and the presenter.
// may look slightly different based on user and stage though
function JoinPresentationMenu({myUser}) {
    const { stage,setStage } = useContext(UserContext);
    const [code,setCode] = useState("");
    const [video,setVideo] = useState(false);
    const [user,setUser] = useState("");


    //gets the video from the api
    useEffect(function getVideoByCode() {
        async function getVideo() {
            let myVideo = await VideoAPI.fetchVideo(code);
            console.log("fetched:",myVideo);
            if(myVideo["current"]){
                setVideo(myVideo["video"]);
                //if presenter, saves it
                if(user==="presenter") {
                    sessionStorage.setItem('code',`${code}`);
                    sessionStorage.setItem('secure_hash','not_secure');
                }
            } else if(myVideo["past_video"]){
                setVideo(myVideo["video"]);
            }
        }
        if(code && stage > 2){
            getVideo();
        }
      }, [code,stage,setStage,user]);

    //uses the window url to determine the type of user
    //normally this is not needed, but if they navigate here by link, this effect makes things smoother
    useEffect(function determineMyUser(){
        if(window.location.href.includes("presenter") && stage !== 3){
            setUser(myUser);
            setStage(1);
        }
        else if (window.location.href.includes("audience") && stage !== 3) {
            setUser(myUser);
            setStage(2);
        }
        console.log(window.location.href.includes("audience"))
    },[stage,setStage,setUser,myUser])

    //either presents a form for them to enter the presentation code or finds the video with the code.
    //codeform handles 404s
    function stageSelection(){
        if(stage===1){
            return(
                <div>
                    <CodeForm setCode={setCode} presenter={true}/>
                </div>
            );
        }
        if(stage===2){
            return(
                <div>
                    <CodeForm setCode={setCode}/>
                </div>
            );
        }
        else if(stage===3){
            if(!video){
                return(
                    <div>
                        Retrieving Video Details...
                    </div>
                );
            } else {
                return(
                    <div className="found-video">
                        Found a match!
                        <div className="video-card">
                            <div><Link to={`/${user}/${code}`}> {video.title} </Link> </div>
                            <div className="video-card-sub">presented by {video.presenter.first} {video.presenter.last}</div>
                            <div className="video-card-sub"><small>{video.duration}</small></div>
                        </div>
                        
                    </div>
                );
            }
        }else{
            setStage(2)
        }
    };
    
    return (
        <div className="JoinPresentationMenu">
            {stageSelection()}
        </div>
    );
}

export default JoinPresentationMenu;