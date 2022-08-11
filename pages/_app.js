import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Fragment } from 'react'


const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Fragment>
  )
}

export default MyApp
