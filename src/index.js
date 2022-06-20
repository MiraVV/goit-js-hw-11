import './sass/main.scss';
import ImagesApiService from './ApiService';

const refs = {
    searchForm : document.querySelector(".search-form"),
    input : document.querySelector("input"),
    gallery : document.querySelector(".gallery"),
    loadMoreBtn: document.querySelector(".load-more"),
    
};
const imagesApiServise = new ImagesApiService();

console.log(imagesApiServise);

refs.searchForm.addEventListener("submit", onSearch);
refs.loadMoreBtn.addEventListener("click", onLoadMore);

async function onSearch(e){
    try{
        e.preventDefault();

        imagesApiServise.searchQuery = refs.input.value;
        
        await imagesApiServise.resetPage();
        const imagesFound = await imagesApiServise.fetchImages();
    }catch(error){
        console.log(error)
    }
    
}

function onLoadMore(){
    imagesApiServise.fetchImages().this.morePage();
}
