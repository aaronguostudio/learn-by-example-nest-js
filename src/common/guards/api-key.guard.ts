import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Request } from 'express';
// import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { ApiKeysService } from 'src/iam/authentication/api-keys.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiKey } from 'src/user/api-keys/entities/api-key.entity';
import { Repository } from 'typeorm';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly apiKeysService: ApiKeysService,
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>,
  ) {
    //
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    // if (isPublic) return true;

    // return true;

    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = this.extractKeyFromHeader(request);

    if (!apiKey) {
      throw new UnauthorizedException();
    }

    const apiKeyEntityId = this.apiKeysService.extractIdFromApiKey(apiKey);

    try {
      const apiKeyEntity = await this.apiKeyRepository.findOne({
        where: { id: apiKeyEntityId },
        relations: { user: true },
      });

      await this.apiKeysService.validate(apiKey, apiKeyEntity.key);
      request[REQUEST_USER_KEY] = {
        sub: apiKeyEntity.user.id,
        email: apiKeyEntity.user.email,
        role: apiKeyEntity.user.role,
        permissions: apiKeyEntity.user.permissions,
      };
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractKeyFromHeader(request: Request): string | undefined {
    // access token is using the same header
    const [type, key] = request.headers.authorization?.split(' ') ?? [];
    return type === 'ApiKey' ? key : undefined;
  }
}