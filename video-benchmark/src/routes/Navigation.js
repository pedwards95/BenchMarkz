import "./css/Navigation.css";
import React,{ useContext,useState } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../hooks/UserContext";

//navbar component, for fast links to home, watch, and prepare
function Navigation() {
    const { setPvA,setStage } = useContext(UserContext);

    function resetData(){
        setPvA("");
        setStage(1);
    }

    //changes which tab is highlighted
    function changeCurrent(e){
        var elements = document.getElementsByClassName("current");
        if(elements.length > 0){
            elements[0].classList.remove("current");
        }
        e.target.parentNode.classList.add("current");
    }

    //uses the window to make sure the correct tab is highlighted after using links instead of internal data
    function updateCurrentTab(){
        if(window.location.href.includes("presenter")){
            document.getElementById("presenter-link").classList.add("current");
        }else if(window.location.href.includes("audience")){
            document.getElementById("audience-link").classList.add("current");
        }else{
            document.getElementById("home-link").classList.add("current");
        }
    }

    //slight delay on tab update because ?????
    useState(()=>{
        setTimeout(()=>{
            try{
                updateCurrentTab();
            }catch{}
        },100)
    });

    //rendition of navbar
    return (
        <nav className="nav-bar">
            <span className="nav-link" id="home-link">
                <NavLink to="/" onClick={(e)=>{
                    resetData();
                    changeCurrent(e);
                }}>
                    Home
                </NavLink>
            </span>
            <span className="nav-link" id="audience-link">
                <NavLink to="/audience" onClick={(e)=>{
                    resetData();
                    changeCurrent(e);
                    setPvA("audience");
                }}>
                    Watch
                </NavLink>
            </span>
            <span className="nav-link" id="presenter-link">
                <NavLink to="/presenter" onClick={(e)=>{
                    resetData();
                    changeCurrent(e);
                    setPvA("presenter");
                }}>
                    Present
                </NavLink>
            </span>
        </nav>
    );
}

export default Navigation;
