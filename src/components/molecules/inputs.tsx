import React, { createRef } from 'react';
import 'ui-neumorphism/dist/index.css'
import '../../assets/css/inputs.scss'
import '../../assets/css/ui-expander.scss'
import { faAngleDoubleDown, faAngleDoubleUp, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../atoms/card';
import axios from 'axios';
import get3dpInput from '../../api/get3dpInput';
import file from '../../util/file'
import post3dpInput from '../../api/post3dpInput';
import Cookies from 'js-cookie';

type InputProps = {
}

type InputStates = {
    image_src_list: Array<string>
}

class Input extends React.Component<InputProps, InputStates> {
    uploadCard: JSX.Element
    fileInput: React.RefObject<any>
    input_refresh_timer: number

    constructor(props: any) {
        super(props)

        this.fileInput = React.createRef()
        this.uploadCard = <Card media_src={
            <form id="form-upload">
                <label htmlFor="file-upload">
                    <img src="/upload.svg" id="icon-upload" className="card-media"/>
                </label>
                <input type="file" name="image" ref={this.fileInput} accept="image/jpeg" id="file-upload" onChange={this.onFileSelected}/>
            </form>
        } media_type={""}/>
        this.input_refresh_timer = -1
        this.state = {
            image_src_list: []
        }
    }

    onFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const id_token = Cookies.get("id_token")
        if(event.target.files && id_token) {
            const base64: string = await file.toBase64(event.target.files[0])
            const inputed = await post3dpInput({base64: base64}, id_token)
            await this.syncServer()
        }
    }

    async componentDidMount() {
        await this.syncServer()
        this.input_refresh_timer = window.setInterval(() => {
            this.syncServer()
        }, 60000)
    }

    componentWillUnmount() {
        clearInterval(this.input_refresh_timer)
    }

    async syncServer() {
        const id_token = Cookies.get("id_token")

        if(id_token) {
            const inputs = await get3dpInput(id_token)
            this.setState({
                image_src_list: inputs.data.results.map(input => {
                    return input.url
                })
            })
        }
    }

    render() {
        return (
            <div className="cards" id="inputs">
                {
                    this.uploadCard
                }

                {
                    this.state.image_src_list.map((src, idx) => {
                        return <Card media_src={src} media_type="picture"/>
                    })
                }
            </div>
        )
    }
}

export default Input;