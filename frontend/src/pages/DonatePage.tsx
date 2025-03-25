import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";

function DonatePage(){
    const navigate = useNavigate();
    const {bookName}= useParams();
    return (
        <>
        <WelcomeBand/>
        <h2>Donate to {bookName}</h2>
        <div>
            <input type="number" placeholder="Enter the amount you would like to donate" />
            <button>Add to Cart</button>
        </div>
        <button onClick={() => navigate(-1)}>Go back</button>
        </>
    );
}
export default DonatePage;