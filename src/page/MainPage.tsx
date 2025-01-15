import {
    MainContainer,
    ContentContainer,
    CarouselContainer,
    SitemapContainer,
    SitemapWrapper,
    SitemapCategory,
    SitemapItem,
} from "@/style/Style_MainPage.ts";

const MainPage = () => {
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
                        <SitemapItem> 영웅 평가 </SitemapItem>
                        <SitemapItem> 장비 평가 </SitemapItem>
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