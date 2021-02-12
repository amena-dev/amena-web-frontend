import React, { createRef } from 'react';
import 'ui-neumorphism/dist/index.css'
import '../../assets/css/inputs.scss'
import '../../assets/css/ui-expander.scss'
import { faAngleDoubleDown, faAngleDoubleUp, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../atoms/card';
import axios from 'axios';
import get3dpInput, { get3dpInputResponse, get3dpInputResponseElement } from '../../api/get3dpInput';
import file from '../../util/file'
import post3dpInput from '../../api/post3dpInput';
import Cookies from 'js-cookie';
import delete3dpInput from '../../api/delete3dpInput';

type InputProps = {
}

type InputStates = {
    inputs: Array<get3dpInputResponseElement>
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
            inputs: []
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

    syncServer = async () => {
        const id_token = Cookies.get("id_token")

        if(id_token) {
            const res = await get3dpInput(id_token)
            this.setState({
                inputs: res.data.results
            })
        }
    }

    onDelete = (input_id: string) => {
        return async () => {
            const id_token = Cookies.get("id_token")
            if(id_token) {
                await delete3dpInput(input_id, id_token)
                // stateから削除ずみのcardを除く
                this.setState({
                    inputs: this.state.inputs.filter(input => {
                        return input.id !== input_id
                    })
                })
            }
        }
    }

    render() {
        return (
            <div className="cards" id="inputs">
                {
                    this.uploadCard
                }

                {
                    this.state.inputs.map(input => {
                        return <Card media_src={input.url} key={input.id} media_type="picture" is_deletable={true} onDelete={this.onDelete(input.id)}/>
                    })
                }
            </div>
        )
    }
}

export default Input;