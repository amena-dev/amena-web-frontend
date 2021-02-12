import React, { JSXElementConstructor } from 'react';
import 'ui-neumorphism/dist/index.css'
import '../../assets/css/card.scss'

type CardProps = {
    media_type: string
    media_src: any
    is_focus: boolean
    className: string
}

type CardStates = {
}

class Card extends React.Component<CardProps, CardStates> {
    constructor(props: any) {
        super(props);
    }

    public static defaultProps = {
        is_focus: false,
        className: ""
    }

    render() {
        let media
        switch(this.props.media_type) {
            case "picture":
                media = <img src={this.props.media_src} className="card-media card-media-image"/>
                break
            case "video":
                media = <video src={this.props.media_src} className="card-media card-media-video" autoPlay muted loop></video>
                break
            default:
                media = this.props.media_src
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