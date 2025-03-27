import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { CartItem } from "../types/CartItem";

function DonatePage(){
    const navigate = useNavigate();
    const {bookName, bookID}= useParams();
    const {addToCart} = useCart();
    const [donationAmount, setDonationAmount] = useState<number>(0);
    

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookId: Number(bookID), // This should be replaced with the actual book ID
            bookName: bookName || "No book found",
            donationAmount
        };
            addToCart(newItem);
            navigate('/cart');
        };

    return (
        <>
        <WelcomeBand/>
        <h2>Donate to {bookName}</h2>
        <div>
            <input type="number" placeholder="Enter the amount you would like to donate"
             value={donationAmount} onChange={(x)=> setDonationAmount(Number(x.target.value))}/>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
        <button onClick={() => navigate(-1)}>Go back</button>
        </>
    );
}

export default DonatePage;