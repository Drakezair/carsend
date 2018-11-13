import React,{PureComponent} from 'react';
import '../css/dash.css';
import * as firebase from "firebase";
import FileUploader from 'react-firebase-file-uploader';
import {Link} from 'react-router-dom';



import Card from '../component/card';
require('firebase/storage');
require('firebase/database');
require('firebase/auth');





class Dashboard extends PureComponent {

    state={
        user: null,
        nombre:'',
        modelo: '',
        d:'',
        url:'',
        posts:[]
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            if(user != null) {
                firebase.database().ref(`users/${user.uid}`).once('value',snap=>{
                    this.setState({
                        nombre: snap.val().nombre,
                        user: user
                    })
                });

                firebase.database().ref(`users/${user.uid}/posts`).on('child_added', snapshot => {
                    this.setState({
                        posts: this.state.posts.concat(snapshot)
                    })
                });
            }
        })
    }

    upload() {
        firebase.database().ref(`users/${this.state.user.uid}/posts/`).push({
            modelo: this.state.modelo,
            nombre : this.state.d,
            url: this.state.url
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
       
    
    render(){
        
        return(
            <div className='contain'>
                <div className='left'>
                    <div className='AvatarContain'>
                        <img src={require('../assets/img/car.png')} alt='avatar' className='avatar' />
                        <h2 className='Nombre'>{this.state.nombre}</h2>
                    </div>
                    <div className='upContain' >
                        <form>
                            <input type='text' onChange={(s)=>{this.setState({modelo:s.target.value})}} placeholder='Modelo del auto' />
                            <input type='text' onChange={(d)=>{this.setState({d:d.target.value})}} placeholder='Dueño'/>
                            <label>Sube una imagen</label>
                            <FileUploader
                            accept="image/*"
                            name="avatar"
                            randomizeFilename
                            storageRef={firebase.storage().ref('images')}
                            onUploadSuccess={this.handleUploadSuccess}
                            />
                        </form>
                        <button onClick={()=>{this.upload()}} className='upload'>Subir</button>
                    </div>

                    <Link to='/' onClick={()=>{firebase.auth().signOut()}} className='salir' >Log Out</Link>
                </div>
                <div className='right'>
                    {
                        this.state.posts.map((post,i)=>{
                            return <Card key={i} post={post} />;
                            
                        }).reverse()
                    }
                </div>
            </div>
        )
    }
}

export default Dashboard;
