
import React, { Component, Fragment } from 'react';

//引入参数校验
import PropTypes from 'prop-types';

class CreateItemLi extends Component {
    constructor(props) {
        super(props);
        this.DeleteItemLi = this.DeleteItemLi.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.Value !== this.props.Value) {
            return true
        } else {
            return false
        }
    }
    render() {
        const { Value } = this.props;
        return (
            <Fragment>
                <li
                    onClick={this.DeleteItemLi}
                    dangerouslySetInnerHTML={{ __html: Value }}
                ></li>
            </Fragment>
        )
    }
    DeleteItemLi() {

        const { Index, getdata, setdata } = this.props;

        const state = getdata();    //获取父组件数据
        state.list.splice(Index, 1); //修改list数据, 通过数组 splice()方法，删除指定项            
        setdata(state); //修改父组件数据
    }

}

//要对CreateItemLi组件做props做校验
CreateItemLi.propTypes = {
    Index: PropTypes.number,
    getdata: PropTypes.func,
    setdata: PropTypes.func
}

export default CreateItemLi;
