import { useState } from "react";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeBand from "../components/WelcomeBand";

function BooksPage(){
    const [selectedCategories, setSelectedCategories] = useState<String[]>([]);
    
    return(
        <div className='container'>

        <WelcomeBand/>

      <div className='row'>
      <div className='col-md-3'>
         <CategoryFilter 
         selectedCategories ={selectedCategories} 
         setSelectedCategories ={setSelectedCategories}/>
      </div>
      <div className='col-md-9'>
        <BookList selectedCategories = {selectedCategories}/>
        </div>
      </div>
    </div>

    );
}
export default BooksPage;