import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '@/page/MainPage.tsx';
import { MenuBarContainer, MenuBar, LogoItem, MenuItem } from "@/style/Style_MainPage";

const Router = () => {
    return (
        <BrowserRouter>
            <MenuBarContainer>
                <MenuBar>
                    <LogoItem> Epic7 UNIVERSITY </LogoItem>
                    <MenuItem> 설정 </MenuItem>
                </MenuBar>
            </MenuBarContainer>
            <Routes>
                <Route path='/' element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router