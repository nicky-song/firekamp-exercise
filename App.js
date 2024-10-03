import React from "react";
import MainStack from "./navigation/MainStack";
import { store } from './redux/store';
import { Provider } from "react-redux";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, StatusBar } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar backgroundColor="#EEEEEE" barStyle="dark-content" />
          <MainStack />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    shadowColor: 'transparent',
  }
})

