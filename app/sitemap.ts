import { MetadataRoute } from 'next'
import { getAllComponentsMetadata } from '@/lib/mdx'

export default function sitemap(): MetadataRoute.Sitemap {
  const components = getAllComponentsMetadata()
  const baseUrl = 'https://uicomponenthub.dev'

  const componentUrls = components.map((comp) => ({
    url: `${baseUrl}/components/${comp.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/components`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...componentUrls,
  ]
}
