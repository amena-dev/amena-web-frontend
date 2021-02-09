import React from 'react';
import '../../assets/css/header.scss'
import WhiteLogo from '../../assets/img/amena-title-logo.svg'
import ColorLogo from '../../assets/img/amena-title-logo-color.svg'

class Header extends React.Component {
    componentDidMount() {
        document.addEventListener('scroll', this.onScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScrolling);
    }

    onScrolling() {
        const logo_class_name = "logo"
        const is_header_mode = window.innerHeight >= window.pageYOffset
        console.log(window.innerHeight + " " + window.pageYOffset)

        Array.from(document.getElementsByClassName(logo_class_name)).forEach(logo => {
            if(is_header_mode) {
                logo.classList.remove("header-mode")
                console.log("not expand")
            }else{
                logo.classList.add("header-mode")
                console.log("expand")
            }
        });
    }

    render() {
        return (
            <div id="header">
                <video src={"/amena-web-background.mp4"} id="background-video" autoPlay loop muted>yay :)</video>
                <img src={WhiteLogo} alt="logo" id="logo-white" className="logo" />
                <img src={ColorLogo} alt="logo" id="logo-color" className="logo"/>
                <p id="description">3D Photo Generator.</p>
            </div>
        )
    }
}

export default Header;