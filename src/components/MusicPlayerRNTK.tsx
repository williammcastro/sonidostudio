// Reproductor Grabador RNTK - React Native Community Audio Toolkit
// Esta libreria graba y reproduce simultaneamente y permite funcioanmiendo en background


import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Platform, PermissionsAndroid } from 'react-native'

import {
    Player,
    Recorder,
    MediaStates
} from '@react-native-community/audio-toolkit';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export const MusicPlayerRNTK = () => {

  const filename = 'test.mp4';

  const sonidoRecord = new Recorder(filename, {
    bitrate: 256000,
    channels: 2,
    sampleRate: 44100,
    quality: 'max',
    encoder: 'mp3',
    format: 'mp3',
  });

    // const [player1, setPlayer1] = useState(null);
    // const [player2, setPlayer2] = useState(null);

    // const sonidoRecord = new Recorder('../assets/songs/hola.mp3');
    
    // const sonidoPlayer1 = new Player( filename);
    // const sonidoPlayer2 = new Player( 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', {autoDestroy: false} );
    let sonidoPlayer1 = new Player( '' );
    let sonidoPlayer2 = new Player( '' );
    
    // const sonidoPlayer1 = new Player( '06-mountain-path.mp3');
    // const sonidoPlayer1 = new Player( '../assets/songs/10-emotional-cinematic.mp3' );
    // const sonidoPlayer1 = new Player( '../../assets/songs/10-emotional-cinematic.mp3' );
    // const sonidoPlayer1 = new Player( '/Users/wlx4/Documents/workspace/reactnative/sonidostudio/assets/songs/06-mountain-path.mp3' );
    
    useEffect(() => {
      
      requestPermissions();
      
      // const sonidoPlayer1 = new Player(
      //   'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
      // ).prepare((err) => {
      //   if (err) {
      //     console.log('error', err);
      //     return;
      //   }
      // });
    
      return () => {
        // sonidoPlayer1.
        // cleanup
      }
    }, []);
    
  
    const play = () => {
      sonidoPlayer1 = new Player( filename, {autoDestroy: false});
      console.log('este es sonidoPlayer1 VOZ en play: ', sonidoPlayer1 );
      sonidoPlayer1.play((err) => {
        if (err) {
            console.log('error', err);
            return;
        }
      });
    };


    const play2 = () => {
      sonidoPlayer2 = new Player( 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', {autoDestroy: false} );
      console.log('este es sonidoPlayer2 fondo en play2: ', sonidoPlayer2);
      sonidoPlayer2.play((err) => {
        if (err) {
            console.log('error', err);
            return;
        }
      });
    };
  
  
    const stop = () => {
      sonidoPlayer1.stop((err) => {
          if (err) {
              console.log('error', err);
              return;
          }
      });
      console.log('este es sonidoPlayer1 en stop: ', sonidoPlayer1);
    };


    const stop2 = () => {
      sonidoPlayer2.stop((err) => {
          if (err) {
              console.log('error', err);
              return;
          }
      });
      console.log('este es sonidoPlayer2 en stop: ', sonidoPlayer2);
    };


    const pause = () => {
      sonidoPlayer1.pause((err) => {
          if (err) {
              console.log('error', err);
              return;
          }
      });
      console.log('este es sonidoPlayer1 en pause: ', sonidoPlayer1);
    };



    const requestPermissions = async () => {
      console.log('permissionGranted');
      if (Platform.OS === 'android') {
        try {
          const grants = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            // PermissionsAndroid.PERMISSIONS.ACCESS_NETWORK_STATE,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);
      
          console.log('write external stroage', grants);
      
          if (
            grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.READ_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.RECORD_AUDIO'] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Permissions granted');
          } else {
            console.log('All required permissions not granted');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
    };


    const record = () => {
      sonidoRecord.stop();
      sonidoPlayer1.stop();
      sonidoRecord.destroy();
      sonidoPlayer1.destroy();

      console.log('iniciando grabacion');
      console.log('este es MediaStates.RECORDING : ', MediaStates);
      console.log('este es sonidoRecord en record: ', sonidoRecord);
      sonidoRecord.record((err) => {
        if (err) {
            console.log('error', err);
            return;
        }else{
          console.log('grabando............');
        }
      });
    };


    const stopRecord = () => {
      console.log('parando record');
      sonidoRecord.stop((err) => {
        if (err) {
            console.log('error', err);
            return;
        }
      });
    };


    const pauseRecord = () => {
      console.log('pausando record');
      sonidoRecord.pause((err) => {
        if (err) {
            console.log('error', err);
            return;
        }
      });
    };






    // //FUNCIONES PARA GRABAR AUDIO
    // _reloadRecorder() {
    //   if (this.recorder) {
    //     this.recorder.destroy();
    //   }
  
    //   this.recorder = new Recorder(filename, {
    //     bitrate: 256000,
    //     channels: 2,
    //     sampleRate: 44100,
    //     quality: 'max'
    //   });
  
    //   this._updateState();
    // }
  
    // _toggleRecord() {
    //   if (this.player) {
    //     this.player.destroy();
    //   }
  
    //   let recordAudioRequest;
    //   if (Platform.OS == 'android') {
    //     recordAudioRequest = this._requestRecordAudioPermission();
    //   } else {
    //     recordAudioRequest = new Promise(function (resolve, reject) { resolve(true); });
    //   }
  
    //   recordAudioRequest.then((hasPermission) => {
    //     if (!hasPermission) {
    //       this.setState({
    //         error: 'Record Audio Permission was denied'
    //       });
    //       return;
    //     }
  
    //     this.recorder.toggleRecord((err, stopped) => {
    //       if (err) {
    //         this.setState({
    //           error: err.message
    //         });
    //       }
    //       if (stopped) {
    //         this._reloadPlayer();
    //         this._reloadRecorder();
    //       }
  
    //       this._updateState();
    //     });
    //   });
    // }


    // // FUNCION PARA SOLICITAR PERMISOS DE GRABACION DE AUDIO
    // async _requestRecordAudioPermission() {
    //   try {
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    //       {
    //         title: 'Microphone Permission',
    //         message: 'ExampleApp needs access to your microphone to test react-native-audio-toolkit.',
    //         buttonNeutral: 'Ask Me Later',
    //         buttonNegative: 'Cancel',
    //         buttonPositive: 'OK',
    //       },
    //     );
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   } catch (err) {
    //     console.error(err);
    //     return false;
    //   }
    // }






  
    return (
      <View>
          <Text style={ styles.title }>MusicPlayer - RNTK</Text>
        <View style={ styles.musicControls} >
          <TouchableOpacity onPress={() => play()}>
            <Icon name="ios-play-circle" size={35} color="#ffd369" style={{marginTop:20}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => play2()}>
            <Icon name="ios-play-circle" size={35} color="#ffd369" style={{marginTop:20}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => stop()}>
            <Icon name="ios-stop-circle" size={35} color="#ffd369" style={{marginTop:20}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => stop2()}>
            <Icon name="ios-stop-circle" size={35} color="#ffd369" style={{marginTop:20}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pause()}>
            <Icon name="ios-pause-circle" size={35} color="#ffd369" style={{marginTop:20}} />
          </TouchableOpacity>
        </View>

          <Text style={styles.title }>MusicRecorder - RNTK</Text>
        <View style={ styles.musicControls} >
          <TouchableOpacity onPress={() => record()}>
            {/* <MaterialCommunityIcons name="account-voice" size={35} color="#ffd369" style={{marginTop:20}} /> */}
            <MaterialCommunityIcons name="record-rec" size={35} color="#ffd369" style={{marginTop:20}} />
            {/* <Icon name="mic" size={35} color="#ffd369" style={{marginTop:20}} /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => stopRecord()}>
            <Icon name="ios-stop-circle" size={35} color="#ffd369" style={{marginTop:20}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pauseRecord()}>
            <Icon name="ios-pause-circle" size={35} color="#ffd369" style={{marginTop:20}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  const styles = StyleSheet.create({
    musicControls: {
      color: 'red',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '60%',
      // marginTop: 1,
    },
    title: { 
      color: '#eeeeee', 
      fontSize: 18, 
      fontWeight: '600', 
      textAlign: 'center',
      marginTop: 30,
    },
});

