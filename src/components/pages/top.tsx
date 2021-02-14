import React from 'react';
import '../../assets/css/top.scss'
import Header from '../organisms/header';
import UiExpander from '../molecules/ui-expander';
import GeneratorUI from '../organisms/generator-ui';
import Account from '../molecules/account';

class Top extends React.Component {
    render() {
        return (
            <div id="top">
                <Account/>
                <Header/>
                <UiExpander is_expand={false}/>
                <GeneratorUI/>
            </div>
        )
    }
}

export default Top;