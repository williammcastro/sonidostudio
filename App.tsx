//inicio de la app para config de react_native_audio_toolkit
import React from 'react'

import { View, StyleSheet, StatusBar } from 'react-native'

import MusicPlayer from './src/components/MusicPlayer';
import { MusicPlayerRNTK1 } from './src/components/MusicPlayerRNTK1';
import { MusicPlayerRNTK0 } from './src/components/MusicPlayerRNTK0';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* <MusicPlayer /> */}
      {/* <MusicPlayerRNTK0 /> */}
      <MusicPlayerRNTK1 />
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