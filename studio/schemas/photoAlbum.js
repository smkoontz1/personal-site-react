export default {
  title: 'Photo Album',
  name: 'photoAlbum',
  type: 'document',
  fields: [
    {
      name: 'albumTitle',
      title: 'Album Title',
      type: 'string',
    },
    {
      name: 'imageCollection',
      title: 'Image Collection',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }
  ]
}