import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/component/Layout'
import EstimateHeroPage from '@/page/EstimateHeroPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Layout>
                <div style={{
                    height: 'calc(100vh - 45px)',
                    position: 'fixed',
                    top: '45px',
                    left: 0,
                    right: 0 }}>
                    <Routes>
                        <Route path='/estimatehero' element={<EstimateHeroPage />} />
                    </Routes>
                </div>
            </Layout>
        </BrowserRouter>
    )
}

export default Router