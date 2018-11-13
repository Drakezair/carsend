import React,{Component} from 'react';
import '../css/re.css';
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

class Register extends Component {
    

    state= {
        nombre:'',
        email:'',
        pas:'',
    }

    signUp=(a,b)=> {
        firebase.auth().createUserWithEmailAndPassword(a,b).then((user)=> {
            firebase.database().ref(`users/${user.uid}`).set({
                nombre: this.state.nombre
            }).then(()=>{
                this.props.history.push('/app');
            })
            
        })
    }

    render() {
        return(
            <div className='ContainWrap' >
                <div className='Wrap' >
                    <img src={require('../assets/img/car.png')} className='logo' alt='logo' />
                    <form  >
                        <input type='text' placeholder='Nombre' onChange={(n)=>{this.setState({nombre:n.target.value})}} />
                        <input type='email' placeholder='Tucorreo@ejemplo.com' onChange={(e)=>{this.setState({email:e.target.value})}}/>
                        <input type='password' placeholder='Contraseña' onChange={(p)=>{this.setState({pas:p.target.value})}}/>
                        
                    </form>
                        <input type='submit' onClick={()=>this.signUp(this.state.email,this.state.pas)} className='enviar'value='Registro' />
                </div>
            </div>
        );
    }
}

export default Register;