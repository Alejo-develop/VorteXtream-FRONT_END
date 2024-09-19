import "./style.css";
import CardCastComponent from "./cardCast.component";

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
}

interface ContainerCastsComponentProps {
  actors: Actor[] | undefined;
  type?: string;
  broadcast?: {
    day: string;
    time: string;
    timezone: string;
  };
}

const ContainerCastsOrInfoAnimeComponent = ({
  actors,
  type,
  broadcast,
}: ContainerCastsComponentProps) => {
  console.log(actors, broadcast);

  return (
    <div className="container-cast-scroll">
      <h2 className="title-casts">{type} </h2>

      <div className={type !== 'anime' ? "scroll-casts": 'container-info-anime'}>
        {actors && actors.length > 0 ? (
          actors.map((data) => (
            <CardCastComponent
              key={data.id} // No olvides agregar una key única
              name={data.name}
              img={
                data.profile_path
                  ? `https://image.tmdb.org/t/p/w500${data.profile_path}`
                  : "ruta/placeholder.png"
              } // Reemplaza con tu ruta de placeholder
            />
          ))
        ) : broadcast ? (
          <div className="anime-info-container-WatchMedia">
            <div>
              <h4 className="title-info-anime">Day</h4>
              <p>{broadcast.day}</p>
            </div>
            <div >
              <h4 className="title-info-anime">Time</h4>
              <p>{broadcast.time}</p>
            </div>
            <div >
              <h4 className="title-info-anime">Time Zone</h4>
              <p>{broadcast.timezone}</p>
            </div>
          </div>
        ) : (
          <h2 className="title-notfound-cats">Not Update Yet.</h2>
        )}
      </div>
    </div>
  );
};

export default ContainerCastsOrInfoAnimeComponent;
