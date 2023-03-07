// Reproductor Grabador RNTK - React Native Community Audio Toolkit
// Esta libreria graba y reproduce simultaneamente y permite funcioanmiendo en background
//el _playerId se puede ver en el objeto sonidoPlayer1 y el stop funciona si el playerId coincide con el q esta reproduciendo
// cada q se presiona play se crea un nuevo objeto y no se destruye el anterior
// el contador del _playerId se incrementa en 1 cada vez q se crea un nuevo objeto, pero no tengo control sobre el _playerId por q es una var privada
//la grabacion funciona ok pero tampoco he visto si me saca el tiempo de grabacion
//segun la libreria dice q necesita un listener para que funcione el contador de tiempo de reproduccion
//hay un sonido al inicio de la grabacion como de un golpe, hay q ver si con la funcion prepare() se quita - en el otro celu no tiene ese problema, el mic esta ok!!!
//



import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Platform, PermissionsAndroid, NativeAppEventEmitter, DeviceEventEmitter, NativeModules } from 'react-native'
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export const PlaybackCategories = {
  Playback: 1,
  Ambient: 2,
  SoloAmbient: 3,
}
const defaultPlayerOptions = {
  autoDestroy: true,//hace que se repita en loop pero funciona en conjunto con looping
  continuesToPlayInBackground: false,
  category: PlaybackCategories.Playback,
  mixWithOthers: false,
};



export const MusicPlayerRNTK0 = () => {

  const [state, setState] = useState(MediaStates.IDLE);

  const pathAudio2 = 'test.mp4';
  const pathAudio = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3';

  const sonidoRecord = new Recorder(pathAudio2, {
    bitrate: 256000,
    channels: 2,
    sampleRate: 44100,
    quality: 'max',
    encoder: 'mp3',
    format: 'mp3',
  });

    
    let sonidoPlayer1 = new Player( '' );
    let sonidoPlayer2 = new Player( '' );
    // let sonidoPlayer1 : Player;
    // let sonidoPlayer2 : Player;
    
    useEffect(() => {
      
      requestPermissions();
      
      return () => {
        // cleanup
      }
    }, []);

    const [timeCounter, settimeCounter] = useState(0);

    const [currentTime, setCurrentTime] = useState<number>(0);


    //useEffect para mostrar el tiempo de reproduccion cada segundo
    // useEffect(() => {
    //   console.log('ejecutando useEffect de currentTime');
    //   const timer = setInterval(() => {
    //     setCurrentTime(sonidoPlayer1.currentTime * 1000); // convierte el tiempo en segundos a milisegundos
    //     // console.log('imprimiendo cada segundo')
    //     // console.log('este es currenTime dentro del useEffect: ', currentTime);
    //   }, 1000);
    //   return () => clearInterval(timer);
    // }, [sonidoPlayer1]);

    const formatTime = (time: number): string =>{
      let minutes: number = Math.floor(time / 60000);
      if (minutes < 0) {minutes = 0}
      // let seconds: number = ((time % 60000) / 1000).toFixed(0);
      let seconds: number | string = Math.floor(time % 60000 / 1000);
      if (seconds < 0) {seconds = 0}
      seconds = seconds < 10 ? '0' + seconds : seconds;
      return (minutes < 10 ? '0' : '') + minutes + ':' + seconds;
    }
    
    const formattedTime: string = formatTime(currentTime);
    console.log(formattedTime); // muestra "02:03" en la consola



    const play = ( ) => {
      sonidoPlayer1.destroy();
      sonidoPlayer1 = new Player( pathAudio2, defaultPlayerOptions);
      sonidoPlayer1.looping = true;
      // console.log(sonidoPlayer1.state);
      // settimeCounter(sonidoPlayer1.duration);
      // settimeCounter(sonidoPlayer1.currentTime );
      console.log('este es sonidoPlayer1 VOZ en play: ', sonidoPlayer1 );//Descomentar para ver el objeto
      sonidoPlayer1.play((err) => {
        if (err) {
          console.log('error', err);
          return;
        }
      });

      setTimeout(() => {
        let currentProgress = Math.max(0, sonidoPlayer1.currentTime) / sonidoPlayer1.duration;
        console.log('este es currentProgress: ', currentProgress);
        console.log('este es sonidoPlayer1.currentTime: ', sonidoPlayer1.currentTime);
        console.log('este es sonidoPlayer1.duration: ', sonidoPlayer1.duration);
        // console.log('este es timeCounter: ', timeCounter);
        settimeCounter(currentProgress);
      }, 3000);

      // const currentTime: number = sonidoPlayer1.currentTime; // valor de ejemplo
    };
    


    const play2 = () => {
      sonidoPlayer2.destroy();
      sonidoPlayer2 = new Player( pathAudio, defaultPlayerOptions);
      sonidoPlayer2.looping = true;
      console.log('este es sonidoPlayer2 fondo en play2: ', sonidoPlayer2);
      sonidoPlayer2.play((err) => {
        if (err) {
            console.log('error', err);
            return;
        }
      });

      setTimeout(() => {
        let currentProgress = Math.max(0, sonidoPlayer2.currentTime) / sonidoPlayer2.duration;
        console.log('este es currentProgress 2x: ', currentProgress);
        console.log('este es sonidoPlayer2.currentTime: ', sonidoPlayer2.currentTime);
        console.log('este es sonidoPlayer2.duration: ', sonidoPlayer2.duration);
        console.log('este es timeCounter2x: ', timeCounter);
        // settimeCounter(currentProgress);
      }, 2000);
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



          <Text style={ styles.title } >{ currentTime }</Text>
          <Text style={ styles.title } >{ formattedTime }</Text>
          <Text style={ styles.title } >{ sonidoPlayer1.duration }</Text>


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




  //BACKUP PARA TENER EN CUENTA

    // //FUNCIONES PARA GRABAR AUDIO
    // _reloadRecorder() {
    //   if (this.recorder) {
    //     this.recorder.destroy();
    //   }
  
    //   this.recorder = new Recorder(pathAudio2, {
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


