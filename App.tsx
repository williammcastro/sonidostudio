//inicio de la app para config de react_native_audio_toolkit
import React from 'react'

import { Text, View, StyleSheet, StatusBar } from 'react-native'

import MusicPlayer from './src/components/MusicPlayer';
import { MusicPlayerRNAT } from './src/components/MusicPlayerRNAT';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* <MusicPlayer /> */}
      <MusicPlayerRNAT />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    alignItems: 'center',
    justifyContent: 'center',
  },
});