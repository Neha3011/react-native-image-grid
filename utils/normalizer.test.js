import { normalizeImageUrl } from './normalizer';

test('returns normalized image url', () => {
  const data = {
    'hits': [{
      'previewHeight': 51,
      'likes': 25,
      'favorites': 10,
      'tags': 'trump, president, usa',
      'webformatHeight': 220,
      'views': 6721,
      'webformatWidth': 640,
      'previewWidth': 150,
      'comments': 6,
      'downloads': 3084,
      'pageURL': 'https://pixabay.com/en/trump-president-usa-america-flag-2546104/',
      'previewURL': 'https://cdn.pixabay.com/photo/2017/07/27/17/35/trump-2546104_150.jpg',
      'webformatURL': 'https://pixabay.com/get/eb30b50929f4053ed95c4518b74b4397e474e2d004b0144091f8c37ba4ecb2_640.jpg',
      'imageWidth': 4700,
      'user_id': 9301,
      'user': 'geralt',
      'type': 'photo',
      'id': 2546104,
      'userImageURL': 'https://cdn.pixabay.com/user/2017/06/05/17-13-06-921_250x250.jpg',
      'imageHeight': 1621
    }]
  };

  const expectedData = [{
    'id': 2546104,
    'imageUrl': 'https://cdn.pixabay.com/photo/2017/07/27/17/35/trump-2546104_150.jpg'
  }];
  expect(normalizeImageUrl(data)).toEqual(expectedData);
});