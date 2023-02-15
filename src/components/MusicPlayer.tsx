import React, { useEffect, useRef, useState } from 'react'
import { 
  Text, 
  View, 
  StyleSheet, 
  SafeAreaView, 
  Dimensions, 
  TouchableOpacity, 
  Image, 
  FlatList,
  Animated
} from 'react-native';

import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  } from 'react-native-track-player';

import Slider from '@react-native-community/slider';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Importar el archivo json con las canciones, titulo, artista, etc
import songs from '../../model/musicdata';

//hook para saber el tamaño de la pantalla
const { width, height } = Dimensions.get('window');


// Funcion para inicializar el player - debe lanzarse en el useEffect
const setupPlayer = async () => {
    const song1 = await TrackPlayer.setupPlayer();
    await TrackPlayer.add(songs);
  }




//Funcion para alternar entre play y pause de acuerdo al playbackState
const togglePlayback = async (playbackState) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  // console.log('este es playbackState: ', playbackState);
  // console.log('currentTrack: ', currentTrack);

  if (currentTrack != null) {
    if (playbackState === State.Playing) {
      await TrackPlayer.pause();
    }else{
      // console.log('tocando la cancion :', currentTrack);
      await TrackPlayer.play();
    }
  }
}




//FUNCION PRINCIPAL DE LA APP
const MusicPlayer = () => {
//ESTADOS DE LA APP
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const [ trackArtwork, setTrackArtwork ] = useState();
  const [ trackArtist, setTrackArtist ] = useState();
  const [ trackTitle, setTrackTitle ] = useState();

  
  //ESTADOS DE LA APP para el index de la cancion y el modo de repetición
  const [ songIndex, setSongIndex ] = useState(0);
  const [ repeatMode, setRepeatMode ] = useState('off');
  
  //useRef para el scroll horizontal
  const scrollx = useRef(new Animated.Value(0)).current;

  //useRef para el scroll horizontal al inicio
  const songSlider = useRef(null);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    // console.log('este es event: ', event);
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      // console.log('este es track: ', track);
      const { title, artist, artwork } = track;
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });


  //Funcion para cambiar el icono en la GUI de la app
  const repeatIcon = () => {
    if (repeatMode === 'off') {
      return 'repeat-off';
    }else if (repeatMode === 'track') {
      return 'repeat-once';
    }else if (repeatMode === 'repeat') {
      return 'repeat';
    }
  }

  //Funcion para cambiar el modo de repetición
  const changeRepeatMode = () => {
    if (repeatMode === 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    }else if (repeatMode === 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat');
      TrackPlayer.setRepeatMode(RepeatMode.Off);
    }else if (repeatMode === 'repeat') {
      setRepeatMode('off');
    }
  }

  //Funcion para avanzar a la siguiente cancion
  const skipTo = async (trackId) => {
    await TrackPlayer.skip(trackId);
    // await TrackPlayer.play();
  }

  //useEffect para el inicio de la app
  useEffect(() => {
    setupPlayer();
    scrollx.addListener(({value}) => {
      // console.log(value);
      const index = Math.round(value / width);
      skipTo(index);
      setSongIndex(index);
      // console.log('Index : ', index);
      // console.log( 'Scroll x : ', scrollx )
    });
    return () => {
      scrollx.removeAllListeners();
    }
  }, []);


  //Funcion para avanzar a la siguiente cancion en la GUI
  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width
    });
  }

  //Funcion para retroceder a la cancion anterior en la GUI
  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width
    });
  }


  //Funcion para colocar la imagen y el titulo de la cancion en la GUI
  const renderSongs = ({index, item}) => {
    return (
      <Animated.View style={{
        width : width,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor : 'black',
      }}>
        <View style={styles.artworkWrapper}>
          <Image 
            source={trackArtwork}
            style={styles.artworkImage}
          />
        </View>
      </Animated.View>
    );
  }
      



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={{width: width}}>
          <Animated.FlatList
            ref={songSlider}
            data={songs}
            renderItem={renderSongs}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {
                contentOffset: {x: scrollx}
              }}],
              {useNativeDriver: true}
            )}
          />
        </View>
 
        <View>
          <Text style={styles.title}>{trackTitle}</Text>
          <Text style={styles.artist}>{trackArtist}</Text>
        </View>

        <View>
          <Slider 
            style={styles.progressContainer}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#ffd369"
            minimumTrackTintColor="#ffd369"
            maximumTrackTintColor="#fff"
            onSlidingComplete={async(value)=>{
              await TrackPlayer.seekTo(value);
            }}
          />
          <View style={styles.progressLabelContainer}>
            <Text style={styles.ProgressLabelTxt} >
              {new Date(progress.position * 1000).toISOString().substr(14, 5)}
              
            </Text>
            <Text style={styles.ProgressLabelTxt} >
              {new Date((progress.duration - progress.position ) * 1000).toISOString().substr(14, 5)}
            </Text>
          </View>
        </View>

        <View style={ styles.musicControls} >
          <TouchableOpacity onPress={skipToPrevious}>
            <Icon name="play-skip-back-outline" size={35} color="#ffd369" style={{marginTop:20}} />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> togglePlayback(playbackState)}>
            <Icon name={ playbackState === State.Playing ? "ios-pause-circle" : "ios-play-circle"} size={75} color="#ffd369" />
          </TouchableOpacity>

          <TouchableOpacity onPress={skipToNext}>
            <Icon name="play-skip-forward-outline" size={35} color="#ffd369" style={{marginTop:20}}/>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomContainer} >
        <View style={ styles.bottomControls}>
          <TouchableOpacity onPress={()=>{}}>
            <Icon name="heart-outline" size={30} color="#777777" />
          </TouchableOpacity>

          <TouchableOpacity onPress={changeRepeatMode}>
            <MaterialCommunityIcons name={`${repeatIcon()}`} size={30} color={ repeatMode != 'off' ? "#ffd369" : "#777777" } />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{}}>
            <Icon name="share-outline" size={30} color="#777777" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>{}}>
            <Icon name="ellipsis-horizontal" size={30} color="#777777" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}


export default MusicPlayer;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#222831',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#222831',
        alignItems: 'center',
        justifyContent: 'center',
    },
    artworkWrapper: {
      width: 300,
      height: 340,
      marginBottom: 25,
      shadowColor: '#ccc',
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
      elevation: 8,
      borderRadius: 15,
    },
    artworkImage: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
    },
    title: { 
      color: '#eeeeee', 
      fontSize: 18, 
      fontWeight: '600', 
      textAlign: 'center' 
    },
    artist:{ 
      color: '#eeeeee', 
      fontSize: 14, 
      textAlign: 'center'
    },
    progressContainer: {
      width: 340,
      height: 40,
      marginTop: 25,
      flexDirection: 'row',
    },
    progressLabelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 340,
    },
    ProgressLabelTxt: {
      color: '#fff',
      fontSize: 12,
    },
    musicControls: {
      // color: 'red',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '60%',
      marginTop: 15,
    },
    bottomContainer: {
      borderTopColor: '#393e46',
      borderTopWidth: 1,
      width: width,
      alignItems: 'center',
      paddingVertical: 15,
    },
    bottomControls: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      width: '80%' 
    },
});
