import { galleryItems } from './gallery-items.js';
// Change code below this line

const container = document.querySelector('.gallery');
container.insertAdjacentHTML('beforeend', createMarkup(galleryItems));
container.addEventListener('click', handlerClick);

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `
    )
    .join('');
}

function handlerClick(evt) {
  evt.preventDefault();
  const targetImg = evt.target.closest('img');
  if (!targetImg) {
    return;
  }
  
  const instance = basicLightbox.create(`<img src="${targetImg.dataset.source}">`, {
    onShow: () => {
      document.addEventListener('keydown', closeOnEsc);
     },
     onClose: () => {
      document.removeEventListener('keydown', closeOnEsc);
    },
  });
  instance.show();

   function closeOnEsc(evt) {
    if (evt.key === 'Escape') {
    instance.close();
   }
  }
}

