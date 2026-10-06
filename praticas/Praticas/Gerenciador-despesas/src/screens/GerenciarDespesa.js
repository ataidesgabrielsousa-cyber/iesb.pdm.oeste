import { useContext, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DespesasContext } from '../store/despesas-context';
import { CATEGORIAS } from '../util/categorias';
import { getDataFormatada } from '../util/data';
import CategoriaSeletor from '../components/despesa/CategoriaSeletor';

function GerenciarDespesa({ route, navigation }) {
  const { despesas, addDespesa, updateDespesa } = useContext(DespesasContext);

  const despesaId = route.params?.despesaId;
  const despesaEditada = despesas.find((despesa) => despesa.id === despesaId);
  const editando = !!despesaEditada;

  const [descricao, setDescricao] = useState(despesaEditada ? despesaEditada.descricao : '');
  const [valor, setValor] = useState(despesaEditada ? despesaEditada.valor.toFixed(2) : '');
  const [categoria, setCategoria] = useState(despesaEditada ? despesaEditada.categoria : '');
  const [data, setData] = useState(despesaEditada ? despesaEditada.data : new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: editando ? 'Editar Despesa' : 'Nova Despesa' });
  }, [navigation, editando]);

  function valorHandler(texto) {
    const normalizado = texto.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalizado)) {
      setValor(normalizado);
    }
  }

  function dataHandler(evento, dataSelecionada) {
    setMostrarPicker(Platform.OS === 'ios');
    if (evento.type !== 'dismissed' && dataSelecionada) {
      setData(dataSelecionada);
    }
  }

  function salvar() {
    const valorNumerico = parseFloat(valor);
    const formularioValido =
      descricao.trim().length > 0 &&
      !isNaN(valorNumerico) &&
      valorNumerico > 0 &&
      categoria !== '';

    if (!formularioValido) {
      Alert.alert('Dados inválidos', 'Preencha a descrição, o valor (maior que zero) e a categoria.');
      return;
    }

    const dados = { descricao: descricao.trim(), valor: valorNumerico, data, categoria };

    if (editando) {
      updateDespesa(despesaId, dados);
    } else {
      addDespesa(dados);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex.: Almoço"
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        value={valor}
        onChangeText={valorHandler}
        placeholder="0.00"
      />

      <Text style={styles.label}>Data</Text>
      <Pressable style={styles.input} onPress={() => setMostrarPicker(true)}>
        <Text style={styles.dataTexto}>{getDataFormatada(data)}</Text>
      </Pressable>
      {mostrarPicker && (
        <DateTimePicker value={data} mode="date" onChange={dataHandler} />
      )}

      <Text style={styles.label}>Categoria</Text>
      <CategoriaSeletor
        opcoes={CATEGORIAS}
        selecionada={categoria}
        onSelecionar={setCategoria}
      />

      <View style={styles.botoes}>
        <Pressable
          style={({ pressed }) => [styles.botao, styles.botaoCancelar, pressed && styles.pressed]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.botao, styles.botaoSalvar, pressed && styles.pressed]}
          onPress={salvar}
        >
          <Text style={styles.botaoSalvarTexto}>{editando ? 'Atualizar' : 'Adicionar'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default GerenciarDespesa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
  },
  dataTexto: {
    fontSize: 16,
    color: '#222',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    gap: 12,
  },
  botao: {
    minWidth: 120,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  botaoCancelar: {
    backgroundColor: '#e0e0e0',
  },
  botaoCancelarTexto: {
    color: '#333',
    fontWeight: 'bold',
  },
  botaoSalvar: {
    backgroundColor: '#2a9d8f',
  },
  botaoSalvarTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.6,
  },
});
