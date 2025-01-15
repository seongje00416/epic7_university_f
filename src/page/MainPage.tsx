import {
    MainContainer,
    ContentContainer,
    CarouselContainer,
    SitemapContainer,
    SitemapWrapper,
    SitemapCategory,
    SitemapItem,
} from "@/style/Style_MainPage.ts";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <MainContainer>
            <ContentContainer>
                <CarouselContainer>
                    456454
                </CarouselContainer>
                <SitemapContainer>
                    <SitemapWrapper>
                        <SitemapCategory> 뉴스 </SitemapCategory>
                        <SitemapItem> 공지사항 </SitemapItem>
                        <SitemapItem> 소개 </SitemapItem>
                    </SitemapWrapper>
                    <SitemapWrapper>
                        <SitemapCategory> 평가 </SitemapCategory>
                        <SitemapItem onClick = { () => navigate('/estimate/hero')}> 영웅 평가 </SitemapItem>
                        <SitemapItem onClick = { () => navigate('/estimate/equipment')}> 장비 평가 </SitemapItem>
                    </SitemapWrapper>
                    <SitemapWrapper>
                        <SitemapCategory> 퀴즈 </SitemapCategory>
                        <SitemapItem> 에픽 퀴즈 </SitemapItem>
                        <SitemapItem> 퀴즈 랭킹 </SitemapItem>
                    </SitemapWrapper>
                </SitemapContainer>
            </ContentContainer>
        </MainContainer>
    );
}

export default MainPage;