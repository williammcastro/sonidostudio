import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import {
    Player,
    Recorder,
    MediaStates
} from '@react-native-community/audio-toolkit';

export const MusicPlayerRNTK = () => {


    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);

    const sonidoPlayer1 = new Player( 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3');

    // useEffect(() => {
      
    //   const sonidoPlayer1 = new Player(
    //     'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
    //   ).prepare((err) => {
    //     if (err) {
    //       console.log('error', err);
    //       return;
    //     }
    //   });
    
    //   return () => {
    //     // cleanup
    //   }
    // }, []);
    
  
    const play = () => {
      console.log('este es sonidoPlayer1 en play: ', sonidoPlayer1);
      sonidoPlayer1.play((err) => {
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


    const pause = () => {
      sonidoPlayer1.pause((err) => {
          if (err) {
              console.log('error', err);
              return;
          }
      });
      console.log('este es sonidoPlayer1 en pause: ', sonidoPlayer1);
    };
  
    return (
      <View>
        <Text style={{ color: 'white' }}>MusicPlayerRNAT</Text>
        <TouchableOpacity onPress={() => play()}>
          <Text style={{ color: 'white' }}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => stop()}>
          <Text style={{ color: 'white' }}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pause()}>
          <Text style={{ color: 'white' }}>Pause</Text>
        </TouchableOpacity>
      </View>
    );
  };




