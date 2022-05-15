import { ConfigProvider } from 'antd'
import arEG from 'antd/lib/locale/ar_EG'
import enUS from 'antd/lib/locale/en_US'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastProvider } from 'react-toast-notifications'
import { RecoilRoot, useRecoilValue } from 'recoil'
import * as gtag from '../lib/gtag'
import '../shared/i18n'
import { language } from '../stores/atoms/app_config_atom'
import '../styles/global.scss'

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient()
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <>
      <Script
        id="1"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="2"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Sub_App Component={Component} pageProps={pageProps} />
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default MyApp

const Sub_App = ({ Component, pageProps }) => {
  const lan = useRecoilValue(language)
  typeof window !== 'undefined' && sessionStorage.setItem('i18nextLng', lan)
  const [direction, setDirection] = useState('ltr')
  const [langstate, setlangstate] = useState(
    typeof window !== 'undefined' && sessionStorage.getItem('i18nextLng'),
  )

  useEffect(() => {
    setlangstate(lan)
    document.body.style.direction = langstate == 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = langstate == 'ar' ? 'ar-EG' : 'en-US'
    document.documentElement.dir = langstate == 'ar' ? 'rtl' : 'ltr'
    setDirection(langstate == 'ar' ? 'rtl' : 'ltr')
  }, [langstate, lan])

  return (
    <>
      <ConfigProvider
        locale={langstate == 'ar' ? arEG : enUS}
        direction={direction}
      >
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </ConfigProvider>
    </>
  )
}
