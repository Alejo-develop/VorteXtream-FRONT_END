import {
  Popcorn,
  House,
  TvMinimalPlay,
  Heart,
  BotMessageSquare,
  Video,
  LogOut,
} from "lucide-react";
import "./styles/navbarStyles.css";

export function NavBarLayout() {
  return (
    <div>
      <nav className="sidebar">
        <a href="#home" className="icon-link">
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
            <button type="submit"  className="icon-link"><LogOut/></button>
        </div>
      </nav>

    </div>
  );
}
