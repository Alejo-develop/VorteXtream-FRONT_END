import CardGenreComponent from "../../../common/components/cardComponent/Cards.component";
import { HeaderSearchPage } from "./components/header.component";

export default function SearchPage(filter: string | null) { 
    return (
        <div>
            <HeaderSearchPage />
            <CardGenreComponent /> {/* Ahora maneja todos los géneros */}
        </div>
    );
}
