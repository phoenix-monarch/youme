import axiosClient from "apis/axiosClient";
import configAPI from "apis/configAPI";
import { useEffect, useState } from "react";
import { HomeSection } from "interfaces/api";
import styled from "styled-components";
import Banner from "module/home/Banner";
import Popular from "module/home/Popular";

const StyledHome = styled.div``;
const StyledWrapperLayout = styled.div`
  display: flex;
  gap: 40px;
  padding-top: 50px;
  min-height: 100vh;
  .wrapper-main {
    flex: 1;
  }
  .wrapper-side {
    width: 300px;
  }
`;

const Home = () => {
  const [banners, setBanners] = useState<HomeSection[]>([]);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get(configAPI.getHome(0));
      // const response1 = await axiosClient.get(
      //   "https://ga-mobile-api.loklok.tv/cms/app/search/v2/searchLeaderboard",
      // );
      // console.log(response1.data.data);
      setBanners(response.data.data.recommendItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StyledHome>
      <Banner banners={banners} />
      <StyledWrapperLayout className="container">
        <div className="wrapper-main">
          <Popular />
        </div>
        <div className="wrapper-side">Side</div>
      </StyledWrapperLayout>
    </StyledHome>
  );
};

export default Home;

// "https://ga-mobile-api.loklok.tv/cms/app/search/v1/searchLeaderboard",
