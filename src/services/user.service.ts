import { prisma } from '../prisma'
import { RegisterDto } from '../dtos/user/request/register.dto'
import { TokenDto } from '../dtos/auths/response/token.dto'
import { BadRequest } from 'http-errors'
import { hashSync } from 'bcryptjs'
import { AuthService } from './auth.service'

export class UserService {
  static async registerUser(data: RegisterDto): Promise<TokenDto> {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      rejectOnNotFound: false,
    })

    if (user) {
      throw new BadRequest(`The user with email ${data.email} already exists`)
    }

    const password = hashSync(data.password, 10)

    const userCreated = await prisma.user.create({
      data: { ...data, password },
    })

    const auth = await prisma.token.create({
      data: {
        userId: userCreated.id,
      },
    })
    return AuthService.generateAccessToken(auth.jti)
  }
}
