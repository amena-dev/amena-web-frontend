import React from 'react';
import 'ui-neumorphism/dist/index.css'
import '../../assets/css/outputs.scss'
import '../../assets/css/ui-expander.scss'
import { faAngleDoubleDown, faAngleDoubleUp, faAngleDown, faAngleUp, faCubes, faArrowCircleDown, faArrowCircleUp, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../atoms/card';
import axios from 'axios';
import get3dpOutput, { get3dpOutputResponseElement } from '../../api/get3dpOutput';
import Cookies from 'js-cookie';
import error from '../../util/error';

type OutputProps = {
}

type OutputStates = {
    outputs: Array<get3dpOutputResponseElement>
}

class Outputs extends React.Component<OutputProps, OutputStates> {
    output_refresh_timer: number
    guide: JSX.Element

    constructor(props: any) {
        super(props);
        this.state = {
            outputs: []
        }
        this.output_refresh_timer = -1
        this.guide = <div className="guide">
            <Card media_src={"/artifacts.svg"} media_type={"picture"} is_focus={true} className="card-guide" />
            <p>Artifacts here<FontAwesomeIcon icon={faCheckCircle} className="icon" /></p>
        </div>
    }

    async componentDidMount() {
        setTimeout(async () => {
            try { await this.syncServer() }
            catch (e) { console.error(e) }
        }, 1000)

        this.output_refresh_timer = window.setInterval(async () => {
            try { await this.syncServer() }
            catch (e) { console.error(e) }
        }, 60000)
    }

    componentWillUnmount() {
        clearInterval(this.output_refresh_timer)
    }

    async syncServer() {
        const id_token = Cookies.get("id_token")

        if (id_token) {
            const outputs = await get3dpOutput(id_token)
            console.log(outputs)
            this.setState({
                outputs: outputs.data.results.filter(output => {
                    if (!output.url.match(/error.json/)) return output
                })
            })
        } else {
            throw new Error("Please login.")
        }
    }

    render() {
        return (
            <div id="outputs" className={"cards"}>
                {
                    this.state.outputs.length ? this.state.outputs.sort((a, b) => a.created_at - b.created_at).map(output => {
                        return <Card media_src={output.url} key={output.url} media_type="video" is_downloadable={true} />
                    }) : this.guide
                }
            </div>
        )
    }
}

export default Outputs;