import {
  Popcorn,
  House,
  TvMinimalPlay,
  Heart,
  BotMessageSquare,
  Video,
  Soup 
} from "lucide-react";
import "./styles/navbarStyles.css";
import LogOutComponentButton from "../common/components/logOutButton/logOutButton.component";
import { useAuth } from "../auth/auth.provider";
import { ButtonNavBa } from "../common/components/navbarButtonsComponents/navbarButton.component";

interface NavbarProps {
  children: React.ReactNode;
}

export function NavBarLayout(props: NavbarProps) {
  const auth = useAuth();

  const RenderForm = auth.isAuthenticated ? <LogOutComponentButton /> : null;

  return (
    <div className="container-nav">
      <nav className="sidebar">
        <ButtonNavBa path="/" icono={<House size={28} />} text="Home" className="icon-link" />
        <ButtonNavBa path="/searchpage" icono={<Popcorn size={28} />} text="Movies / Series" className="icon-link" />
        <ButtonNavBa path="/animes" icono={<Soup size={28} />} text="Anime" className="icon-link" />
        <ButtonNavBa path="/streams" icono={<TvMinimalPlay size={28} />} text="Streams" className="icon-link" />
        <ButtonNavBa path="/history&favorites" icono={<Heart size={28} />} text="Favorites" className="icon-link" />
        <ButtonNavBa path="/mystream" icono={<Video size={28} />} text="Create you'r stream" className="icon-link" />
        <div className="log-out">
          {RenderForm}
        </div>
      </nav>

      {props.children}
    </div>
  );
}
