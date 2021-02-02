import React from 'react';
import '../../assets/css/header.scss'
import Logo from '../../assets/img/amena-title-logo.svg'

class Header extends React.Component {
    render() {
        return (
            <div id="header">
                <img src={Logo} alt="logo" id="logo" />
            </div>
        )
    }
}

export default Header;