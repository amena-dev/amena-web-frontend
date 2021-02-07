import React from 'react';
import '../../assets/css/header.scss'
import Logo from '../../assets/img/amena-title-logo.svg'

class Header extends React.Component {
    componentDidMount() {
        document.addEventListener('scroll', this.onScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScrolling);
    }

    onScrolling() {
        const centerY = window.innerHeight / 2
        const background = document.getElementById("background-video")

        if(background) {
            if(window.pageYOffset <= centerY) {
                background.classList.remove("expand")
            }else{
                background.classList.add("expand")
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