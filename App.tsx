import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExerciseAnalysisScreen from './src/screens/ExerciseAnalysisScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'FitMotion' }}
        />
        <Stack.Screen 
          name="ExerciseAnalysis" 
          component={ExerciseAnalysisScreen}
          options={{ title: 'Análisis de Ejercicio' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;