import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

// Item individual da lista. Fica no mesmo arquivo por simplicidade,
// mas poderia virar components/MetaItem.js se a lista crescer.
function MetaItem({ item, onDelete, onToggle }) {
  return (
    <View style={styles.item}>
      <Pressable style={styles.itemContent} onPress={() => onToggle(item.id)}>
        <Text style={[styles.texto, item.concluida && styles.textoConcluida]}>
          {item.texto}
        </Text>
        <Text style={styles.data}>
          {new Date(item.criadaEm).toLocaleDateString('pt-BR')}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onDelete(item.id)}
        android_ripple={{ color: '#ffffff55' }}
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.deleteButtonPressed,
        ]}
      >
        <Text style={styles.deleteText}>Remover</Text>
      </Pressable>
    </View>
  );
}

// Props: metas (array), onDelete (fn), onToggle (fn, desafio opcional)
export default function MetaList({ metas, onDelete, onToggle }) {
  if (metas.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Nenhuma meta cadastrada ainda</Text>
        <Text style={styles.emptySubtext}>
          Adicione sua primeira meta do semestre acima!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <MetaItem item={item} onDelete={onDelete} onToggle={onToggle} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  itemContent: {
    flex: 1,
  },
  texto: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  textoConcluida: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  data: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 10,
  },
  deleteButtonPressed: {
    opacity: 0.8,
  },
  deleteText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  empty: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  emptySubtext: {
    fontSize: 13,
    color: '#999',
    marginTop: 6,
    textAlign: 'center',
  },
});
