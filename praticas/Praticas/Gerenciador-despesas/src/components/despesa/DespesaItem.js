import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDataFormatada } from '../../util/data';

function DespesaItem({ id, descricao, valor, data, categoria }) {
  const navigation = useNavigation();

  function aoPressionar() {
    navigation.navigate('GerenciarDespesa', { despesaId: id });
  }

  return (
    <Pressable onPress={aoPressionar} style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.item}>
        <View style={styles.info}>
          <Text style={styles.descricao}>{descricao}</Text>
          <View style={styles.linhaDetalhe}>
            <Text style={styles.data}>{getDataFormatada(data)}</Text>
            <View style={styles.tag}>
              <Text style={styles.tagTexto}>{categoria}</Text>
            </View>
          </View>
        </View>
        <View style={styles.valorContainer}>
          <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default DespesaItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  item: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  linhaDetalhe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  data: {
    color: '#666',
    fontSize: 13,
  },
  tag: {
    marginLeft: 8,
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
  },
  tagTexto: {
    fontSize: 12,
    color: '#444',
  },
  valorContainer: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: '#f1f8f6',
    borderRadius: 4,
    minWidth: 90,
    alignItems: 'center',
  },
  valor: {
    color: '#1b6b61',
    fontWeight: 'bold',
  },
});
