import { useEffect, useState } from "react"
import CardComponent from "../../../common/components/sliderCards.component/sliderCard.component"
import useAlert from "../userMenu/components/alert.component"
import { CardProps } from "../../../common/interfaces/media.interface";

interface Favorite {
    favorite: boolean[];
}

const BASE_URL = "http://localhost:3000"

const { showAlert } = useAlert()
const [favoriteCard, setFavoriteCard] = useState<Favorite>();
const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

const fetchJson = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Fetch error");
    }
    return res.json();
};

useEffect(() => {
    const fetchFavorites = async () => {
        try {
            const favorites = await fetchJson(`${BASE_URL}/favorites`);
            const favoritesList = favorites.favorite.map((favorite: boolean) => favorite === true)
            setFavoriteCard(favoritesList);
        } catch (error) {
            setErrorMessage("An error occurred while fetching favorites");
            console.error("Error fetching favorites:", error);
        }
    }
    fetchFavorites();
});

useEffect(() => {
    const seeFavorites = async () => {
        try {
          
        } catch (error) {
            
        }
    } 
})


export default function FavoritesHistoryPage(){
    return(
        <div>
            <h1>Hola desde favorites and history page</h1>
        </div>
    )
}