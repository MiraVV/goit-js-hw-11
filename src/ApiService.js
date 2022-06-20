import axios from "axios";


export default class ImagesApiService {
    constructor() { 
        this.searchQuery = "";
        this.page = 1;
    }
    
    async fetchImages() {
        console.log(this.page)
        const BASE_URL ="https://pixabay.com/api/"
        const API_KEY = "28085560-20e71cd79b088a688c0cfa752";
        const URL = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
        const response = await axios.get(URL);
        console.log(response)
          this.morePages()
        return response.data;
    
      
    };
  morePages() {
        this.page += 1;
    }
   async resetPage() {
        this.page = 1;
    }
}