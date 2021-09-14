import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../themes/Colors';

class PlayButton extends React.PureComponent {
  render() {
    const {handlePress} = this.props;
    return (
      <Pressable
        style={styles.playButton}
        onPress={() => {
          handlePress();
        }}>
        <Icon name={'play-arrow'} size={30} color={'#fff'}></Icon>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  playButton: {
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: Colors.primary,
  },
});

export default PlayButton;
