import { AssetsConfig } from '@ioc:Adonis/Core/Static'

const staticConfig: AssetsConfig = {
  enabled: true,
  dotFiles: 'allow',
  etag: true,
  lastModified: true,
}

export default staticConfig
