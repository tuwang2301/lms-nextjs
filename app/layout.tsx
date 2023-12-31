import type { Metadata } from 'next'
import { Roboto_Slab } from 'next/font/google'
import NavBar from '../components/NavBar'
import './global.css'
import { AuthProvider } from '../utils/context/AuthProvider'
import StyledComponentsRegistry from '../lib/AntdRegistry';
import { ConfigProvider } from 'antd'
import theme from '../theme/themeconfig';
import Footer from '../components/Footer'
import { getServerSession } from 'next-auth'
import SessionProvider from '../components/SessionProvider'
import { QueryClient } from '@tanstack/react-query'
import QueryClientProvider from './ReactQueryProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import "react-toastify/ReactToastify.css";

const roboto = Roboto_Slab({ subsets: ['vietnamese'], weight: ['100', '400', '600', '800'] })

export const metadata: Metadata = {
  title: 'LMS',
  description: 'Learning Management System',
}

const queryClient = new QueryClient();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://w7.pngwing.com/pngs/826/933/png-transparent-learning-management-system-education-lms-thumbnail.png"
        />
      </head>
      <body className={roboto.className}>
        <AuthProvider>
          <SessionProvider session={session}>
            <StyledComponentsRegistry>
              <ConfigProvider theme={theme} >
                <QueryClientProvider>
                  <main>
                    <NavBar />
                    {children}
                    <Footer />
                  </main>
                  <ReactQueryDevtools initialIsOpen={false} position='bottom-left' />
                </QueryClientProvider>
              </ConfigProvider>
            </StyledComponentsRegistry>
          </SessionProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
