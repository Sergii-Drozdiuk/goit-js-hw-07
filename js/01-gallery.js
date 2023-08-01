import { galleryItems } from './gallery-items.js';
// Change code below this line

const container = document.querySelector('.gallery');
container.insertAdjacentHTML('beforeend', createMarkup(galleryItems));
container.addEventListener('click', handlerClick)

function createMarkup(arr) {
   return arr.map(({ preview, original, description }) => `
   <li class="gallery__item">
      <a class="gallery__link" href="${original}">
         <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
         />
      </a>
   </li>`).join('');
}

let instance = null

function handlerClick(evt) {
   evt.preventDefault();
   if (evt.target.nodeName !== 'IMG') {
        return;
   }
   instance = basicLightbox.create(`<img src="${evt.target.dataset.source}">`);
   instance.show();
   document.addEventListener('keydown', closeOnEsc);
}

function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    instance.close();
    document.removeEventListener('keydown', closeOnEsc);
  }
}