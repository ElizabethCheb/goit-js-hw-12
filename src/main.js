import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let totalHits = 0;
let lightbox;
const apiKey = '41856148-e541297002e84807a45dae6d1';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
const loadMoreButtonContainer = document.getElementById('load-more-button-container');
const loadMoreButton = document.getElementById('load-more-button');
let currentPage = 1;
loadMoreButtonContainer.style.display = 'none';
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const searchQuery = searchInput.value.trim();
  fetchData(searchQuery, apiKey);
});
document.addEventListener('DOMContentLoaded', function () {
  lightbox = new SimpleLightbox('.gallery a', {});
});
loadMoreButton.addEventListener('click', () => {
  loadMoreImages();
});
function fetchData(searchQuery, apiKey, page = 1) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
  try {
    showLoadingIndicator();
    axios.get(url)
    .then(response => {
      const data = response.data;
      hideLoadingIndicator();
      if (data.hits.length === 0) {
        displayNoResultsMessage();
        return;
      }
      displayImages(data.hits);
      loadMoreButtonContainer.style.display = 'flex';
      totalHits = data.totalHits || 0;
      const perPage = 40;
      if (currentPage * perPage >= totalHits) {
        loadMoreButtonContainer.style.display = 'none';
      } else {
        loadMoreButtonContainer.style.display = 'flex';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      hideLoadingIndicator();
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    hideLoadingIndicator();
  }
}
function showLoadingIndicator() {
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading-indicator';
  loadingIndicator.innerText = 'Loading...';
  document.body.appendChild(loadingIndicator);
}
function hideLoadingIndicator() {
  const loadingIndicator = document.querySelector('.loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.remove();
  }
}
function displayNoResultsMessage() {
  const toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  const decorativeIcon = document.createElement('span');
  decorativeIcon.className = 'decorative-icon';
  decorativeIcon.innerHTML = '&#9737;';
  const errorMessage = document.createElement('p');
  errorMessage.innerText =
    'Sorry, there are no images matching your search query. Please, try again!';
  const closeButton = document.createElement('span');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '&times;';
  toastContainer.appendChild(decorativeIcon);
  toastContainer.appendChild(errorMessage);
  toastContainer.appendChild(closeButton);
  document.body.appendChild(toastContainer);
  closeButton.addEventListener('click', () => {
    toastContainer.remove();
  });
}
function displayImages(images) {
  const fragment = document.createDocumentFragment();
  images.forEach((image) => {
    const linkElement = document.createElement('a');
    linkElement.href = image.webformatURL;
    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;
    linkElement.style.width = 'calc((100% - 32px) / 3)';
    linkElement.style.height = 'auto';
    imgElement.style.width = '100%';
    imgElement.style.height = '100%';
    linkElement.style.marginBottom = '16px';
    linkElement.style.display = 'block';
    linkElement.appendChild(imgElement);
    fragment.appendChild(linkElement);
  });
  gallery.appendChild(fragment);
  if (lightbox) {
    lightbox.refresh();
  }
}
async function loadMoreImages() {
  currentPage++;
  const searchQuery = searchInput.value.trim();
  await fetchData(searchQuery, apiKey, currentPage);
  const perPage = 40;
  console.log('Current Page:', currentPage);
  console.log('Total Hits:', totalHits);
  console.log('Condition:', currentPage * perPage >= totalHits);
  if (currentPage * perPage >= totalHits) {
    loadMoreButtonContainer.style.display = 'none';
    console.log('Button should be hidden.');
  } else {
    loadMoreButtonContainer.style.display = 'flex';
    console.log('Button should be visible.');
  }
  const cardHeight = gallery.firstElementChild.clientHeight;
  window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
}