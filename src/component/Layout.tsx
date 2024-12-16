import React from 'react';
import { useMenuBar } from "./hook/useMenuBar.ts";
import MenuNav from '@/component/MenuBar'

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const showMenuNav = useMenuBar();

    return (
        <div>
            {children}
            {showMenuNav && <MenuNav />}
        </div>
    );
};

export default Layout;