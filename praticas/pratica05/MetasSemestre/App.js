   import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Alert, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // useEffect DE CARGA: roda uma vez, na montagem do componente
  useEffect(() => {
    async function carregarMetas() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (dadosSalvos) {
          setMetas(JSON.parse(dadosSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar metas:', error);
        Alert.alert('Ops!', 'Não foi possível carregar suas metas salvas. Tente novamente.');
      } finally {
        setCarregado(true);
      }
    }
    carregarMetas();
  }, []);

  // useEffect DE SALVAMENTO: roda sempre que a lista de metas mudar
  useEffect(() => {
    if (!carregado) return;
    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (error) {
        console.error('Erro ao salvar metas:', error);
        Alert.alert('Ops!', 'Não foi possível salvar suas metas. Suas alterações podem não persistir.');
      }
    }
    salvarMetas();
  }, [metas, carregado]);

  function handleAdd() {
    const textoLimpo = texto.trim();
    if (!textoLimpo) {
      Alert.alert('Atenção', 'Digite o texto da meta antes de adicionar.');
      return;
    }
    const novaMeta = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };
    setMetas((metasAtuais) => [novaMeta, ...metasAtuais]);
    setTexto('');
  }

  function handleDelete(id) {
    setMetas((metasAtuais) => metasAtuais.filter((meta) => meta.id !== id));
  }

  function handleToggle(id) {
    setMetas((metasAtuais) =>
      metasAtuais.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  }

  const pendentes = metas.filter((meta) => !meta.concluida).length;
  const concluidas = metas.filter((meta) => meta.concluida).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <Image source={require('./assets/icon.png')} style={styles.logo} />
          <View>
            <Text style={styles.title}>MetasSemestre</Text>
            <Text style={styles.subtitle}>
              {pendentes} pendentes / {concluidas} concluídas
            </Text>
          </View>
        </View>

        <MetaInput value={texto} onChangeText={setTexto} onAdd={handleAdd} />

        <MetaList metas={metas} onDelete={handleDelete} onToggle={handleToggle} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 12,
  },
  logo: { width: 44, height: 44, borderRadius: 10 },
  title: { fontSize: 20, fontWeight: '700', color: '#222' },
  subtitle: { fontSize: 12, color: '#666', marginTop: 2 },
});
