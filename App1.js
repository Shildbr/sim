import React, { useRef } from 'react';
import { View, StyleSheet, PanResponder, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const App = () => {

  const circleRef = useRef(null);

  const onPanResponderMove = (evt, gestureState) => {
    let moveX = gestureState.moveX;
    let moveY = gestureState.moveY;

    // Verifica se o círculo está dentro da área desejada
    if (moveX > -100 && moveX < width - 100) {
      // Define o limite de movimentação do círculo para a direita
      moveX = Math.min(moveX, width - 100);
    } else {
      // Define o limite de movimentação do círculo para baixo
      moveY = Math.max(moveY, 0);
    }

    circleRef.current.setNativeProps({
      style: {
        left: moveX - 50,
        top: moveY - 50,
      }
    });
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: onPanResponderMove,
    onPanResponderGrant: (evt, gestureState) => {
      circleRef.current.setNativeProps({
        style: {
          left: gestureState.x0 - 50,
          top: gestureState.y0 - 50,
        }
      });
    }
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers} ref={circleRef} />
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'cyan',
    position: 'absolute',
    left: (width / 2) - 25,
    top: (height / 2) - 25,
  }
});

export default App;