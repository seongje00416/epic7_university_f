import {LogoItem, MenuBar, MenuBarContainer, MenuItem} from "@/style/Style_MainPage.ts";
import { useNavigate } from "react-router-dom";

const MenuBarComponent = () => {
    const navigate = useNavigate();

    return (
        <MenuBarContainer>
            <MenuBar>
                <LogoItem onClick = { () => navigate('/')}> Epic7 UNIVERSITY </LogoItem>
                <MenuItem> 설정 </MenuItem>
            </MenuBar>
        </MenuBarContainer>
    )
}

export default MenuBarComponent;