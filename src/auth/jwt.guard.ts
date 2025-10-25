import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest()
    const authHeader = req.headers['authorization']
    if (!authHeader) return false

    const token = authHeader.split(' ')[1]
    try {
      const payload = this.jwt.verify(token)
      req.user = { userId: payload.sub }
      return true
    } catch {
      return false
    }
  }
}
