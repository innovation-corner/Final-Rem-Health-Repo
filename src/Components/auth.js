import React,{Component} from 'react';

class Auth extends Component{
    componentWillMount(){
        const token = sessionStorage.getItem('token')
        token? this.props.history.push('/home'): this.props.history.push('/login')
    }
render(){
    return(
        <div>

        </div>
    )
}
}

export default Auth