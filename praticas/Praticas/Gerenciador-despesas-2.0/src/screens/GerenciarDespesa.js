import { useLayoutEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../store/expenses-context';
import { CATEGORIES } from '../constants/categories';
import { getTheme } from '../constants/theme';
import { formatDate } from '../utils/format';

const AMOUNT_REGEX = /^\d*\.?\d{0,2}$/;

function endOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}

function validate(values) {
  const errors = {};
  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }
  const amount = parseFloat(values.amount);
  if (!(amount > 0)) {
    errors.amount = 'O valor deve ser maior que zero.';
  }
  if (values.date.getTime() > endOfToday().getTime()) {
    errors.date = 'A data não pode ser futura.';
  }
  if (!values.category) {
    errors.category = 'Escolha uma categoria.';
  }
  return errors;
}

function inputStyle(colors, hasError) {
  return {
    color: colors.text,
    backgroundColor: colors.card,
    borderColor: hasError ? colors.danger : colors.border,
  };
}

export default function GerenciarDespesa({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const isEditing = Boolean(expenseId);
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const colors = getTheme(useColorScheme());

  const existing = isEditing ? expenses.find((e) => e.id === expenseId) : null;

  const [form, setForm] = useState({
    description: existing?.description ?? '',
    amount: existing ? String(existing.amount) : '',
    date: existing ? new Date(existing.date) : new Date(),
    category: existing?.category ?? '',
  });
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEditing ? 'Editar despesa' : 'Nova despesa' });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    const newForm = { ...form, [field]: value };
    setForm(newForm);
    // Se o campo já tinha erro, atualiza a mensagem (some quando corrigido)
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validate(newForm)[field] }));
    }
  }

  function handleAmountChange(text) {
    const normalized = text.replace(',', '.');
    if (AMOUNT_REGEX.test(normalized)) {
      handleChange('amount', normalized);
    }
  }

  function onDateChange(event, selectedDate) {
    if (Platform.OS === 'android') setShowDatePicker(false);
    if (event.type === 'set' && selectedDate) {
      handleChange('date', selectedDate);
    }
  }

  function handleSave() {
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date.toISOString(),
      category: form.category,
    };

    if (isEditing) {
      updateExpense({ id: expenseId, ...data });
    } else {
      addExpense(data);
    }
    navigation.goBack();
  }

  function handleDelete() {
    Alert.alert('Excluir despesa', 'Tem certeza que deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={[styles.label, { color: colors.text }]}>Descrição</Text>
        <TextInput
          value={form.description}
          onChangeText={(text) => handleChange('description', text)}
          placeholder="Ex.: Almoço"
          placeholderTextColor={colors.subtext}
          style={[styles.input, inputStyle(colors, errors.description)]}
        />
        {errors.description ? (
          <Text style={[styles.error, { color: colors.danger }]}>{errors.description}</Text>
        ) : null}

        <Text style={[styles.label, { color: colors.text }]}>Valor</Text>
        <TextInput
          value={form.amount}
          onChangeText={handleAmountChange}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={colors.subtext}
          style={[styles.input, inputStyle(colors, errors.amount)]}
        />
        {errors.amount ? (
          <Text style={[styles.error, { color: colors.danger }]}>{errors.amount}</Text>
        ) : null}

        <Text style={[styles.label, { color: colors.text }]}>Data</Text>
        <Pressable
          onPress={() => setShowDatePicker((visible) => !visible)}
          style={[styles.input, styles.row, inputStyle(colors, errors.date)]}
        >
          <Text style={{ color: colors.text, fontSize: 16 }}>{formatDate(form.date)}</Text>
          <Ionicons name="calendar-outline" size={20} color={colors.subtext} />
        </Pressable>
        {errors.date ? (
          <Text style={[styles.error, { color: colors.danger }]}>{errors.date}</Text>
        ) : null}
        {showDatePicker && (
          <DateTimePicker
            value={form.date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
          />
        )}

        <Text style={[styles.label, { color: colors.text }]}>Categoria</Text>
        <Pressable
          onPress={() => setShowCategories(true)}
          style={[styles.input, styles.row, inputStyle(colors, errors.category)]}
        >
          <Text style={{ color: form.category ? colors.text : colors.subtext, fontSize: 16 }}>
            {form.category || 'Selecione uma categoria'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={colors.subtext} />
        </Pressable>
        {errors.category ? (
          <Text style={[styles.error, { color: colors.danger }]}>{errors.category}</Text>
        ) : null}

        <Pressable style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={handleSave}>
          <Text style={styles.saveText}>Salvar</Text>
        </Pressable>

        {isEditing && (
          <Pressable
            style={[styles.deleteButton, { borderColor: colors.danger }]}
            onPress={handleDelete}
          >
            <Text style={{ color: colors.danger, fontWeight: '600', fontSize: 16 }}>
              Excluir despesa
            </Text>
          </Pressable>
        )}
      </ScrollView>

      <Modal
        visible={showCategories}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategories(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setShowCategories(false)}>
          <View style={[styles.sheet, { backgroundColor: colors.card }]}>
            <Text style={[styles.sheetTitle, { color: colors.text }]}>Categoria</Text>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                onPress={() => {
                  handleChange('category', category);
                  setShowCategories(false);
                }}
                style={[styles.categoryItem, { borderColor: colors.border }]}
              >
                <Text style={{ color: colors.text, fontSize: 16 }}>{category}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  label: { fontSize: 15, fontWeight: '600', marginTop: 16, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  error: { marginTop: 4, fontSize: 13 },
  saveButton: {
    marginTop: 24,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  deleteButton: {
    marginTop: 12,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  sheetTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  categoryItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
});