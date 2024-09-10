import CardGenreComponent from "./components/Cards.component";
import { HeaderSearchPage } from "./components/header.component";

export default function SearchPage() {
    return (
        <div>
            <HeaderSearchPage />
            <CardGenreComponent /> {/* Ahora maneja todos los géneros */}
        </div>
    );
}
