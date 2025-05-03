import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './start'; // Adjust the path if necessary
import SignUpScreen from './signup';
import SignInScreen from './login';
import AddingToDoPage from './addToDo';
import addANewProfile from './addANewProfile';
import ToDoList from './homepage';
import userList from './users';
import EditingToDoPage from "./EditingToDoPage"
import TabBar from './TabBar';
import ProfilePage from './navigation'; 
import InsightsScreen from './InsightsScreen';
import ChildTasks from './childTask'; 

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
          <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="userList" component={userList} options={{ headerShown: false }} />
          <Stack.Screen name="addANewProfile" component={addANewProfile} options={{ headerShown: false }} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ToDoList" component={ToDoList} options={{ headerShown: false }} />
          <Stack.Screen name="EditingToDoPage" component={EditingToDoPage} options={{ headerShown: false }} />
          <Stack.Screen name="AddingToDoPage" component={AddingToDoPage} options={{ headerShown: false }} />
          <Stack.Screen name="TabBar" component={TabBar} options={{ headerShown: false }} />
          <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
          <Stack.Screen name="InsightsScreen" component={InsightsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ChildTasks" component={ChildTasks} /> 
    </Stack.Navigator>
  </NavigationContainer>
    
  );
};

export default App;