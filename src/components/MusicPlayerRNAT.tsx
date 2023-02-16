import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import {
    Player,
    Recorder,
    MediaStates
} from '@react-native-community/audio-toolkit';

export const MusicPlayerRNAT = () => {
    const play = () => {
        const player = new Player('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3').prepare((err) => {
            if (err) {
                console.log('error', err);
                return;
            }
            player.play((err) => {
                if (err) {
                    console.log('error', err);
                    return;
                }
                console.log('playback finished');

                // iOS only: callback will be invoked when audio finishes playing (if it finishes)
                // Android only: callback will be invoked when audio stops (if it stops)
            });
        });
    }

    const stop = () => {
        const player = new Player('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3').prepare((err) => {
            if (err) {
                console.log('error', err);
                return;
            }
            player.stop((err) => {
                if (err) {
                    console.log('error', err);
                    return;
                }
                console.log('playback finished');
            });
        });
    }

    return (
        <View>
            <Text style={{ color: 'white' }}>
                MusicPlayerRNAT
            </Text>
            <TouchableOpacity onPress={() => play()}>
                <Text style={{ color: 'white' }}>
                    Play
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => stop()}>
                <Text style={{ color: 'white' }}>
                    Stop
                </Text>
            </TouchableOpacity>
        </View>
    )
}




