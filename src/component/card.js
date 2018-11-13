import React,{PureComponent} from 'react';
import '../css/card.css';
import FileUploader from 'react-firebase-file-uploader';
import * as firebase from "firebase";
import Modal from 'react-modal';
require('firebase/storage');
require('firebase/database');
require('firebase/auth');


class Card extends PureComponent {

    state={
        modelo:'',
        nombre:'',
        url:'',
        modalIsOpen: false
        }

        componentWillMount(){
            this.setState({
                modelo: this.props.post.val().modelo,
                nombre: this.props.post.val().nombre,
                url: this.props.post.val().url,
            })
        }

        handleUploadSuccess = filename => {
        
            firebase
              .storage()
              .ref("images")
              .child(filename)
              .getDownloadURL()
              .then(url => this.setState({ url: url }));
          };

     openModal =() => {
        this.setState({modalIsOpen: !this.state.modalIsOpen});
        console.log(this.props.post);
      }

      editar(){

        var user = firebase.auth().currentUser.uid;
        firebase.database().ref(`users/${user}/posts/${this.props.post.key}`).set({
            modelo: this.props.post.val().modelo !== this.state.modelo ? this.state.modelo : this.props.post.val().modelo,
            nombre: this.props.post.val().nombre !== this.state.nombre ? this.state.nombre : this.props.post.val().nombre,
            url: this.props.post.val().url !== this.state.url ? this.state.url : this.props.post.val().url,
        })
        window.open('/carsend/app', '_self')
    }
    
    borrar(){
        var user = firebase.auth().currentUser.uid;
        firebase.database().ref(`users/${user}/posts/${this.props.post.key}`).remove();
        window.open('/carsend/app', '_self')
    }

      
      
    

    render() {

        return(
        <div >
                <Modal
              isOpen={this.state.modalIsOpen}
              >
                          <div className='modalcontain' >
    
    
    <div className='modalwrap'>
                          <button className='closemoda' onClick={()=>this.openModal()} >X</button>
    
    
    <img src={require('../assets/img/car.png')} className='logo'  alt='logo' />
    <h2>Editar</h2>
    <form  >
            <input type='text' defaultValue={this.props.post.val().modelo}  onChange={(e)=>{this.setState({modelo:e.target.value})}} />
            <input type='text' defaultValue={this.props.post.val().nombre} onChange={(p)=>{this.setState({nombre:p.target.value})}} />
            <FileUploader
                accept="image/*"
                name="avatar"
                randomizeFilename
                storageRef={firebase.storage().ref('images')}
                onUploadSuccess={this.handleUploadSuccess}
                />
        </form>
        <button onClick={()=>{this.editar()}} className='edit'>Editar</button>
        <button  onClick={()=>{this.borrar()}}className='edit'>borrar</button>
    </div>
    </div>
              </Modal>
            
            <div className='CardContain' onClick={()=>{this.openModal()}}>
            <div
            style={{
                background:`url(${this.props.post.val().url})`,
                height:300, width:300,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                backgroundRepeat:'no-repeat',backgroundSize:'cover'
            }}
            ></div>
            <div className='info' >
            <h3 className='modelo' >{this.props.post.val().modelo}</h3>
            <p className='Dueño' >{this.props.post.val().nombre}</p>
            </div>
            </div>
            </div>
        )
    }
}

export default Card;