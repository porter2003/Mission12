import { useEffect, useState } from "react";
import './CategoryFilter.css';

function CategoryFilter({
    selectedCategories, 
    setSelectedCategories,
    }:{
        selectedCategories: String[],
    setSelectedCategories: (categories: String[]) => void}) {

    const [categories, setCategories] = useState<String[]>([]);


    useEffect(() => {
        const fetchCategories = async() => {
        try{
            const response = await fetch("https://localhost:5000/api/Book/GetBookTypes");
            const data = await response.json();
            console.log("Fetched categories", data);
            setCategories(data);
        }
            catch (error) {
            console.error("Error fetching categories: ", error);}
            };

        fetchCategories();
    }, []);

    function handleCheckboxChange({target}:{target:HTMLInputElement}){ 
        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter((x) => x !== target.value) : [...selectedCategories, target.value];
        setSelectedCategories(updatedCategories);
    }


    return (
        <div>
            <h5>Book types</h5>
            <div className="category-filter">
                {categories.map((c) => (
                    <div key={String(c)} className="category-item">
                        <input type="checkbox" id={String(c)} 
                        name={String(c)} 
                        value={String(c)} 
                        className="category-checkbox" 
                        onChange= {handleCheckboxChange}
                        />
                        <label htmlFor={String(c)}>{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default CategoryFilter;