/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Animated,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-community/picker';

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {

  const {pais, ciudad} = busqueda;

  const [animacionBoton] = useState(new Animated.Value(1));

  const consultarClima = () => {
    if (pais.trim() === '' || ciudad.trim() === '') {
      Alert.alert('Error','Los campos son requeridos',['ok']);
      return;
    }
    guardarConsultar(true);
  };

  const animacionEntrada = () => {
    Animated.spring(animacionBoton, {
      toValue: 0.80,
      useNativeDriver: false,
    }).start();
  };

  const animacionSalida = () => {
    Animated.spring(animacionBoton, {
      toValue: 1,
      friction: 4,
      tension: 30,
      useNativeDriver: false,
    }).start();
  };

  const estiloAnimacion = {
    transform: [{scale: animacionBoton}],
  };

  return (
    <>
      <View style={styles.formulario}>
        <View>
          <TextInput
            placeholder="Tú ciudad"
            placeholderTextColor="#555"
            style={styles.input}
            value={ciudad}
            onChangeText={(ciudad) => guardarBusqueda({...busqueda, ciudad})}
          />
        </View>
        <View>
          <Picker
            onValueChange={ (pais) => guardarBusqueda({...busqueda, pais})}
            selectedValue={pais} style={styles.picker}>
            <Picker.Item label="Seleccione un país" value="" />
            <Picker.Item label="Estados Unidos" value="US" />
            <Picker.Item label="México" value="MX" />
            <Picker.Item label="Guatemala" value="GT" />
            <Picker.Item label="Argentina" value="AR" />
            <Picker.Item label="Colombia" value="CO" />
            <Picker.Item label="Costa Rica" value="CR" />
            <Picker.Item label="España" value="ES" />
            <Picker.Item label="Perú" value="PE" />
          </Picker>
        </View>
        <TouchableWithoutFeedback
          onPressIn={() => animacionEntrada()}
          onPressOut={() => animacionSalida()}
          onPress={() => consultarClima()}
        >
          <Animated.View
            style={[styles.btnBuscar, estiloAnimacion]}
          >
            <Text style={styles.btnTexto} >Buscar Clima</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#fff',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    height: Platform.OS === 'ios' ? 120 : 50,
    backgroundColor: '#fff',
  },
  btnBuscar:{
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  btnTexto: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Formulario;
