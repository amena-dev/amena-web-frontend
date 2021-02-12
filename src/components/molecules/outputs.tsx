import React from 'react';
import 'ui-neumorphism/dist/index.css'
import '../../assets/css/outputs.scss'
import '../../assets/css/ui-expander.scss'
import { faAngleDoubleDown, faAngleDoubleUp, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../atoms/card';
import axios from 'axios';
import get3dpOutput from '../../api/get3dpOutput';
import Cookies from 'js-cookie';

type OutputProps = {
}

type OutputStates = {
    image_src_list: Array<string>
}

class Outputs extends React.Component<OutputProps, OutputStates> {
    output_refresh_timer: number

    constructor(props: any) {
        super(props);
        this.state = {
            image_src_list: []
        }
        this.output_refresh_timer = -1
    }

    async componentDidMount() {
        await this.syncServer()
        this.output_refresh_timer = window.setInterval(() => {
            this.syncServer()
        }, 60000)
    }

    componentWillUnmount() {
        clearInterval(this.output_refresh_timer)
    }

    async syncServer() {
        const id_token = Cookies.get("id_token")
        if(id_token) {
            const outputs = await get3dpOutput(id_token)
            console.log(outputs)
            this.setState({
                image_src_list: outputs.data.results.map(outputs => {
                    return outputs.url
                })
            })
        }
    }

    render() {
        return (
            <div id="outputs" className={"cards"}>
                {
                    this.state.image_src_list.map((src, idx) => {
                        return <Card media_src={src} key={src} media_type="video"/>
                    })
                }
            </div>
        )
    }
}

export default Outputs;