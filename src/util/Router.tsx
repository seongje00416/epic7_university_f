import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '@/page/MainPage.tsx';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router