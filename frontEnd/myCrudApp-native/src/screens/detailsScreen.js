import { View, Text,} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { useEffect, useState } from "react";
import {styles} from '../styles/style';
import react from 'react';

export default function detailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { armarioSelec } = route.params;

  return (
    <View style={styles.detailsContainer}>
      <Text>Detalhes do Armário: {armarioSelec.posicao}</Text>
      <Text>Ocupação do Armário: {armarioSelec.status === 0 ? "Livre" : armarioSelec.status === 1 ? "Ocupado" : "Reservado"}</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
      {armarioSelec.status === 0 && (
        <Button title="Reservar - RS$100.00" onPress={() => console.log("Armário reservado!")} />
      )}
    </View>
  );

};