import { Eye } from "lucide-react";
import styled from "styled-components";

interface CardStreamersLiveComponentProps {
  user_name: string;
  title: string;
  game_name: string;
  viewer_count: string;
  profile_image_url: string;
}

const CardStreamersLiveComponent = (props: CardStreamersLiveComponentProps) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div>
          <img
            src={props.profile_image_url}
            alt="img-streamer-porfile"
            className="img-streamer-porfile"
          />
        </div>
        <div className="dataStreamer-card">
          <div className="container-title-and-viewers">
            <h1 className="card-title">{props.user_name}</h1>
            <div className="container-viewers-watchStream">
              <Eye style={{ color: "#2F3241" }} />
              {props.viewer_count}
            </div>
          </div>
          <h4 className="title-stream-watchStream">{props.title}</h4>
          <p className="gameName-stream">{props.game_name}</p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 800px;
    height: 200px;
    box-sizing: border-box;
    background-color: #212121;
    border: 5px solid #222;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px, inset rgba(0, 0, 0, 0.19) 0px 10px 20px,
      inset rgba(0, 0, 0, 0.23) 0px 6px 6px;
    transition: all ease-in-out 0.3s;
    overflow: hidden;
  }

  .card:hover {
    box-shadow: rgba(240, 128, 128, 0.19) 0px 10px 20px,
      rgba(240, 128, 128, 0.23) 0px 6px 6px,
      inset rgba(0, 0, 0, 0.19) 0px 10px 20px,
      inset rgba(0, 0, 0, 0.23) 0px 6px 6px;
    border: 5px solid #f08080;
    transform: translateY(-6px);
  }

  .card-title {
    margin: 0;
    font-weight: 600;
    color: #f08080;
    cursor: default;
    text-shadow: 2px 2px 4px rgb(0, 0, 0);
    transition: transform 0.3s ease, color 0.3s ease, text-shadow 0.3s ease,
      letter-spacing 0.3s ease;
  }

  .card-title:hover {
    transform: translateY(-5px);
    color: #f08080;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
    letter-spacing: 1px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  .card-des {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
    word-break: break-all;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    cursor: default;
  }

  .card-text {
    position: absolute;
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    right: 20px;
    bottom: 5px;
    display: flex;
    align-items: center;
    gap: 3px;
    opacity: 0;
    transition: all ease-in-out 0.3s;
    animation: textanimate 0.8s alternate infinite;
    cursor: pointer;
  }

  .card:hover > .card-text {
    opacity: 1;
  }

  @keyframes textanimate {
    0% {
      right: 20px;
    }

    100% {
      right: 10px;
    }
  }

  .arrow-icon {
    font-size: 15px;
    font-weight: 500;
  }
`;

export default CardStreamersLiveComponent;
