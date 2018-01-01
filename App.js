import React, { Component } from 'react';
import { Image,
  TextInput,
  View,
  FlatList,
  Button,
  ActivityIndicator,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text } from 'react-native';
import { normalizeImageUrl } from './utils/normalizer';

const { width, height } = Dimensions.get('window');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'loading': false,
      'isNewImageLoading': false,
      'searchedKeyword': '',
      'images': [],
      'page': 1
    };
  }

  getImages = async () => {
    Keyboard.dismiss();
    const pageNumber = this.state.page;
    this.setState({
      'isNewImageLoading': pageNumber !== 1,
      'loading': pageNumber === 1
    });
    try {
      const response = await fetch(`https://pixabay.com/api/?key=7517305-7f44757fc30dc333f6521482c&q=${this.state.searchedKeyword}&page=${pageNumber}&image_type=photo&min_width=50&min_height=50&per_page=20`, {
        method: 'GET'
      });
      let images = await response.json();
      images = normalizeImageUrl(images);
      this.onEndReachedCalledDuringMomentum = false;
      this.setState({
        'loading': false,
        'isNewImageLoading': false,
        'images': this.state.images.concat(images),
        'noResult': images.length
      });
    }
    catch (e) {
      console.log(e)
    }
  };

  onEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.setState({
        'page': this.state.page + 1
      }, () => {
        this.onEndReachedCalledDuringMomentum = true;
        this.getImages();
      });
    }
  };

  onSearchKeywordChange = (searchedKeyword) => {
    this.setState({
      searchedKeyword,
      'images': []
    });
  };

  _keyExtractor = (item) => item.id;

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  _renderItem = ({item}) => (
    <View>
      <Image
        style={styles.image}
        source={{ uri: item.imageUrl }}
      />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <TextInput
            autoFocus={true}
            style={styles.searchInput}
            placeholder="Type keywords (eg: flower)"
            onChangeText={this.onSearchKeywordChange}
            underlineColorAndroid="transparent"
            onSubmitEditing={this.getImages}
          />
          <Button
            onPress={this.getImages}
            title="Search"
            color="#5BCF51"
            accessibilityLabel="Search"
            disabled={this.state.searchedKeyword === ''}
          />
        </View>

        {(() => {
          if (this.state.loading) {
            return (
              <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            );
          } else if (this.state.images && this.state.images.length) {
            return (
              <FlatList
                data={this.state.images}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                numColumns={2}
                onEndReachedThreshold={0.01}
                onEndReached={this.onEndReached}
                ListFooterComponent={this.renderFooter}
              />
            );
          } else if (this.state.searchedKeyword === '') {
            return (
              <View style={styles.noResultContainer}>
                <Text style={styles.noResult}>
                  Search to view images
                </Text>
              </View>
            );
          } else if (this.state.images && this.state.images.length === 0) {
            return (
                <View style={styles.noResultContainer}>
                  <Text style={styles.noResult}>
                    No result found
                  </Text>
                </View>
            );
          }
        })()}
        {(() => {
          if (this.state.isNewImageLoading) {
            return (
              <ActivityIndicator size="large" color="#0000ff" />
            );
          }
        })()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE"
  },
  image: {
    width: width/2,
    height: 100,
    borderWidth: 5,
    borderColor: '#FFFFFF'
  },
  container: {
    height: height,
    paddingTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  inputRow: {
    width: width - 20,
    height: 40,
    borderWidth: 1,
    borderColor: '#9b9b9b',
    borderRadius: 4,
    flexDirection: 'row',
    marginBottom: 10
  },
  searchInput: {
    height: 40,
    flex: 1,
    padding: 5
  },
  loader: {
    flex: 1,
    justifyContent: 'center'
  },
  noResultContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noResult: {
    color: '#9b9b9b'
  }
});