import React, { useRef } from 'react';
import { View, StyleSheet, PanResponder, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const App = () => {

    const circleRef = useRef(null);
    const circleRef2 =useRef(null);
    const circleRef3 =useRef(null);
  
    const onPanResponderMove = (evt, gestureState) => {
      const moveX = gestureState.moveX;
  
      // Limita o movimento do círculo dentro da área de 200 pixels
      const left = Math.min(Math.max(moveX, width/2-80), width/2+80);
  
      circleRef.current.setNativeProps({
        style: {
          left: left - 50,
        }
      });
    };
  
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderMove: onPanResponderMove,
        onPanResponderGrant: (evt, gestureState) => {
          circleRef.current.setNativeProps({
            style: {
              left: gestureState.x0 - 50,
            }
          });
        }
      })
    ).current;
    return (
        <View style={styles.container}>            
            <View style={styles.circle2} ref={circleRef2}/>
            <View style={styles.circle3} ref={circleRef3}/>
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
    circle2: {
        width: 270,
        height: 110,
        borderRadius: 110,
        backgroundColor: '#371636',
        position: 'absolute',
        left: (width / 2) - 135,
        top: (height / 2) - 215,
    },
    circle3: {
        width: 258,
        height: 100,
        borderRadius: 110,
        backgroundColor: '#151515',
        position: 'absolute',
        left: (width / 2) - 129,
        top: (height / 2) - 210,
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#3cb371',
        position: 'absolute',
        left: (width / 2) - 130,
        top: (height / 2) - 210,
    },
      
});

export default App;