import React from "react";
import logo from "../assets/img/logo-innovatingknowledge.png";



export default class Header extends React.Component {


    render() {
        return (
            <div className="hcContentContainer bgColorBrand1 hcMarginBottom5">
                <header className="hcPageHeaderSimple hcBasicSideMargin">
                    <div className="hcBrand">
                        <div className="hcBrandLogo">
                            <img src={logo} className="logo" alt="Logo Soundtolls"/>
                        </div>

                    </div>
                </header>
            </div>
        )
    }
}