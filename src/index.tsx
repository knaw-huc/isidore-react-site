import React from 'react';
import ReactDOM from 'react-dom';
import Search from "./components/search";
import Manuscript from "./components/manuscript";
import {StateMachineComponent} from "./renderMachine";
import * as serviceWorker from './serviceWorker';
import {interpret} from "xstate";
import './assets/css/isidore.css';
import {IsiMachine} from "./machine/model";


const interpreter = interpret(IsiMachine);
interpreter.start();

gotoUrl();

function gotoUrl() {
    if (window.location.hash.substr(1).indexOf("detail/") === 0) {
        const id = window.location.hash.substr(window.location.hash.indexOf("/") + 1);
        interpreter.send("fourOhFour"); //Filthy solution
        interpreter.send("detail", {manuscript_id: id});
    } else {
        if (window.location.hash.substr(1).indexOf("search") === 0) {
            if (window.location.hash.substr(1).length > 6 && window.location.hash.substr(1).indexOf("search") !== -1) {
                const id = window.location.hash.substr(window.location.hash.indexOf("/") + 1);
                interpreter.send("search", {search_string: id});
            } else {
                const id = "none";
                interpreter.send("search", {search_string: id});
            }
        } else {
            interpreter.send(window.location.hash.substr(1))
        }
    }
}

window.onhashchange = gotoUrl;




ReactDOM.render(
    <div>
        {StateMachineComponent(interpreter, {
            "detail": ({state}) => <Manuscript manuscriptID={(state.context || {}).manuscript_id}/>,
            "search": ({state}) => <Search/>,
            "fourOhFour": ({state}) => <div>404</div>,
            "": ({state}) => <div>The GUI for {state.value} is not yet defined</div>
        })}</div>
    , document.getElementById('root'));

serviceWorker.unregister();
