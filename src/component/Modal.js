import React,{Component} from 'react';
import '../css/dash.css';
import FileUploader from 'react-firebase-file-uploader';
import * as firebase from "firebase";
import Modal from 'react-modal';

require('firebase/storage');
require('firebase/database');

class Modala extends Component {

    state={
        modelo:'',
        nombre:'',
        urll:''
    }

    

    editar() {
        if(this.state.modelo !== this.props.modelo){
        firebase.database().ref('/post/' + this.props.post.modelo ).set({
            modelo: this.state.modelo,
        }).then(()=>{
            window.alert('editado')
            window.open('/app',"_self");
    });
    }
        if(this.state.nombre !== this.props.post.nombre){
        firebase.database().ref('/post/' + this.props.post.nombre ).set({
            nombre: this.state.nombre,
        });
    }
        if(this.state.urll !== this.props.post.url){
        firebase.database().ref('/post/' + this.props.post.url ).set({
            url: this.state.urll,
        });
    }
    window.alert('borrado');
    }

    borrar() {
        firebase.database().ref('/post/' + this.props.post.nombre ).set(null).then(()=>window.alert('borrado'));
    }

    handleUploadSuccess = (filename) => {
        
        firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({urll: url}));
    };

     openModal =() => {
        this.setState({modalIsOpen: !this.state.modalIsOpen});
      }


    render(){
        return(
            <Modal isOpen={this.props.open} >
            <div className='modalcontain' >


                <div className='modalwrap'>

                <button className='closemoda' >X</button>
                <img src={require('../assets/img/car.png')} className='logo' />
                <h2>Editar</h2>
                <form  >
                        <input type='text' placeholder={this.props.post.modelo}  onChange={(e)=>{this.setState({modelo:e.target.value})}} />
                        <input type='text' placeholder={this.props.post.nombre} onChange={(p)=>{this.setState({nombre:p.target.value})}} />
                        <FileUploader
                            accept="image/*"
                            name="avatar"
                            randomizeFilename
                            storageRef={firebase.storage().ref('images')}
                            onUploadSuccess={this.handleUploadSuccess}
                            />
                    </form>
                    <button onClick={()=>{this.editar()}} className='edit'>Editar</button>
                    <button className='edit'>borrar</button>
                </div>
            </div>
            </Modal>
        )
    }
}

export default Modala;