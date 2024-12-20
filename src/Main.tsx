import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeNavigator from './navigators/HomeNavigator.tsx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Splash from './screens/Splash.tsx';
import Onboarding from './screens/Onboarding.tsx';
import Login from './screens/Login.tsx';
import Signup from './screens/Signup.tsx';
import AuthNavigator from "./navigators/AuthNavigator.tsx";

const Stack = createStackNavigator();

const Main = (): React.JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  // Manage splash screen visibility
  React.useEffect(() => {
    const timer = setTimeout(() => setIsSplashVisible(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handlers for authentication
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
  };

  // Render splash screen if visible
  if (isSplashVisible) {
    return <Splash />;
  }

  // Render onboarding screen if not completed
  if (!isOnboardingComplete) {
    return <Onboarding onFinish={() => setIsOnboardingComplete(true)} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isAuthenticated ? 'Home' : 'Auth'} // Corrected logic
        >
          <Stack.Screen name="Home" component={HomeNavigator} options={{ headerShown: false}}
          />
          <Stack.Screen name="Auth" component={AuthNavigator} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Main;
