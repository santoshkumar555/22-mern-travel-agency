import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/authContext";
import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";
import GlobalToast from "@/components/global/GlobalToast";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
    title: "TravelNest | Premium Travel Agency",
    description: "Discover hand-picked destinations and premium journeys crafted for those who seek the extraordinary.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable}`} data-scroll-behavior="smooth">
            <body suppressHydrationWarning className="font-sans text-slate-800 bg-sky-50">
                <ReduxProvider>
                    <AuthProvider>
                        <GlobalToast />
                        {children}
                    </AuthProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}
