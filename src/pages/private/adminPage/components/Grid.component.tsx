import '../styles/gridAdmin.css'
import DoughnutChartSuscriptions from './home/Follow.component';
import GenreChart from './home/MostPopularGenre';
import StreamChart from './home/Stream.Component';
import MonthlyUsersChart from './home/UsersMonthly';


interface GridPros {
    followers?: string
}

const GridComponent = ({followers}: GridPros) => {
    return(
        <div className="container-admin">
            <div className="grid-container">
                <div className="most-popular-genre">
                    <GenreChart />
                </div>
                <div className="most-popular-streamer">
                    <StreamChart />
                </div>
                <div className="subscriptions">
                  <DoughnutChartSuscriptions />
                </div>
                <div className="followers">

                    <h1>Followers</h1>
                  <h2 className='count-follewers'>{followers} 234</h2>
                </div>
                <div className="users-monthly">
                   <MonthlyUsersChart />    
                </div>
            </div>
        </div>
    );
};


export default GridComponent;