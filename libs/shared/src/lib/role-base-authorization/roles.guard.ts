import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RoleBaseGuardsGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log(requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    console.log(request.headers);
    const authHeader = request.headers['authorization'];

    console.log(authHeader);

    if (!authHeader) {
      throw new UnauthorizedException('JWT token missing!');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('JWT token missing!');
    }

    let decoded: any;
    try {
      decoded = this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid JWT token');
    }
    request.user = decoded;
    const hasRole = requiredRoles.some((role) => decoded.role === role);
    if (!hasRole) {
      throw new UnauthorizedException("You don't have access to this route");
    }

    return true;
  }
}
