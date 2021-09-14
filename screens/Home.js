import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
  getDocumentaries,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';
import Colors from '../themes/Colors';

const dimensions = Dimensions.get('screen');
const Home = ({navigation}) => {
  const [moviesImages, setMovieImages] = useState(null);
  const [popularMovies, setPopularMovies] = useState(null);
  const [popularTv, setPopularTv] = useState(null);
  const [familyMovies, setFamilyMovies] = useState(null);
  const [documentaries, setDocumentaries] = useState(null);

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaries(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMovies,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          documentariesData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMovies.forEach(movie => {
            moviesImagesArray.push(
              `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            );
          });

          setMovieImages(moviesImagesArray);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentaries(documentariesData);
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <React.Fragment>
      {loaded && !error && (
        <ScrollView style={styles.mainContainer}>
          {/* if moviesImages exists only then display <View> else no */}
          {moviesImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImages}
                dotStyle={styles.sliderStyle}
                autoplay={true}
                circleLoop={true}
                sliderBoxHeight={dimensions.height / 1.5}
              />
            </View>
          )}
          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}
              />
            </View>
          )}
          {popularTv && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular TV Shows"
                content={popularTv}
              />
            </View>
          )}
          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}
              />
            </View>
          )}
          {documentaries && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Documentaries"
                content={documentaries}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && (
        <ActivityIndicator style={styles.activityIndicator} size="large" />
      )}
      {error && <Error />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.gray,
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
