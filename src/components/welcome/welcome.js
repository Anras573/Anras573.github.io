import React, { Component } from 'react';

import entrypoint from '../../utils/threejs/entrypoint';
import './welcome.scss';

class Welcome extends Component {
    componentDidMount()
    {
        entrypoint(this.threeRootElement);
    }

    render() {
        return (
            <section className='home'>
                <h1>ANDERS BO RASMUSSEN</h1>
                <h2>SOFTWARE DEVELOPER</h2>
                <div ref={element => this.threeRootElement = element}></div>
            </section>);
    }
}

export default Welcome;
