import React, { Component, Fragment } from 'react';
//引入CSSTransition 和 TransitionGroup
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import './SwitchTrans.css'

class SwitchTrans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        }
        this.toggleShow = this.toggleShow.bind(this);
    }
    render() {
        //SwitchTransition 包裹 CSSTransition 就可以实现2个组件间的出场、入场
        return (
            <Fragment>
                <div className='transiBg'>
                    <SwitchTransition mode='out-in' className='Group'>
                        <CSSTransition
                            key={this.state.show}
                            addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                            classNames='switch'
                            appear={true}
                        >
                            {this.state.show ? <div>Hello~</div> : <div>Bye bye</div>}
                        </CSSTransition>
                    </SwitchTransition>
                </div>
                <button onClick={this.toggleShow}>切换Toggle</button>
            </Fragment>
        )
    }
    toggleShow() {
        let { show } = this.state;
        show = !show;
        this.setState({ show });
    }

}

export default SwitchTrans;