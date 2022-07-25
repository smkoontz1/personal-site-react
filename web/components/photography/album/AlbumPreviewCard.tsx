import PreviewCard from '../../common/PreviewCard'
import Link from 'next/link'
import styles from '../../../styles/photo/album/Album.module.scss'

interface Props {
  title: string,
  slug: string,
  coverImgUrl: string,
}

export default function AlbumPreviewCard(props: Props) {
  const {
    title,
    slug,
    coverImgUrl
  } = props

  return (
    <div className={styles.albumPreviewCard}>
      <PreviewCard>
        <>
          <div className='relative'>
            <Link href='photo/album/[slug]' as={`photo/album/${slug}`}>
              <a>
                <img loading='lazy' src={coverImgUrl} />
                <div className={styles.albumPreviewTitleContainer}>
                  <p className={styles.albumPreviewTitle}>
                    {title.toUpperCase()}
                  </p>
                </div>
              </a>
            </Link>
          </div>
        </>
      </PreviewCard>
    </div>
  )
}