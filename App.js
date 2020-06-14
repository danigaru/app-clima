import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import axios from 'axios';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

const App = () => {
  const [busqueda, guardarBusqueda] = useState({
    pais: '',
    ciudad: '',
  });

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardaResultado] = useState({});
  const [bgColor, guardarBgColor] = useState('rgb(71,149,212)');

  const {ciudad, pais} = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const apikey = 'my_api';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apikey}`;
        guardarConsultar(false);
        try {
          const response = await axios.get(url);
          guardaResultado(response.data);

          //modifica colores basados a la temperatura
          const kelvin = 273.15;
          const {main} = resultado;
          const actual = main.temp - kelvin;

          if (actual < 10) {
            guardarBgColor('rgb(105,108,149)');
          } else if (actual >= 10 && actual <= 25) {
            guardarBgColor('rgb(71,149,212)');
          } else {
            guardarBgColor('rgb(178,28,61)');
          }
        } catch (error) {
          Alert.alert('Error', 'No hay resultados', 'OK');
        }
      }
    };

    consultarAPI();
  }, [consultar]);
  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };

  const bgColorApp = {
    backgroundColor: bgColor,
  };

  return (
    <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
      <View style={[styles.app, bgColorApp]}>
        <View style={styles.contenido}>
          <Clima resultado={resultado} />
          <Formulario
            busqueda={busqueda}
            guardarBusqueda={guardarBusqueda}
            guardarConsultar={guardarConsultar}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
