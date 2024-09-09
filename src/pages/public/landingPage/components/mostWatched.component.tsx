import WatchNowButtonComponent from "../../../../common/components/watchNowButton/watchNow.component"
import '../styles/mostWatchedMedia.css'

const MostWatchedMediaComponent = () => {
    return (
        <div className="container">
            <h3>Most watched...</h3>


            <WatchNowButtonComponent />
        </div>
    )
}

export default MostWatchedMediaComponent