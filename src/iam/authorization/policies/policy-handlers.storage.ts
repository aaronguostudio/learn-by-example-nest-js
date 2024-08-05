import { Injectable, Type } from '@nestjs/common';
import { Policy } from './interfaces/policy.interface';
import { PolicyHandler } from './interfaces/policy-handler.interface';

@Injectable()
export class PolicyHandlerStorage {
  private readonly collection = new Map<Type<Policy>, PolicyHandler<any>>();

  add<T extends Policy>(policyCls: Type<T>, handler: PolicyHandler<T>) {
    console.log('> this.collection', this.collection);
    this.collection.set(policyCls, handler);
  }

  get<T extends Policy>(policyCls: Type<T>): PolicyHandler<T> | undefined {
    console.log('> this.collection', this.collection);
    const handler = this.collection.get(policyCls);
    console.log('> handler', handler);

    if (!handler) {
      throw new Error(
        `"${policyCls.name}" does not have the associated handler.`,
      );
    }

    return handler;
  }
}
