import { View, Text, StyleSheet } from 'react-native';

const LIMITE_ALERTA = 200;

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((acumulador, item) => acumulador + item.valor, 0);
  const acimaDoLimite = somaDespesas > LIMITE_ALERTA;

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.soma, acimaDoLimite && styles.somaAlta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

export default DespesaSumario;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginTop: 12,
    marginBottom: 6,
    backgroundColor: '#dff3ef',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodo: {
    fontSize: 14,
    color: '#333',
  },
  soma: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1b6b61',
  },
  somaAlta: {
    color: 'red',
  },
});
