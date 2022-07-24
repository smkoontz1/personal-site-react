import SanityClient from '@sanity/client'

export default SanityClient({
  apiVersion: '2022-07-23',
  projectId: 'vc99qy1q',
  dataset: 'production',
  useCdn: true
})