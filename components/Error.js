import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';

const propTypes = {
  errorText1: PropTypes.string,
  errorText2: PropTypes.string,
};

const defaultProps = {
  errorText1: 'Oops! Something went wrong.',
  errorText2:
    "Couldn't reach the server. Please check your connection and try again.",
};

class Error extends React.PureComponent {
  render() {
    const {errorText1, errorText2} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{errorText1}</Text>
        <Text style={styles.text}>{errorText2}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: 'red',
    fontWeight: 'bold',
  },
});

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default Error;
