import React, { JSXElementConstructor } from 'react';
import 'ui-neumorphism/dist/index.css'
import '../../assets/css/card.scss'

type CardProps = {
    media_type: string
    media_src: any
    is_focus: boolean
    className: string
    is_deletable: boolean
    onDelete: () => Promise<any>
}

type CardStates = {
}

class Card extends React.Component<CardProps, CardStates> {
    constructor(props: any) {
        super(props);
    }

    public static defaultProps = {
        is_focus: false,
        className: "",
        is_deletable: false,
        onDelete: () => {}
    }

    render() {
        let media
        const delete_icon = <img className="card-delete" src="/delete.svg" onClick={async () => {await this.props.onDelete()}}></img>

        switch(this.props.media_type) {
            case "picture":
                media = <div>
                    <img src={this.props.media_src} className={`card-media card-media-image ${this.props.is_deletable ? "deletable" : ""}`}/>
                    {this.props.is_deletable ? delete_icon : ""}
                </div>
                break
            case "video":
                media = <div>
                    <video src={this.props.media_src} className={`card-media card-media-video ${this.props.is_deletable ? "deletable" : ""}`} autoPlay muted loop></video>
                    {this.props.is_deletable ? delete_icon : ""}
                </div>
                break
            default:
                media = <div className={`card-media card-media-video ${this.props.is_deletable ? "deletable" : ""}`}>
                    {this.props.media_src}
                    {this.props.is_deletable ? delete_icon : ""}
                </div>
                break
        }

        return (
            <div className={"card " + this.props.className + " " + (this.props.is_focus ? "is-focus" : "")}>
                {media}
            </div>
        )
    }
}

export default Card;