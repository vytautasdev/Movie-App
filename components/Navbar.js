import React from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import Colors from '../themes/Colors';

const propTypes = {
  main: PropTypes.bool,
};

const defaultProps = {
  main: false,
};

class Navbar extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;

    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainNavContainer}>
            <Image
              style={styles.logo}
              source={require('../assets/images/m.png')}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <Icon name={'search'} size={30} color={Colors.black} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.backArrow}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name={'arrow-back'} size={30} color={Colors.black} />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainNavContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: Colors.gray,
  },
  logo: {
    width: 40,
    height: 40,
  },
  backArrow: {
    padding: 10,
    backgroundColor: Colors.gray,
  },
});

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
