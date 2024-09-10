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

interface NavbarProps {
  children: React.ReactNode;
}

export function NavBarLayout(props: NavbarProps) {
  const auth = useAuth()

  const RenderForm = auth.isAuthenticated ? <LogOutComponentButton/> : null

  return (
    <div className="container-nav">
      <nav className="sidebar">
        <a href="#home" className="icon-link" id="icon">
          <House size={28} />
        </a>
        <a href="#about" className="icon-link">
          <Popcorn size={28} />
        </a>
        <a href="#services" className="icon-link">
          <TvMinimalPlay size={28} />
        </a>
        <a href="#contact" className="icon-link">
          <Heart size={28} />
        </a>
        <a href="#messages" className="icon-link">
          <BotMessageSquare size={28} />
        </a>
        <a href="#videos" className="icon-link">
          <Video size={28} />
        </a>
        <div className="log-out">
          {RenderForm}
        </div>
      </nav>

      {props.children}
    </div>
  );
}
