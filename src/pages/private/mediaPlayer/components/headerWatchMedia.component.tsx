import ButtonHeaderComponent from "./buttonHeaderWatchNow.component";
import smallLogo from '../../../../assets/img/smallLogo.png'

const HeaderWatchMediaComponent = () => {
  return (
    <header className="headerWatchMedia">
      <div className="trigger">
        <div className="container-options-headerWatchMedia">
          <ButtonHeaderComponent text='Back' path='back'/>

          <ButtonHeaderComponent text='Home' path='/'/>

          <ButtonHeaderComponent text='Movies / Series' path='/searchpage'/>

          <ButtonHeaderComponent text='Anime' path='/animes'/>

          <ButtonHeaderComponent text='Streams' path='/streams'/>

        </div>
        <div>
        <img src={smallLogo} alt="smallLogo" className="smallLogo-watchMedia" />
        </div>
      </div>
    </header>
  );
};

export default HeaderWatchMediaComponent;
