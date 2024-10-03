import React, { useState, useEffect } from "react";
import {
  View, Image, FlatList, StyleSheet, TouchableOpacity, Text, ActivityIndicator, TextInput
} from 'react-native'
import { AirbnbRating } from 'react-native-ratings';
import { useSelector, useDispatch } from 'react-redux';
import { setDiscoverList } from '../redux/actions/discoverAction';
import { setGenresList } from "../redux/actions/genresAction";

import EmptyState from '../components/EmptyState'
import { colors, containerStyles, sizes } from '../lib/styles'
import { scaleX, apiUrl, apiKEY, mediaUrl } from '../lib/constants'
import movieImg from '../assets/movie1.png'
import CustomHeader from '../components/CustomHeader';
import axios from 'axios';

export default function Discover({ navigation }) {

  const dispatch = useDispatch();
  const discoverList = useSelector((store) => store.discoverList.discoverList)
  const genresList = useSelector((store) => store.genresList.genresList)
  const [curPageNum, setCurPageNum] = useState(0)
  const [totalPageNum, setTotalpageNum] = useState(0)

  const [isLoading, setIsLoading] = useState(false)
  const [filterText, setFilterText] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    genresList?.length < 1 &&
      axios({
        method: 'get',
        url: `${apiUrl}/genre/movie/list`,
        params: {
          api_key: apiKEY,
        }
      }).then((response) => {
        if (response?.data?.genres) {
          dispatch(setGenresList(response?.data?.genres))
        }
      });
  }, [])

  useEffect(() => {
    axios({
      method: 'get',
      url: `${apiUrl}/discover/movie`,
      params: {
        "api_key": apiKEY,
        "page": 1,
      }
    }).then((response) => {
      if (response?.data?.results) {
        setCurPageNum(1)
        setTotalpageNum(response?.data?.total_pages)
        dispatch(setDiscoverList(response?.data?.results))
        setFilteredList(response?.data?.results);
      }
    });
  }, [])

  const loadMore = () => {
    if (totalPageNum > curPageNum && filterText.length === 0 && !isLoading) {
      setIsLoading(true);
      axios({
        method: 'get',
        url: `${apiUrl}/discover/movie`,
        params: {
          "api_key": apiKEY,
          "page": curPageNum + 1,
        }
      }).then((response) => {
        if (response?.data?.results) {
          console.log(response?.data?.page, 'page')
          setCurPageNum(curPageNum + 1)
          let newList = discoverList.concat(response?.data?.results)
          dispatch(setDiscoverList(newList))
          setFilteredList(response?.data?.results);
          setIsLoading(false);
        }
      });
    }
  }

  const getGenreNameByIds = (ids) => {
    return ids.map((item, index) => {
      const fullDetailData = genresList.find(el => el.id === item)
      return <Text style={styles.videoCatTxt} key={index}>{index > 0 && ', '} {fullDetailData?.name}</Text>
    })
  }

  const onChangeFilterText = (text) => {
    setFilterText(text);
    setFilteredList(discoverList.filter(item => item.title.toLowerCase().indexOf(text.toLowerCase()) > -1));
  }

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={styles.listItem}
      onPress={() => { navigation.navigate('Details', { movieItem: item }) }}>
      <Image source={item?.poster_path ? {uri: mediaUrl + item?.poster_path} : movieImg} style={styles.movieImg} />
      <View style={styles.videoTxtContent}>
        <Text style={styles.videoItemTitle}>{item?.title}</Text>
        <View style={styles.starContainer}>
          <AirbnbRating
            showRating={false}
            defaultRating={item?.vote_average / 2}
            count={5}
            size={20}
            isDisabled={true}
            readonly={true}
            selectedColor={colors.primary}
            ratingContainerStyle={{
              alignItems: 'flex-start'
            }}
          />
        </View>
        <View style={styles.genresContainer}>
          {getGenreNameByIds(item?.genre_ids)}
        </View>

      </View>
    </TouchableOpacity>
  );

  return (
    <View style={containerStyles}>
      <CustomHeader title={'Discover'} />
      {
        discoverList?.length > 0 ?
          <>
            <TextInput
              style={styles.input}
              onChangeText={onChangeFilterText}
              value={filterText}
            />
            <FlatList
              nestedScrollEnabled
              data={filteredList}
              renderItem={renderItem}
              keyExtractor={item => curPageNum + item.id}
              onEndReached={loadMore}
            />
          </>
          :
          <EmptyState
            image={require('../assets/empty-discover.jpg')}
            title="Please wait a moment"
            message="Loading Movies..."
          />
      }
      {
        isLoading && <ActivityIndicator />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    paddingHorizontal: scaleX(20),
    marginBottom: scaleX(20)
  },
  movieImg: {
    width: scaleX(100),
    height: scaleX(150),
    resizeMode: 'contain',
    borderRadius: scaleX(15)
  },
  videoTxtContent: {
    paddingLeft: scaleX(10),
    paddingVertical: scaleX(10)
  },
  videoItemTitle: {
    fontWeight: '400',
    fontSize: sizes.md,
    color: colors.black
  },
  starContainer: {
    marginVertical: scaleX(5)
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  videoCatTxt: {
    fontSize: sizes.sm
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 16,
    borderColor: '#555'
  },
})