import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from 'react-google-login'
import '../../assets/css/account.scss'
import Cookie from 'js-cookie'
import { exists } from 'fs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

type AccountProps = {
}

type AccountStates = {
    account: GoogleLoginResponse | GoogleLoginResponseOffline | boolean
}

class Account extends React.Component<AccountProps, AccountStates> {
    constructor(props: any) {
        super(props)
        this.state = {
            account: false
        }
    }

    onSuccess = async (account: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        const id_token = (account as any)["tokenObj"]["id_token"]
        if(id_token) {
            const exists_cookie = Cookie.get("id_token")
            console.log(account)
            Cookie.set("id_token", id_token)
            this.setState({
                account: account
            })

            if(!exists_cookie) {
                window.location.reload()
            }
        }
    }

    onFailure = async (failed: any) => {
        Cookie.set("id_token", "")
    }

    onLogout = async () => {
        new Promise(resolve => {
            resolve(Cookie.set("id_token", ""))
        }).then(_ => {
            window.location.reload()
        })
    }

    getAccountName = (account: GoogleLoginResponse | GoogleLoginResponseOffline | boolean) => {
        if(!account) {
            return ""
        }else{
            return (account as any)["profileObj"]["name"]
        }
    }

    render() {
        return (
            <div id="account" className={this.state.account ? "logged-in" : ""}>
                <GoogleLogin
                    clientId="274565267697-dqm0q7bnei6kgb3jrgtd27pddckpoaf6.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.onSuccess}
                    onFailure={this.onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    className="login-button"
                    style={{display: "none"}}
                >
                </GoogleLogin>

                <GoogleLogout
                    clientId="274565267697-dqm0q7bnei6kgb3jrgtd27pddckpoaf6.apps.googleusercontent.com"
                    buttonText={`Logout ${this.getAccountName(this.state.account)}`}
                    onLogoutSuccess={this.onLogout}
                    className="logout-button"
                    style={{display: "none"}}
                />
            </div>
        )
    }
}

export default Account;