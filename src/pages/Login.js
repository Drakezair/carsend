import React,{Component} from 'react';
import '../css/Login.css';
import {Link} from 'react-router-dom';
const firebase = require('firebase/app');
require('firebase/auth');


class Login extends Component {

    state= {
        email:'',
        pas:'',

    }

    login(a,b) {
        firebase.auth().signInWithEmailAndPassword(a,b).then(()=>{
            this.props.history.push('/app');
        })
    }

    
    render() {
        return(
            <div className='ContainWrap' >
                <div className='Wrap' >
                    <img alt='logo' src={require('../assets/img/car.png')} className='logo' />
                    <form  >
                        <input type='email' placeholder='Tucorreo@ejemplo.com' onChange={(e)=>{this.setState({email:e.target.value})}} />
                        <input type='password' placeholder='Contraseña' onChange={(p)=>{this.setState({pas:p.target.value})}} />
                        
                    </form>
                        <input type='submit' onClick={()=>{this.login(this.state.email,this.state.pas)}} value='Login' className='enviar' />
                    <Link className='reb' to='/register' >Registrarse</Link>
                </div>
            </div>
        );
    }
}

export default Login;