import {
  Popcorn,
  House,
  TvMinimalPlay,
  Heart,
  BotMessageSquare,
  Video,
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
        <ButtonNavBa path="/" icono={<House size={28} />} className="icon-link" />
        <ButtonNavBa path="/searchpage" icono={<Popcorn size={28} />} className="icon-link" />
        <ButtonNavBa path="#services" icono={<TvMinimalPlay size={28} />} className="icon-link" />
        <ButtonNavBa path="#contact" icono={<Heart size={28} />} className="icon-link" />
        <ButtonNavBa path="#messages" icono={<BotMessageSquare size={28} />} className="icon-link" />
        <ButtonNavBa path="#videos" icono={<Video size={28} />} className="icon-link" />
        <div className="log-out">
          {RenderForm}
        </div>
      </nav>

      {props.children}
    </div>
  );
}
