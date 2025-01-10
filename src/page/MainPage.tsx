import {
    MainContainer,
    MenuBarContainer,
    ContentContainer,
    CarouselContainer,
    SitemapContainer,
    MenuBar,
    MenuItem,
    LogoItem,
} from "@/style/Style_MainPage.ts";

const MainPage = () => {
    return (
        <MainContainer>
            <MenuBarContainer>
                <MenuBar>
                    <LogoItem> Epic7 UNIVERSITY </LogoItem>
                    <MenuItem> 설정 </MenuItem>
                </MenuBar>
            </MenuBarContainer>
            <ContentContainer>
                <CarouselContainer>
                    456454
                </CarouselContainer>
                <SitemapContainer>
                    ddd
                </SitemapContainer>
            </ContentContainer>
        </MainContainer>
    );
}

export default MainPage;