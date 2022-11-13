import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../components/common/ErrorFallback'

export type NextPageWithLayout<TProps> = NextPage<TProps> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<any>
}

const onError = (error: Error, info: {componentStack: string}) => {
  // Do something with the error
  // E.g. log to an error logging client here
  console.log('Error occurred')
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)
  
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  )
}