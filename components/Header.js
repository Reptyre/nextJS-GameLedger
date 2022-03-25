
import React from "react";

export default function Header(props){

    return(
        <div>
            <h1 style={{textAlign:"center"}}> {props.title} </h1>
        </div>
    )
}