import React, { Component, Fragment } from 'react';
//引入CSSTransition 和 TransitionGroup
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './transiGroup.css'

class TransGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ['item', 'item']
        }
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleDelItem = this.handleDelItem.bind(this);
    }
    render() {
        //TransitionGroup 包裹 CSSTransition 就可以实现多个项的动画
        return (
            <Fragment>
                <div className='transiBg'>
                    <TransitionGroup className='Group'>
                        {
                            this.state.list.map((value, index) => {
                                return (
                                    <CSSTransition
                                        timeout={300}
                                        classNames='Group'
                                        unmountOnExit
                                        appear={true}
                                    >
                                        <div key={index}>{value}
                                        </div>
                                    </CSSTransition>
                                )
                            })
                        }
                    </TransitionGroup>
                </div>
                <button onClick={this.handleAddItem}>增加1个</button>
                <button style={{ marginLeft: 10 }} onClick={this.handleDelItem}>删除1个</button>
            </Fragment>
        )
    }
    handleAddItem() {
        let { list } = this.state;
        list = ['item', ...list];
        this.setState({ list });
    }
    handleDelItem() {
        let { list } = this.state;
        list.pop();//删除最后1项目
        this.setState({ list });
    }
}


export default TransGroup;