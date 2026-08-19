import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Switch,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  APP_TITLE,
  INPUT_PLACEHOLDER,
  BUTTON_TEXT,
  LIST_TITLE,
  SWITCH_LABEL,
} from './labels';

const DISCIPLINAS = [
  { id: '1', nome: 'Programação para Dispositivos Móveis' },
  { id: '2', nome: 'Banco de Dados II' },
  { id: '3', nome: 'Engenharia de Software' },
  { id: '4', nome: 'Redes de Computadores' },
];

export default function App() {
  const [novaDisciplina, setNovaDisciplina] = useState('');
  const [apenasObrigatorias, setApenasObrigatorias] = useState(false);

  function handleAdicionar() {
    console.log('Disciplina digitada:', novaDisciplina);
    setNovaDisciplina('');
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{APP_TITLE}</Text>
      </View>

      <View style={styles.formRow}>
        <TextInput
          style={styles.input}
          placeholder={INPUT_PLACEHOLDER}
          placeholderTextColor="#999"
          value={novaDisciplina}
          onChangeText={setNovaDisciplina}
        />
        <Pressable
          onPress={handleAdicionar}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>{BUTTON_TEXT}</Text>
        </Pressable>
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>{SWITCH_LABEL}</Text>
        <Switch
          value={apenasObrigatorias}
          onValueChange={setApenasObrigatorias}
        />
      </View>

      <Text style={styles.listTitle}>{LIST_TITLE}</Text>

      <View style={styles.list}>
        {DISCIPLINAS.map((disciplina) => (
          <View key={disciplina.id} style={styles.listItem}>
            <Text style={styles.listItemText}>{disciplina.nome}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 0.7,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    fontSize: 15,
  },
  button: {
    width: '28%',
    backgroundColor: '#3B7DDA',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: '#2C5FAE',
    opacity: 0.9,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 4,
  },
  switchLabel: {
    fontSize: 14,
    color: '#34495E',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  listItem: {
    backgroundColor: '#070606',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  listItemText: {
    fontSize: 15,
    color: '#f3f3f3',
  },
});