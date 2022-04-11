declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email: string
        type: 'user' | 'admin'
      }
    }
  }
}
export {}
