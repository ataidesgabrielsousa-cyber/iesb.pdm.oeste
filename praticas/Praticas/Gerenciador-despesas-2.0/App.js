import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ExpensesContextProvider } from './src/store/expenses-context';
import TodasDespesas from './src/screens/TodasDespesas';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ExpensesTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={route.name === 'Todas' ? 'list-outline' : 'time-outline'}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Todas" component={TodasDespesas} options={{ title: 'Todas as despesas' }} />
      <Tab.Screen name="Recentes" component={DespesasRecentes} options={{ title: 'Últimos 7 dias' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Principal" component={ExpensesTabs} options={{ headerShown: false }} />
          <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa} options={{ title: 'Nova despesa' }} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </ExpensesContextProvider>
  );
}