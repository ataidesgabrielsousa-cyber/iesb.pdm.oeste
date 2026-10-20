import { View, Text, Pressable, StyleSheet } from 'react-native';

function CategoriaSeletor({ opcoes, selecionada, onSelecionar }) {
  return (
    <View style={styles.linha}>
      {opcoes.map((opcao) => {
        const ativa = opcao === selecionada;
        return (
          <Pressable
            key={opcao}
            onPress={() => onSelecionar(opcao)}
            style={({ pressed }) => [
              styles.opcao,
              ativa && styles.opcaoAtiva,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.texto, ativa && styles.textoAtivo]}>{opcao}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default CategoriaSeletor;

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  opcao: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
  },
  opcaoAtiva: {
    backgroundColor: '#2a9d8f',
  },
  texto: {
    color: '#333',
    fontSize: 14,
  },
  textoAtivo: {
    color: 'white',
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.6,
  },
});
