import React, { useRef } from 'react';
import { View, StyleSheet, PanResponder, Dimensions } from 'react-native';
import axios, { HttpStatusCode } from 'axios';
const { width, height } = Dimensions.get('window');

const App = () => {

    const circleRef = useRef(null);
    const circleRef2 =useRef(null);
    
  
    const onPanResponderMove = (evt, gestureState) => {
      const moveX = gestureState.moveX;
  
      // Limita o movimento do círculo dentro da área de 200 pixels
      const left = Math.min(Math.max(moveX, width/2-100), width/2+100);
      circleRef.current.setNativeProps({
        style: {
          left: left - 25,
        }
      });

      const position = left-width/2+100;
      console.log("Posição atual do círculo:", position);

      axios.post('http://192.168.4.1/post', { plain: position.toString() }).then(response => {
        console.log(response.data);
          })
        };

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderMove: onPanResponderMove,
      })
    ).current;
    return (
        <View style={styles.container}>            
            <View style={styles.circle3} ref={circleRef2}/>
            <View style={styles.circle} ref={circleRef} {...panResponder.panHandlers} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#142129',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle3: {
        width: 252,
        height: 102,
        borderRadius: 10,
        backgroundColor: '#3cb371',
        position: 'absolute',
        left: (width / 2) - 126,
        top: (height / 2) - 211,
    },
    circle: {
        width: 50,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#151515',
        position: 'absolute',
        left: (width / 2) - 125,
        top: (height / 2) - 210,
    },
      
});

export default App;