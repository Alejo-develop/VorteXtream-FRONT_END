import "./style.css";
import CardCastComponent from "./cardCast.component";

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
}

interface ContainerCastsComponentProps {
  actors: Actor[] | undefined;
}

const ContainerCastsComponent = ({ actors }: ContainerCastsComponentProps) => {
  console.log(actors);

  return (
    <div className="container-cast-scroll">
      <h2 className="title-casts">casts</h2>

      <div className="scroll-casts">
        {actors && actors.length > 0 ? (
          actors.map((data) => (
            <CardCastComponent
              key={data.id} // No olvides agregar una key única
              name={data.name}
              img={data.profile_path ? `https://image.tmdb.org/t/p/w500${data.profile_path}` : "ruta/placeholder.png"} // Reemplaza con tu ruta de placeholder
            />
          ))
        ) : (
          <h2 className="title-notfound-cats">Not Update Yet.</h2> 
        )}
      </div>
    </div>
  );
};

export default ContainerCastsComponent;
