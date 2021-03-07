declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string
      JWT_SECRET: string
      API_SECRET: string
      CLOUDINARY_CLOUD_NAME: string
      CLOUDINARY_API_KEY: string
      CLOUDINARY_API_SECRET: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
