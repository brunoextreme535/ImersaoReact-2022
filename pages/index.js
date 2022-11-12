import React from "react";
import styled from "styled-components";
import config from "../config.json";
import Menu from "../src/components/menu/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import videoServices from "../src/services/videoService";

function HomePage() {
  const service = videoServices();
  const [valueFromFilter, setValueFromFilter] = React.useState("");
  const [playlists, setPlaylists] = React.useState({});

  React.useEffect(() => {
    service.getAllVideos().then((dados) => {
      // Forma imutável
      const newPlaylists = {};
      dados.data.forEach((video) => {
        if (!newPlaylists[video.playlist])
          newPlaylists[video.playlist] = [];
          newPlaylists[video.playlist] = [
            video,
            ...newPlaylists[video.playlist],
          ];
        });
      setPlaylists(newPlaylists);
    });
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          // backgroundColor: "red",>
        }}
      >
        <Menu
          valueFromFilter={valueFromFilter}
          setValueFromFilter={setValueFromFilter}
        />
        <Header />
        <Timeline searchValue={valueFromFilter} playlists={playlists}>
          Content
        </Timeline>
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50px;
  }
  .user-info {
    /* margin-top: 70px; */
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
  background-color: blue;
  background-image: url(${({ bg }) => bg});
  background-position: center;
  /* background-image: url(${config.bg}); -> para configs padronizadas e globais*/
  height: 230px;
`;

function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      {/* <img src="banner" /> */}
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline({ searchValue, ...props }) {
  const playlistNames = Object.keys(props.playlists);


  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName];
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized);
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}
