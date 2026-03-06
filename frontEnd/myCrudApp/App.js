import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './src/screens/HomeScreen';
import detailsScreen from './src/screens/detailsScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home"
      screenOptions={{
    drawerStyle: {
      backgroundColor: 'rgba(255, 255, 255, 1)', 
      borderWidth: 1,
      borderRightColor: 'rgba(0, 0, 0, 0.05)',
      width: 250,     
      elevation: 0,                           
    },
      }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="details" component={detailsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
 