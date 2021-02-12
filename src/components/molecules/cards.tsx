import React from 'react';
import 'ui-neumorphism/dist/index.css'
import '../../assets/css/ui-expander.scss'
import { faAngleDoubleDown, faAngleDoubleUp, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../atoms/card';

type InputProps = {
    media_src_list: Array<any>
    media_type_list: Array<string>
}

type InputStates = {
}

class Input extends React.Component<InputProps, InputStates> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="cards">
                {
                    this.props.media_src_list.map((src, idx) => {
                        return <Card media_src={src} media_type={this.props.media_type_list[idx]}/>
                    })
                }
            </div>
        )
    }
}

export default Input;