import React from "react";
import Mirador from "./Mirador";

function Viewer(props: {manuscriptID: string}) {

    console.log('bonzo');
    console.log(props.manuscriptID);
    return (
     <div>Rob was hier: {props.manuscriptID}</div>
    )
}

export default Viewer;

