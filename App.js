import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, PanResponder, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const App = () => {
  const circleRef1 = useRef(null);
  const circleRef2 = useRef(null);
  const ws = useRef(null);

  const onPanResponderMove = (evt, gestureState) => {
    const moveX = gestureState.moveX;

    const left = Math.min(Math.max(moveX, width / 2 - 100), width / 2 + 100);
    circleRef1.current.setNativeProps({
      style: {
        left: left - 25,
      },
    });

      const position_full = left - width / 2 + 100;
      const position = position_full / 4;
      ws.current.send(position.toString());
      console.log('Position sent:', position);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: onPanResponderMove,
    })
  ).current;

  useEffect(() => {
    ws.current = new WebSocket('ws://192.168.1.5:80');

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
      ws.current.send('Hello, server!');
    };

    ws.current.onmessage = (event) => {
      console.log('Received message from server:', event.data);
    };

    ws.current.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.current.close();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.circle2} ref={circleRef2} />
      <View style={styles.circle1} ref={circleRef1} {...panResponder.panHandlers} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c7e80',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle2: {
    width: 256,
    height: 105,
    borderRadius: 0,
    backgroundColor: '#5f9ea0',
    position: 'absolute',
    left: width / 2 - 128,
    top: height / 2 - 213,
  },
  circle1: {
    width: 50,
    height: 100,
    borderRadius: 0,
    backgroundColor: '#000',
    position: 'absolute',
    left: width / 2 - 125,
    top: height / 2 - 210,
  },
});

export default App;
