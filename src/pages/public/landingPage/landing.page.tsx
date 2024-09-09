import HeaderComponent from "../../../common/components/header/header.component";
import MostWatchedMediaComponent from "./components/mostWatched.component";
import MostWatchedStreamComponent from "./components/mostWatchedStream.component";
import './styles/index.css'

export default function LandingPage(){
    return (
        <div>
            <HeaderComponent />


            <div className="mostWatched-media">
                <MostWatchedMediaComponent />

                <MostWatchedStreamComponent />
            </div>
        </div>
    )
}