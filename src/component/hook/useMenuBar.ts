import { useLocation } from 'react-router-dom';

export const useMenuBar = () => {
    const location = useLocation();

    // 하단 네비게이션 바를 숨길 경로들
    const hiddenPaths = [
        ''
    ];

    return !hiddenPaths.includes(location.pathname);
};