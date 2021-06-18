import React,{Component} from 'react';
import './detail.scss';
import axios from 'axios';

class Detail extends Component {
    constructor(props){
        super(props);
        this.state={
            title:'',
            content:'' 
        }
    }
    render(){
        return(
        <React.StrictMode>
        <div className='detail'>
           <h1 className='detail__title'>{this.state.title}</h1>
           <div className='detail__content'
           dangerouslySetInnerHTML={{__html:this.state.content}}
           >
            {/*dangerouslySetInnerHTML属性效果相当于innerHTML*/}
           </div>
        </div>
        </React.StrictMode>
        )
    }
    componentDidMount(){        
       const {id}=this.props.match.params;
       axios.get(`http://www.dell-lee.com/react/api/detail.json?id=${id}`).then(res=>{
           const data=res.data.data;
           this.setState(data)
       }).catch(err=>{
           console.log(err);
       });

    }
}

export default Detail;