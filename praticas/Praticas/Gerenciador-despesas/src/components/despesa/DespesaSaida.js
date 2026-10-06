import { View, Text, StyleSheet } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

function DespesaSaida({ despesas, periodo, textoVazio }) {
  let conteudo = <Text style={styles.textoVazio}>{textoVazio}</Text>;

  if (despesas.length > 0) {
    conteudo = <DespesaLista despesas={despesas} />;
  }

  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      {conteudo}
    </View>
  );
}

export default DespesaSaida;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textoVazio: {
    color: '#555',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
