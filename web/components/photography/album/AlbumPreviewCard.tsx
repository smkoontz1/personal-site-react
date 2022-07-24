import PreviewCard from "../../common/PreviewCard"
import SanityClient from "../../../sanityClient"
import imageUrlBuilder from '@sanity/image-url'

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
    <PreviewCard>
      <>
        {/* <p className='
        text-white
        absolute
        '>
          {title}
        </p> */}
        <div className='relative'>
          <img src={coverImgUrl} />
          <div className='
            absolute
            top-0
            bottom-0
            left-0
            right-0
            flex
            flex-row
            justify-center
            items-center'
            >
            <p className='
              text-center
              text-white
              text-3xl
              tracking-wide
              w-full
              bg-black/75
              p-3'
            >
              {title.toUpperCase()}
            </p>
          </div>
        </div>
      </>
    </PreviewCard>
  )
}