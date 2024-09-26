import ButtonHeaderComponent from "./buttonHeaderWatchNow.component";
import smallLogo from '../../../../assets/img/smallLogo.png'

// Functional component that represents the header of the media watch page
const HeaderWatchMediaComponent = () => {
  return (
    <header className="headerWatchMedia">
      <div className="trigger">
        <div className="container-options-headerWatchMedia"> {/* Container for navigation buttons */}
          <ButtonHeaderComponent text='Back' path='back'/>

          <ButtonHeaderComponent text='Home' path='/'/>

          <ButtonHeaderComponent text='Movies / Series' path='/searchpage'/>

          <ButtonHeaderComponent text='Anime' path='/animes'/>

          <ButtonHeaderComponent text='Streams' path='/streams'/>

        </div>
        <div>
        <img src={smallLogo} alt="smallLogo" className="smallLogo-watchMedia" />  {/* Logo image */}
        </div>
      </div>
    </header>
  );
};

export default HeaderWatchMediaComponent;
