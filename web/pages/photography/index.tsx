import { ReactElement } from 'react'
import MainLayout from '../../components/common/MainLayout'
import { NextPageWithLayout } from '../_app'

interface Props {
  albumPreviews: any
}

export const Photography: NextPageWithLayout<Props> = ({ albumPreviews }) => {

  return (
    <h1>Photography</h1>
  )
}

Photography.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Photography