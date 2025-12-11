import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';


@Injectable()
export class SubscriptionService {
  private pubsub: PubSub;

  constructor() {
    this.pubsub = new PubSub();
  }

  registerSubscriptions(subName: string) {
    return this.pubsub.asyncIterableIterator(subName);
  }

  publishSubscriptons(subName: string, payload: Record<string, any>) {
    return this.pubsub.publish(subName, payload);
  }
}
