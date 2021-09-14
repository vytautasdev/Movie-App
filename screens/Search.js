import React, {useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {searchMovieTv} from '../services/services';
import Error from '../components/Error';
import Card from '../components/Card';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Search = ({navigation}) => {
  const [text, onTextChange] = useState();
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);

  const onSubmit = query => {
    Promise.all([searchMovieTv(query, 'movie'), searchMovieTv(query, 'tv')])
      .then(([movies, tv]) => {
        const mergedData = [...movies, ...tv];
        setSearchResults(mergedData);
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder={'Search Movie or TV Show'}
              onChangeText={onTextChange}
              value={text}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onSubmit(text);
            }}>
            <Icon name={'search'} size={30} color={Colors.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchItems}>
          {/* Searched item results */}
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}

          {/* When searched but no results */}
          {searchResults && searchResults.length == 0 && (
            <View style={styles.empty}>
              <Text style={styles.paragraph}>
                No results matching your criteria.
              </Text>
              <Text style={styles.paragraph}>Try different keywords</Text>
            </View>
          )}

          {/* When nothing is searched */}
          {!searchResults && (
            <View style={styles.empty}>
              <Text style={styles.paragraph}>
                Type something to start searching
              </Text>
            </View>
          )}

          {/* Error */}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 8,
    borderRadius: 15,
    borderWidth: 0.5,
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchItems: {},
  empty: {},
  paragraph: {
    marginLeft: 15,
  },
});

export default Search;
