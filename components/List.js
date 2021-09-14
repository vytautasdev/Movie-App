import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import Card from './Card';
import PropTypes from 'prop-types';
import Colors from '../themes/Colors';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};

class List extends React.PureComponent {
  render() {
    const {navigation, title, content} = this.props;

    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({item}) => (
              <Card navigation={navigation} item={item} />
            )} // {item} is a single item returned from popularMovies objectW
            keyExtractor={null}></FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 25,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    padding: 10,
    paddingBottom: 15,
  },
});

List.propTypes = propTypes;

export default List;
