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
                        <SitemapCategory> 영웅 </SitemapCategory>
                        <SitemapItem> 영웅 평가 </SitemapItem>
                        <SitemapItem> 영웅 목록 </SitemapItem>
                    </SitemapWrapper>
                    <SitemapWrapper>
                        <SitemapCategory> 장비 </SitemapCategory>
                        <SitemapItem> 장비 평가 </SitemapItem>
                        <SitemapItem> 세트 정보 </SitemapItem>
                    </SitemapWrapper>
                </SitemapContainer>
            </ContentContainer>
        </MainContainer>
    );
}

export default MainPage;