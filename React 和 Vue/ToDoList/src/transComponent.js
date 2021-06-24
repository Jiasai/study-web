import React, { Component, Fragment } from 'react';

//引入CSSTransition,单个组件出、入场
import { CSSTransition } from 'react-transition-group';

import './transComponent.css'

class TransComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        }
        this.showToggle = this.showToggle.bind(this);
    }
    render() {
        return (
            <Fragment>
                <div className='transiBg'>
                    <CSSTransition
                        in={this.state.show}
                        timeout={300}
                        classNames='fade'
                        unmountOnExit
                        appear={true}
                        onEntered={
                            (el) => { el.style.color = 'red'; }
                        }
                        onExited={this.alertMessage.bind(this, '出场动画执行完毕！')}
                    >
                        <div>transition动画</div>
                    </CSSTransition>
                </div>
                <button onClick={this.showToggle}>切换Toggle</button>
            </Fragment>
        )
    }
    showToggle() {
        let { show } = this.state;
        show = !show;
        this.setState({ show });
    }
    alertMessage(mess) {
        alert(mess);
    }
}
//timeout={300}  设置动画事件
//classNames='fade' 设置class前缀
//unmountOnExit    执行出场动画后，移除组件DOM
//钩子函数 onEntered(入场执行结束后执行)、onExited（出场执行结束后执行）
//appear = {true} 初始展示动画

export default TransComponent;