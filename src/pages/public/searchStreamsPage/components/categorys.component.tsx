interface CardCategoryProps{
  id: string;
  name: string;
  box_art_url: string;
  onClick: (id: string) => void;
}

const CardCategorysComponent = ({ id, name, box_art_url, onClick }: CardCategoryProps) => {
  return (
    <div key={id} className="container-categoryCard-stream">
      <button className="button-categoryCard-stream" onClick={() => onClick(id)}>
        <img src={box_art_url.replace('{width}', '300').replace('{height}', '400')} className="img-categoryCard" alt="Bannner-category-stream" />
        <h2 className="title-categoryCard">{name}</h2>
      </button>
    </div>
  );
};

export default CardCategorysComponent;
