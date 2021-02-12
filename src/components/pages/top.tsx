import React from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login'
import '../../assets/css/top.scss'
import Header from '../organisms/header';
import UiExpander from '../molecules/ui-expander';
import GeneratorUI from '../organisms/generatorUI';
import Cookie from 'js-cookie'

class Top extends React.Component {
    render() {
        return (
            <div id="top">
                <GoogleLogin
                    clientId="274565267697-dqm0q7bnei6kgb3jrgtd27pddckpoaf6.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={account => {
                        const account_any: any = account
                        const id_token = account_any["tokenObj"]["id_token"]
                        Cookie.set("id_token", id_token)
                    }}
                    onFailure={failed => {
                        Cookie.set("id_token", "")
                    }}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
                <Header/>
                <UiExpander is_expand={false}/>
                <GeneratorUI/>
            </div>
        )
    }
}

export default Top;