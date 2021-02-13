import React from 'react';
import 'ui-neumorphism/dist/index.css'
import '../../assets/css/outputs.scss'
import '../../assets/css/ui-expander.scss'
import { faAngleDoubleDown, faAngleDoubleUp, faAngleDown, faAngleUp, faCubes, faArrowCircleDown, faArrowCircleUp, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
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
    guide: JSX.Element

    constructor(props: any) {
        super(props);
        this.state = {
            image_src_list: []
        }
        this.output_refresh_timer = -1
        this.guide = <div className="guide">
            <Card media_src={"/artifacts.png"} media_type={"picture"} is_focus={true} className="card-guide"/>
            <p>Artifacts here<FontAwesomeIcon icon={faCheckCircle} className="icon" /></p>
            </div>
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
                }).filter(output => {
                    if(!output.match(/error.json/)) return output
                })
            })
        }
    }

    render() {
        return (
            <div id="outputs" className={"cards"}>
                {
                    this.state.image_src_list.length ? this.state.image_src_list.map((src, idx) => {
                        return <Card media_src={src} key={src} media_type="video" is_downloadable={true}/>
                    }) : this.guide
                }
            </div>
        )
    }
}

export default Outputs;