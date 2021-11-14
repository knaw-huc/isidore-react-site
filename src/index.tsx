import React from 'react';
import ReactDOM from 'react-dom';
import Search from "./components/search";
import Manuscript from "./components/manuscript";
import Viewer from "./components/viewer";
import {StateMachineComponent} from "./renderMachine";
import * as serviceWorker from './serviceWorker';
import {interpret} from "xstate";
import './assets/css/isidore.css';
import './assets/css/isidore_new.css';
import {IsiMachine} from "./machine/model";


const interpreter = interpret(IsiMachine);
interpreter.start();

gotoUrl();

function gotoUrl() {
    if (window.location.hash.substr(1).indexOf("detail/") === 0) {
        const id = window.location.hash.substr(window.location.hash.indexOf("/") + 1);
        interpreter.send("fourOhFour"); //Filthy solution for forcing props reload!!!
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
            if (window.location.hash.substr(1).indexOf("viewer") === 0) {
                const id = window.location.hash.substr(window.location.hash.indexOf("/") + 1);
                interpreter.send("viewer", {m_id: id});
            } else {
                const id = "none";
                interpreter.send("search", {search_string: id});
            }

        }
    }
}

window.onhashchange = gotoUrl;


ReactDOM.render(
    <div>
        {StateMachineComponent(interpreter, {
            "detail": ({state}) => <Manuscript manuscriptID={(state.context || {}).manuscript_id}/>,
            "viewer": ({state}) => <Viewer id={(state.context || {}).m_id}/>,
            "search": ({state}) => <Search search_string={(state.context || {}).search_string}/>,
            "fourOhFour": ({state}) => <div>404</div>,
            "": ({state}) => <div>The GUI for {state.value} is not yet defined</div>
        })}</div>
    , document.getElementById('root'));

serviceWorker.unregister();
