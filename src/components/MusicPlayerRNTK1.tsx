// Reproductor Grabador RNTK - React Native Community Audio Toolkit
// Esta libreria graba y reproduce simultaneamente y permite funcioanmiendo en background

//modificando el primero q hice q funciona ok el RNTK0, 
//funcionando ok el reproductor y el grabador manejando el estado mediante useState
//falta q cuando termine la grabacion se pueda reproducir lo grabado
//error cuando se presiona boton de stop en el reproductor sin haber iniciado la reproduccion
//no se como se reproduce desde una ubicacion del dispositivo como el RNTP


import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Platform, PermissionsAndroid } from 'react-native'
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS, { ReadDirItem } from 'react-native-fs';


export const PlaybackCategories = {
  Playback: 1,
  Ambient: 2,
  SoloAmbient: 3,
}
const defaultPlayerOptions = {
  autoDestroy: false,//'false' hace que se repita en loop pero funciona en conjunto con sonidoPlayer.looping=true
  continuesToPlayInBackground: false,
  category: PlaybackCategories.Playback,
  mixWithOthers: false,
};

const defaultRecorderOptions = {
  bitrate: 256000,
  channels: 2,
  sampleRate: 44100,
  quality: 'max',
  encoder: 'mp3',
  format: 'mp3',
  autoDestroy: false,
};


export const MusicPlayerRNTK1 = () => {

  const pathAudio = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3'; //Ruta correcta de recurso en internet - funca ok
  // const pathAudio2 = 'test.mp4'; //ruta correcta para ios - funca ok
  
  // const pathAudio2 = '/var/mobile/Containers/Data/Application/4A94E88E-BCBD-464D-AE7F-1FE2295FB805/Documents/test.mp4';
  // const pathAudio2 = '/grabacion/test.mp4';
  // const pathAudio = 'test2.mp4';
  const pathAudio2 = 'test.mp4'; //ruta correcta para ios - funca ok

  

  //MANEJO DE ESTADOS PARA EL REPRODUCTOR Y GRABADOR
  const [sonidoPlayer1, setSonidoPlayer1] = useState<Player>(new Player(pathAudio2, defaultPlayerOptions));
  const [sonidoPlayer2, setSonidoPlayer2] = useState<Player>(new Player(pathAudio, defaultPlayerOptions));
  const [sonidoRecord, setSonidoRecord] = useState<Recorder>(new Recorder(pathAudio2, defaultRecorderOptions));

  //Estados del reproductor para el tiempo, porcentaje y estado
  const [playerState, setPlayerState] = useState(MediaStates.IDLE);
  const [porcentPlayed, setporcentPlayed] = useState(0);
  const [secondsPlayed, setSecondsPlayed] = useState(0);
  //FIN DE MANEJO DE ESTADOS PARA EL REPRODUCTOR Y GRABADOR


  //MANEJO DE ESTADOS PARA EL MANEJO DE ALMACENAMIENTO
  const [downloadsFolder, setDownloadsFolder] = useState('');
  const [documentsFolder, setDocumentsFolder] = useState('');
  const [externalDirectory, setExternalDirectory] = useState('');
  const [fileData, setFileData] = useState<string | undefined>();



  const [files, setFiles] = useState<ReadDirItem[]>([]);

  //FIN MANEJO DE ESTADOS PARA EL MANEJO DE ALMACENAMIENTO


  //FUNCION DE PRUEBA PARA VER LOS ESTADOS DEL REPRODUCTOR Y GRABADOR
  
  
  const filePath = RNFS.DocumentDirectoryPath + "/grabacion1/joke.txt";
  const fileContent = "Why do programmers wear glasses? \n They can't C#!";



  const funcTest = () => {
    // console.log('este es sonidoPlayer1 en funcTest: ', sonidoPlayer1);
    // // console.log('este es sonidoPlayer2 en funcTest: ', sonidoPlayer2);
    // console.log('este es sonidoRecord en funcTest: ', sonidoRecord);


    // console.log('esta es la ruta de sonidoRecord en funcTest: ', sonidoRecord.fsPath);
    // console.log('RNFS.DownloadDirectoryPath : ', RNFS.DownloadDirectoryPath)
    // console.log('RNFS.DocumentDirectoryPath : ', RNFS.DocumentDirectoryPath)
    // console.log('RNFS.ExternalStorageDirectoryPath : ', RNFS.ExternalStorageDirectoryPath)
    
    // console.log('RNFS.DocumentDirectoryPath : ', RNFS.mkdir(RNFS.DocumentDirectoryPath + '/grabacion1'));
    // makeFile(filePath, fileContent);
    // getFileContent(RNFS.DocumentDirectoryPath);
    // console.log('este es getFileContent : ', getFileContent(RNFS.DocumentDirectoryPath + '/grabacion1'));
    const leido = readFile(RNFS.DocumentDirectoryPath + '/grabacion1/joke.txt');
    console.log('este es el resultado del clg de readFile sale el objeto raro!: ',leido);
  }


  const makeFile = async (filePath: string, content: string) => {
    try {
      //create a file at filePath. Write the content data to it
      await RNFS.writeFile(filePath, content, "utf8");
      console.log("written to file");
    } catch (error) { //if the function throws an error, log it out.
      console.log(error);
    }
  };

  //useEffect DE PRUEBA PARA REVISAR LO Q PROPORCIONA LA LIBRERIA
  // useEffect(() => {
  //   //get user's file paths from react-native-fs
  //   setDownloadsFolder(RNFS.DownloadDirectoryPath);
  //   setDocumentsFolder(RNFS.DocumentDirectoryPath); //alternative to MainBundleDirectory.
  //   setExternalDirectory(RNFS.ExternalStorageDirectoryPath);
  // }, []);



  const getFileContent = async (path: string) => {
    const reader = await RNFS.readDir(path);
    setFiles(reader);
  };

  const readFile = async (path: string) => {
    const response = await RNFS.readFile(path);
    console.log('este es el resultado dentro de reaFile de response OK: ',response);
    setFileData(response); //set the value of response to the fileData Hook.
  };


  //FUNCION PLAY DEL REPRODUCTOR 1
  const play1 = () => {
    sonidoPlayer1.prepare((err) => {
      if (err) {
        console.log('error', err);
        return;
      } else {
        sonidoPlayer1.looping = true;
        sonidoPlayer1.play((err) => {
          if (err) {
            console.log('error', err);
            return;
          }
        });
        setSonidoPlayer1(sonidoPlayer1);
        setPlayerState(MediaStates.PLAYING);
      };
    });
      // sonidoPlayer1 = new Player( pathAudio2, defaultPlayerOptions);//forma basica de crear un player
      console.log('este es play1, este es sonidoPlayer1 : ', sonidoPlayer1 );//Descomentar para ver el objeto
  };


  //useEffect PARA CALCULAR EL TIEMPO DE REPRODUCCION Y EL PORCENTAJE DE REPRODUCCION CADA SEGUNDO
  useEffect(() => {
    let interval: number;
    if (playerState === MediaStates.PLAYING) {
      interval = setInterval(() => {
        setporcentPlayed(Math.floor( 100 * sonidoPlayer1.currentTime / sonidoPlayer1.duration));
        setSecondsPlayed(Math.max(0, sonidoPlayer1.currentTime));
      }, 1000);
    }
    console.log('este es playerState en useEffect: ', playerState);
    return () => clearInterval(interval);
  }, [playerState]);



  //UseEffect PARA SOLICITAR PERMIOS DE USO DE MICROFONO Y ALMACENAMIENTO
  useEffect(() => {
    requestPermissions();
    return () => {
      // cleanup por hacer
    }
  }, []);

    //FUNCION PARA FORMATEAR EL TIEMPO DE REPRODUCCION
    const formatTime = (time: number): string =>{
      let minutes: number = Math.floor(time / 60000);
      if (minutes < 0) {minutes = 0}
      // let seconds: number = ((time % 60000) / 1000).toFixed(0);
      let seconds: number | string = Math.floor(time % 60000 / 1000);
      if (seconds < 0) {seconds = 0}
      seconds = seconds < 10 ? '0' + seconds : seconds;
      return (minutes < 10 ? '0' : '') + minutes + ':' + seconds;
    }
    
    //LIGADO AL useEffect PARA FORMATEAR EL TIEMPO DE REPRODUCCION
    const formattedTime: string = formatTime(secondsPlayed);


    const play2 = () => {
      sonidoPlayer2.prepare((err) => {
        if (err) {
          console.log('error', err);
          return;
        } else {
          sonidoPlayer2.looping = true;
          sonidoPlayer2.play((err) => {
            if (err) {
              console.log('error', err);
              return;
            }
          });
          setSonidoPlayer2(sonidoPlayer2);
          setPlayerState(MediaStates.PLAYING);
        };
      });
      console.log('este es play2, este es sonidoPlayer2 : ', sonidoPlayer2 );//Descomentar para ver el objeto
    };
  
    
    //FUNCION STOP DEL REPRODUCTOR 1
    const stop = () => {
      console.log('este es sonidoPlayer1 en stop: ', sonidoPlayer1);
      sonidoPlayer1.stop((err) => {
          if (err) {
              console.log('error', err);
              return;
          }
      });
      setPlayerState(MediaStates.IDLE);
    };


    //FUNCION STOP DEL REPRODUCTOR 2
    const stop2 = () => {
      console.log('este es sonidoPlayer2 en stop: ', sonidoPlayer2);
      sonidoPlayer2.stop((err) => {
          if (err) {
              console.log('error', err);
              return;
          }
      });
    };


    //FUNCION PAUSE DEL REPRODUCTOR 1
    const pause = () => {
      sonidoPlayer1.pause((err) => {
          if (err) {
              console.log('error', err);
              return;
          }
      });
      console.log('este es sonidoPlayer1 en pause: ', sonidoPlayer1);
      setPlayerState(MediaStates.PAUSED);
    };


    //FUNCION PARA SOLICITAR PERMISOS DE USO DE MICROFONO Y ALMACENAMIENTO
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


    //FUNCION PARA PREPARE E INICIO DE LA GRABACION
    const record = () => {
      // sonidoRecord.stop();
      sonidoPlayer1.stop();
      sonidoPlayer2.stop();
      // sonidoRecord.destroy();
      // sonidoPlayer1.destroy();

      console.log('iniciando grabacion');
      // console.log('este es MediaStates en RECORDING : ', MediaStates);
      // console.log('este es sonidoRecord en RECORDING : ', sonidoRecord);
      sonidoRecord.prepare((err, fspath) => {
        if (err) {
          console.log('recorder preparew failed: ', err);
        } 
        else if (!err) {
          // props.onFileURIChange(fspath);
          console.log('fspath: ', fspath);
          sonidoRecord.record((err) => {
            if (err) {
                console.log('error', err);
                return;
            }
              console.log('grabando............');
              //TODO: revisar donde se va a guardar el audio
              setSonidoRecord(sonidoRecord);
              setPlayerState(MediaStates.RECORDING);
              console.log(sonidoRecord.fsPath);
          })
        };
      })
    };


    //FUNCION PARA PARAR LA GRABACION
    const stopRecord = () => {
      console.log('parando record');
      console.log('este es sonidoRecord en record: ', sonidoRecord);
      sonidoRecord.stop((err) => {
        if (err) {
            console.log('error', err);
            return;
        }
        setPlayerState(MediaStates.IDLE);
        //TODO: desrtuir el objeto sonidoRecord al final y crear uno nuevo? o crearlo en el record?
        // setSonidoPlayer1({ path: pathAudio, });
      });
      console.log('este es sonidoRecord.fsPath : ',sonidoRecord.fsPath );
      console.log('este es sonidoRecord.isPrepared : ',sonidoRecord.isPrepared );
      console.log('este es sonidoRecord.isRecording : ',sonidoRecord.isRecording );
    };


    //FUNCION PARA PAUSAR LA GRABACION
    const pauseRecord = () => {
      console.log('pausando record');
      console.log('este es sonidoRecord en record: ', sonidoRecord);
      sonidoRecord.pause((err) => {
        if (err) {
            console.log('error', err);
            return;
        }
        setPlayerState(MediaStates.PAUSED);
      });
    };



  
    return (
      <View>
          <Text style={ styles.title }>MusicPlayer - RNTK1</Text>
        <View style={ styles.musicControls} >
          <TouchableOpacity onPress={() => play1()}>
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



          <Text style={ styles.title } >{ porcentPlayed } %</Text>
          <Text style={ styles.title } >{ formattedTime } Sec</Text>


          <Text style={styles.title }>MusicRecorder - RNTK1</Text>
        <View style={ styles.musicControls} >
          <TouchableOpacity onPress={() => record()}>
            <MaterialCommunityIcons name="record-rec" size={44} color="red" style={{marginTop:15}} />
            {/* <MaterialCommunityIcons name="account-voice" size={35} color="#ffd369" style={{marginTop:20}} /> */}
            {/* <Icon name="mic" size={35} color="#ffd369" style={{marginTop:20}} /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => stopRecord()}>
            <Icon name="ios-stop-circle" size={35} color="#ffd369" style={{marginTop:20}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pauseRecord()}>
            <Icon name="ios-pause-circle" size={35} color="#ffd369" style={{marginTop:20}} />
          </TouchableOpacity>
        </View>
          <TouchableOpacity onPress={() => funcTest()}>
            <Icon name="ios-play-circle" size={35} color="#ffd369" style={{marginTop:20}} />
          </TouchableOpacity>

          {/* <Text> Downloads Folder: {downloadsFolder}</Text>
          <Text>Documents folder: {documentsFolder}</Text>
          <Text>External storage: {externalDirectory}</Text> */}

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


