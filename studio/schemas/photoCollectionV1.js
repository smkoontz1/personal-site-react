export default {
  title: 'Photo Collection',
  name: 'photoCollectionV1',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
		},
		{
			name: 'year',
			title: 'Year',
			type: 'number'
		},
		{
			name: 'description',
			title: 'Description',
			type: 'string'
		},
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image'
        }
      ]
    }
  ]
}