import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const App = () => {
  useEffect(() => {
    const ws = new WebSocket('ws://192.168.1.8:80');

    ws.onopen = () => {
      console.log('Conexão WebSocket aberta');
      ws.send('Olá, servidor!');
    };

    ws.onmessage = (event) => {
      console.log('Mensagem recebida:', event.data);
    };

    ws.onerror = (error) => {
      console.log('Erro WebSocket:', error);
    };

    ws.onclose = () => {
      console.log('Conexão WebSocket fechada');
    };

    return () => {
      // Feche a conexão WebSocket ao desmontar o componente
      ws.close();
    };
  }, []);

  return (
    <View>
      <Text>Exemplo de WebSocket com Expo</Text>
    </View>
  );
};

export default App;
