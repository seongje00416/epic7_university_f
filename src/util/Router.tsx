import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '@/page/MainPage.tsx';
import EstimateHeroPage from "@/page/estimating/EstimateHeroPage.tsx";
import EstimateEquipmentPage from "@/page/estimating/EstimateEquipmentPage.tsx";
import MenuBarComponent from "@/component/MenuBarComponent.tsx";

const Router = () => {
    return (
        <BrowserRouter>
            <MenuBarComponent />
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/estimate/hero' element={<EstimateHeroPage />} />
                <Route path='/estimate/equipment' element={<EstimateEquipmentPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router