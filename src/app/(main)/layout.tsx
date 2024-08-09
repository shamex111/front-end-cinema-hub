import MainLayout from "@/components/ui/main-layout/MainLayout";
import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren<unknown>> = ({children}) => {
    return <MainLayout>{children}</MainLayout>
    
}
export default Layout