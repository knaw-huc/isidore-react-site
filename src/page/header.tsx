import React from "react";
import logo from "../assets/img/innovatingknowledge-logo.png";
import {HOME, PROJECT_SITE} from "../misc/config";


export default class Header extends React.Component {

    goHome() {
        window.location.href = HOME;
    }

    goTo(qs: string) {
        window.location.href = PROJECT_SITE + qs;
    }

    render() {
        return (
            <div className="hcContentContainer bgColorBrandIK hcMarginBottom5">
                <header className=" hcPageHeaderSimple hcBasicSideMargin">
                    <div className='hcBrand'>
                        <div onClick={() => {this.goHome()}} className="hcBrandLogo"><img
                            src="https://d33wubrfki0l68.cloudfront.net/38abf15f871bd127f4192740b1a32d515504999c/63497/images/custom/innknow/innovatingknowledge-logo.png"
                            alt="" width="150px;"/>
                        </div>
                    </div>
                    <nav>
                        <div className="navMenuItem" onClick={() => {this.goTo("?page_id=33")}}>Database</div>
                        <div className="navMenuItem" onClick={() => {this.goTo("?page_id=37")}}>Digital edition</div>
                        <div className="navMenuItem" onClick={() => {this.goTo("?page_id=92")}}>Conference</div>
                        <div className="navMenuItem" onClick={() => {this.goTo("?page_id=40")}}>Outputs</div>
                        <div className="navMenuItem" onClick={() => {this.goTo("?page_id=81")}}>People</div>
                        <div className="navMenuItem" onClick={() => {this.goTo("?page_id=8")}}>About</div>
                    </nav>
                </header>
            </div>
        )
    }
}