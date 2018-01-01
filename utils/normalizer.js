export const normalizeImageUrl = (images) => {
  const normalizedContact = [];
  images.hits.map((image) => {
    normalizedContact.push({
      'id': image.id,
      'imageUrl': image.previewURL
    });
  });

  return normalizedContact;
};