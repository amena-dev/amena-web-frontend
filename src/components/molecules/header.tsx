import React from 'react';
import '../../assets/css/header.scss'
import Logo from '../../assets/img/amena-title-logo.svg'

function convertRemToPixels(rem: number): number {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

class Header extends React.Component {
    componentDidMount() {
        document.addEventListener('scroll', this.onScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScrolling);
    }

    onScrolling() {
        const background = document.getElementById("background-video")

        if(background) {
            if(window.innerHeight - convertRemToPixels(5) >= window.pageYOffset) {
                background.classList.remove("expand")
                console.log("not expand")
            }else{
                background.classList.add("expand")
                console.log("expand")
            }
        }
    }

    render() {
        return (
            <div id="header">
                <video src={"/amena-web-background.mp4"} id="background-video" autoPlay loop muted>yay :)</video>
                <img src={Logo} alt="logo" id="logo" />
                <p id="description">3D Photo Generator.</p>
            </div>
        )
    }
}

export default Header;