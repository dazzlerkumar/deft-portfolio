import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <div className={"mx-auto max-w-6xl"}>
                {/*     {isFullPageHeader ? (
                    <div className="flex flex-col xl:pb-8">
                        <HeaderTop />
                        <main className="transition-all duration-300">
                            {children}
                        </main>
                    </div>
                ) : ( */}
                <div className="flex flex-col lg:flex-row lg:gap-2 lg:py-4 xl:pb-8">
                    {/*  <HeaderSidebar /> */}
                    <main className="max-w-[915px] transition-all duration-300 lg:w-4/5">
                        {children}
                    </main>
                </div>
                {/*   )} */}
            </div>
            {/* {isShowChatButton && <ChatButton />}
            {isMobile ? <NowPlayingCard /> : <NowPlayingBar />} */}
        </>
    );
};

export default Layout;
