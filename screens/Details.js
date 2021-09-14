import React, {useEffect, useState} from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  View,
  Modal,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import Video from '../components/Video';

import {getMovie} from '../services/services';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';

const placeholderImage = require('../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;

const Details = ({route, navigation}) => {
  const movieId = route.params.movieId;

  const [movieDetail, setMovieDetail] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);

  //lesson 3 done

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`,
                    }
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShown} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating
                style={styles.movieTitle}
                maxStars={5}
                rating={movieDetail.vote_average / 2}
                fullStarColor={'gold'}
                starSize={30}
              />

              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.releaseDate}>{`Release date: ${dateFormat(
                movieDetail.release_date,
                'mmmm dS, yyyy',
              )}`}</Text>
            </View>
          </ScrollView>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalVisible}>
            <View style={styles.videoModal}>
              <Video onClose={() => videoShown()} />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && (
        <ActivityIndicator style={styles.activityIndicator} size="large" />
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height / 2,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
    marginTop: 20,
  },
  overview: {
    padding: 15,
  },
  releaseDate: {
    fontWeight: 'bold',
    marginBottom: 200,
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Details;
