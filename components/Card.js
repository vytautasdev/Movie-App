import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import PropTypes from 'prop-types';

const placeholderImage = require('../assets/images/placeholder.png');

const propTypes = {
  title: PropTypes.object,
};

class Card extends React.PureComponent {
  render() {
    const {navigation, item} = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('Details', {movieId: item.id})}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={
            item.poster_path
              ? {uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}
              : placeholderImage
          }
        />
        {!item.poster_path && <Text style={styles.movieName}>{item.name}</Text>}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
    marginBottom: 10,
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  movieName: {
    top: 10,
    position: 'absolute',
    width: 100,
    textAlign: 'center',
  },
});

Card.propTypes = propTypes;

export default Card;
