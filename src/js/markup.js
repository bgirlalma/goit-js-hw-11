export function markup(data) {
 return data
 .map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      views,
      comments,
      downloads,
      likes,
    }) => `<div class="photo-card">
    <img src="" alt="${webformatURL}" loading="${tags}" />
    <div class="info">
      <p class="info-item">
        <b>Likes: ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${downloads}</b>
      </p>
    </div>
  </div>`).join('');
};