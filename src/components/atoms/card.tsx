import React, { JSXElementConstructor } from 'react';
import 'ui-neumorphism/dist/index.css'
import '../../assets/css/card.scss'
import { v4 as uuidv4 } from 'uuid';

type CardProps = {
    media_type: string
    media_src: any
    is_focus: boolean
    is_focus_dotted: boolean
    className: string
    is_deletable: boolean
    is_loading: boolean
    is_downloadable: boolean
    is_autoplay: boolean
    onDelete: () => Promise<any>
}

type CardStates = {
}

class Card extends React.Component<CardProps, CardStates> {
    card_id: string

    constructor(props: any) {
        super(props);
        this.card_id = uuidv4()
        this.onMouseEnter=this.onMouseEnter.bind(this);
        this.onMouseLeave=this.onMouseLeave.bind(this);
    }

    public static defaultProps = {
        is_focus: false,
        is_focus_dotted: false,
        className: "",
        is_deletable: false,
        is_loading: false,
        is_downloadable: false,
        is_autoplay: false,
        onDelete: () => {}
    }

    onMouseEnter() {
        const this_card: any = document.getElementsByClassName(`video-${this.card_id}`)[0]
        if(this_card){
            this_card.play()
        }
    }

    onMouseLeave() {
        const this_card: any = document.getElementsByClassName(`video-${this.card_id}`)[0]
        if(this_card){
            this_card.pause()
        }
    }

    render() {
        let media
        const delete_icon = <img className="card-delete" src="/delete.svg" onClick={async () => {await this.props.onDelete()}}></img>
        const loading_icon = <img className="card-loading" src="/loading.gif"></img>

        switch(this.props.media_type) {
            case "picture":
                media = <div>
                    <img src={this.props.media_src} className={`card-media card-media-image ${this.props.is_deletable ? "deletable" : ""}`}/>
                    {this.props.is_downloadable ? <a href={this.props.media_src} className="card-download">artifact.mp4<img src="/download.svg"/></a> : ""}
                    {this.props.is_deletable ? delete_icon : ""}
                    {this.props.is_loading ? loading_icon : ""}
                </div>
                break
            case "video":
                media = <div>
                    <video src={this.props.media_src}
                        className={`card-media card-media-video video-${this.card_id} ${this.props.is_deletable ? "deletable" : ""}`} muted loop></video>
                    {this.props.is_downloadable ? <a href={this.props.media_src} className="card-download"><img src="/download.svg"/></a> : ""}
                    {this.props.is_deletable ? delete_icon : ""}
                    {this.props.is_loading ? loading_icon : ""}
                </div>
                break
            default:
                media = <div className={`card-media card-media-video ${this.props.is_deletable ? "deletable" : ""}`}>
                    {this.props.media_src}
                    {this.props.is_deletable ? delete_icon : ""}
                    {this.props.is_loading ? loading_icon : ""}
                </div>
                break
        }

        return (
            <div className={`card ${this.props.className} ${(this.props.is_focus ? "is-focus" : "")}  ${(this.props.is_focus_dotted ? "is-focus-dotted" : "")}`}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
            >
                {media}
            </div>
        )
    }
}

export default Card;