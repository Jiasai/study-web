import React,{Component,Fragment} from 'react';

import './transComponent.css'

class TransComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            show:true
        }
        this.showToggle=this.showToggle.bind(this);
    }
    render(){
        return(
            <Fragment>
            <div className='transiBg'>
            <div 
            style={{fontSize:24}}
            className={this.state.show?'show':'hide'}
            >transition动画</div>
            </div>
            <button onClick={this.showToggle}>切换Toggle</button>
            </Fragment>
        )
    }
    showToggle(){
        let {show} = this.state;
        show = !show;
        this.setState({show});
    }

}

export default TransComponent;