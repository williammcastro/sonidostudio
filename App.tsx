//inicio de la app para config de react_native_audio_toolkit
import React from 'react'

import { Text, View, StyleSheet, StatusBar } from 'react-native'

import MusicPlayer from './src/components/MusicPlayer';
import { MusicPlayerRNTK } from './src/components/MusicPlayerRNTK';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* <MusicPlayer /> */}
      <MusicPlayerRNTK />
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