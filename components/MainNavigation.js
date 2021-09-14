import React from 'react';
import Home from '../screens/Home';
import Details from '../screens/Details';
import Search from '../screens/Search';
import Navbar from '../components/Navbar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

class MainNavigation extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator headerMode={'screen'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <Navbar navigation={navigation} main={true} />
            ),
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerTransparent: true,
            header: ({navigation}) => <Navbar navigation={navigation} />,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerTransparent: true,
            header: ({navigation}) => <Navbar navigation={navigation} />,
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
