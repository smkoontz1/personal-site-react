import { useState } from 'react'
import { Photo, PhotoAlbum } from 'react-photo-album'
import Lightbox, { Slide } from 'yet-another-react-lightbox'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'

interface Props {
  photos: Photo[]
}

export default function PhotoGallery(props: Props) {
  const { photos } = props
  const [index, setIndex] = useState(-1)

  const lightboxSlides: Slide[] = photos?.map(({ src, width, height, images }) => {
    return {
      src,
      width,
      height,
      srcSet: images?.map((image) => ({
        src: image.src,
        width: image.width,
        height: image.height
      }))
    }
  })

  return (
    <>
      <PhotoAlbum
        layout='rows'
        photos={photos}
        onClick={({ index }) => setIndex(index)}
      />
      <Lightbox
        slides={lightboxSlides}
        open={index >= 0}
        index={index}
        close={() => { setIndex(-1) }}
        plugins={[Thumbnails]}
      />
    </>
  )
}