import React from 'react';
import '../../assets/css/headline.scss'
import ColorLogo from '../../assets/img/amena-title-logo-color.svg'

type HeadlineProps = {
    icon: any
    text: string
}

type HeadlineStates = {
}

class Headline extends React.Component <HeadlineProps, HeadlineStates>{
    public static defaultProps: HeadlineProps = {
        icon: "",
        text: ""
    }

    render() {
        return (
            <div className="headline">
                <span className="icon">{this.props.icon}</span>
                <span className="text">{this.props.text}</span>
            </div>
        )
    }
}

export default Headline;