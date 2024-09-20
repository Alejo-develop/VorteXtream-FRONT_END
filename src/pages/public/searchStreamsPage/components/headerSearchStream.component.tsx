import { useAuth } from "../../../../auth/auth.provider";
import LoginButtonComponent from "../../../../common/components/loginButton/loginButton.component";

import SignUpButtonComponent from "../../../../common/components/SignUpButton/signUpButton.component";
import UserConfigComponent from "../../../../common/components/userConfig/userConfig.component";
import SearchBarComponent from "./searchBar.component";

interface HeaderSearchStreamsProps {
  onSearchange: (query: string) => void;
}

const HeaderSearchStreamComponent = ({
  onSearchange,
}: HeaderSearchStreamsProps) => {
  const auth = useAuth();

  const RenderForm2 = auth.isAuthenticated ? UserConfigComponent: LoginButtonComponent

  return (
    <div className="header-container-searchPage">
      <div className="title-buttons-headerSearchStreams-container">
        <h1 className="search-stream-title">WHAT YOU WANT TO SEE TODAY?</h1>

        <div className="buttons-contianer-headerSearchStream">
        {auth.isAuthenticated === false &&( 
          <SignUpButtonComponent  />
        )}
        <RenderForm2 className="container-menuUser-searchStream"/>
        </div>
      </div>
      <SearchBarComponent onSearchChange={onSearchange} />
    </div>
  );
};

export default HeaderSearchStreamComponent;
