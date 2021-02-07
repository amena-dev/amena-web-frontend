import React from 'react';
import 'ui-neumorphism/dist/index.css'
import '../../assets/css/ui-expander.scss'
import { faAngleDoubleDown, faAngleDoubleUp, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type UiExpanderProps = {
    is_expand: boolean
}

type UiExpanderStates = {
    is_expand: boolean
}

class UiExpander extends React.Component<UiExpanderProps, UiExpanderStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            is_expand: props.is_expand,
        }
        if(props.is_expand) this.expand()
        else this.contract()

        this.onClick = this.onClick.bind(this)
        this.onScrolling = this.onScrolling.bind(this)
    }

    componentDidMount() {
        document.addEventListener('scroll', this.onScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScrolling);
    }

    onClick() {
        if(this.state.is_expand) this.contract()
        else this.expand()
    }

    onScrolling() {
        const element = document.documentElement;
        const bottom = element.scrollHeight - element.clientHeight;
        this.setState(state => {
            return {
                is_expand: window.pageYOffset >= window.innerHeight
            }
        })
    }

    expand() {
        const element = document.documentElement;
        const bottom = element.scrollHeight - element.clientHeight;
        window.scroll(0, bottom);
    }

    contract() {
        window.scroll(0, 0);
    }

    render() {
        let content
        if(this.state.is_expand)
            content = <p>What's Amena?<FontAwesomeIcon icon={faAngleDoubleUp} id="ui-expander-icon" /></p>
        else
            content = <p>Generate Now<FontAwesomeIcon icon={faAngleDoubleDown} id="ui-expander-icon" /></p>

        return (
            <div id="ui-expander" onClick={this.onClick}>
                {content}
            </div>
        )
    }
}

export default UiExpander;