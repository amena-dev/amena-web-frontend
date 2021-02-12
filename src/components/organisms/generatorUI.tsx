import React from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login'
import '../../assets/css/generator-ui.scss'
import Headline from '../atoms/headline';
import Cards from '../molecules/cards';
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '../molecules/inputs';
import Output from '../molecules/outputs';

class GeneratorUI extends React.Component {
    render() {
        return (
            <div id="generator-ui">
                <div id="input-ui" className="ui-part">
                    <Input />
                </div>

                <div id="output-ui" className="ui-part">
                    <Output />
                </div>

            </div>
        )
    }
}

export default GeneratorUI;