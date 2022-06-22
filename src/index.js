import './sass/main.scss';
import ImagesApiService from './ApiService';
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    searchForm : document.querySelector(".search-form"),
    input : document.querySelector("input"),
    gallery : document.querySelector(".gallery"),
    loadMoreBtn: document.querySelector(".load-more"),
    endCollectionText: document.querySelector(".end-collection-text"),
    
};
const imagesApiServise = new ImagesApiService();
let lightbox = new SimpleLightbox('.gallery div a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });

console.log(imagesApiServise);

refs.loadMoreBtn.classList.add ("is-hidden");
refs.endCollectionText.classList.add ("is-hidden");
refs.searchForm.addEventListener("submit", onSearch);
refs.loadMoreBtn.addEventListener("click", onLoadMore);

async function onSearch(e){
    e.preventDefault();

    imagesApiServise.searchQuery = refs.input.value;

    if (imagesApiServise.searchQuery === '') {
    clearGallery();
    return Notiflix.Notify.warning('No information for matching!');
    refs.loadMoreBtn.classList.add ("is-hidden");
    refs.endCollectionText.classList.add ("is-hidden"); 
     }
    await imagesApiServise.resetPage();
    try{
        
        const imagesFound = await imagesApiServise.fetchImages().then(images =>{
            clearGallery();
            if (images.totalHits === 0){
                clearGallery();
                refs.loadMoreBtn.classList.add ("is-hidden");
                refs.endCollectionText.classList.add ("is-hidden"); 
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            } else {
                if(images.totalHits<40){
                    appendCardsMarckup(images.hits);
                    lightbox.refresh();  
                    refs.loadMoreBtn.classList.add ("is-hidden");
                    refs.endCollectionText.classList.remove ("is-hidden"); 
                }else{
                appendCardsMarckup(images.hits);
                lightbox.refresh();
                refs.loadMoreBtn.classList.remove ("is-hidden");
                refs.endCollectionText.classList.add ("is-hidden"); 
                }
            };
        })
                        
    }catch(error){
        console.log(error)
        
    }
 
}       
function onLoadMore(){
    imagesApiServise.fetchImages().then(images =>{
        appendCardsMarckup(images.hits);
        lightbox.refresh();
    });
}

function appendCardsMarckup(card){
    const markup = card.map((element) => 
    `<div class="photo-card">
        <a href="${element.webformatURL}">
      <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
      </a>
      <div class="info">
       <p class="info-item">
         <b>Likes</b>${element.likes}
       </p>
        <p class="info-item">
          <b>Views</b>${element.views}
        </p>
        <p class="info-item">
          <b>Comments</b>${element.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${element.downloads}
        </p>
      </div>
      </div>`
   ).join("")
     console.log(markup)
     refs.gallery.insertAdjacentHTML("beforeend", markup)
}

function clearGallery(){
refs.gallery.innerHTML ="";
}

