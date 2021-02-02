import React from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login'
import '../../assets/css/top.scss'
import Header from '../molecules/header';
import UiExpander from '../molecules/ui-expander';
import GeneratorUI from '../organisms/generatorUI';

class Top extends React.Component {
    render() {
        return (
            <div id="top">
                <GoogleLogin
                    clientId="274565267697-dqm0q7bnei6kgb3jrgtd27pddckpoaf6.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={console.log}
                    onFailure={console.log}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
                <video src={"/amena-web-background.mp4"} id="background-video" autoPlay loop muted>yay :)</video>
                <p id="description">3D Photo Generator.</p>
                <Header/>
                <UiExpander is_expand={false}/>
                <GeneratorUI/>
            </div>
        )
    }
}

export default Top;