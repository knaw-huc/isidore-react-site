import React from "react";
import Mirador from "./Mirador";
import {fromBase64} from "js-base64";

function Viewer(props: {id: string}) {

    const id: string = window.location.hash.substr(window.location.hash.indexOf("/") + 1);
    const manifest = fromBase64(id);

    return (
     <div>
         <Mirador
             config={{
                 id: 'mirador',
                 window: {
                     allowFullscreen: false,
                     sideBarPanel: 'info',
                     hideWindowTitle: true,
                     sideBarOpen: true,
                     highlightAllAnnotations: true,
                     forceDrawAnnotations: true,
                 },
                 windows: [
                     {
                         loadedManifest: manifest,
                     },
                 ],
                 workspaceControlPanel: {
                     enabled: false,
                 },
             }}
             plugins={[]}
         />
     </div>
    )
}

export default Viewer;

