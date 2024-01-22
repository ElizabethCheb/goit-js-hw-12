import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;
let currentPage = 1;
const apiKey = '41856148-e541297002e84807a45dae6d1';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
const loadMoreButton = document.getElementById('load-more-button');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const searchQuery = searchInput.value.trim();
  currentPage = 1; // Reset page when a new search is performed
  fetchData(searchQuery, apiKey);
});

loadMoreButton.addEventListener('click', function () {
  currentPage++;
  const searchQuery = searchInput.value.trim();
  fetchData(searchQuery, apiKey);
});

document.addEventListener('DOMContentLoaded', function () {
  lightbox = new SimpleLightbox('.my-gallery-class a', {});

});

async function fetchData(searchQuery, apiKey) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`;

  showLoadingIndicator();

  try {
    const data = await fetch(url).then(response => response.json());

    hideLoadingIndicator();

    if (data.hits.length === 0) {
      displayNoResultsMessage();
    } else {
      displayImages(data.hits);
      showLoadMoreButton();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    hideLoadingIndicator();
    displayErrorMessage('An error occurred while fetching data. Please try again.');
  }
}

function showLoadingIndicator() {
  const loadingIndicator = document.querySelector('.loading-indicator');
  if (!loadingIndicator) {
    const newLoadingIndicator = document.createElement('div');
    newLoadingIndicator.className = 'loading-indicator';
    newLoadingIndicator.innerText = 'Loading...';
    document.body.appendChild(newLoadingIndicator);
  }
}

function hideLoadingIndicator() {
  const loadingIndicator = document.querySelector('.loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.remove();
  }
}

function clearGallery() {
  while (gallery.firstChild) {
    gallery.removeChild(gallery.firstChild);
  }
}


function displayNoResultsMessage() {
  const toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  const decorativeIcon = document.createElement('span');
  decorativeIcon.className = 'decorative-icon';
  decorativeIcon.innerHTML = '&#9737;';
  const errorMessage = document.createElement('p');
  errorMessage.innerText = 'Sorry, there are no images matching your search query. Please, try again!';
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

  hideLoadMoreButton(); // Hide the "Load more" button when there are no results
}

function displayImages(images) {
  const fragment = document.createDocumentFragment();
  images.forEach(image => {
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
    lightbox.refresh(); // Оновлення екземпляру SimpleLightbox після додавання нових зображень
  }
}

function showLoadMoreButton() {
  loadMoreButton.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreButton.style.display = 'none';
}

gallery.addEventListener('click', function (event) {
  if (event.target.tagName === 'IMG' && lightbox) {
    lightbox.open({ elements: [event.target] });
  }
});

// Additional styling for gallery images and links
const galleryImages = document.querySelectorAll('.gallery img');
galleryImages.forEach(image => {
  image.style.width = 'calc((100% - 32px) / 3)';
  image.style.height = 'auto';
  image.style.marginBottom = '16px';
});

const galleryLinks = document.querySelectorAll('.gallery a');
galleryLinks.forEach(link => {
  link.style.width = 'calc((100% - 32px) / 3)';
  link.style.height = 'auto';
  link.style.marginBottom = '16px';
});
