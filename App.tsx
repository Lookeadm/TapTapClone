import { Provider } from "react-redux";
import store from './src/redux/store'
import { StatusBar } from "react-native";
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import AppRouters from "./src/navigation/AppRouters";

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#161616',
    text: '#FFFFFF',
    card: '#000000',
    border: '#333333',
    primary: '#FFFFFF',
  },
};

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar
          barStyle={"light-content"} // Đổi thành light cho dark theme
          backgroundColor="transparent"
          translucent
        />
        <NavigationContainer theme={MyTheme}>
          <AppRouters />
        </NavigationContainer>
      </Provider>
    </>
  )
}
export default App;