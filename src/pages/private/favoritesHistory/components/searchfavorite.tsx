import React from "react"
import { InputSearch } from "../../../../common/components/searchComponent/search.component";

type FavoriteSearchProps = {
    onSearch: (query: string) => void
}

export const FavoriteSearch: React.FC<FavoriteSearchProps> = ({ onSearch }) => {
    return (
        <div className="Overlay-central">
            <InputSearch onSearch={onSearch}/>
        </div>
    )
}