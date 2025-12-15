import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
@Injectable()
export class SubscriptionService {
  private pubSub: PubSub;

  constructor() {
    this.pubSub = new PubSub();
  }

  async publish(triggerName: string, payload: any) {
    console.log("i m at publish,")
    console.log({triggerName, payload});
    
    try {
      console.log(await this.pubSub.publish('postcreated', { postcreated: { message: 'hello world' } }));
      
    } catch (error) {
      console.log({error});
      
      
    }
    return await this.pubSub.publish('postcreated',{ postcreated: { message: 'hello world' } } );
  }

  async asyncIterator<T>(triggers: string | string[]): Promise<AsyncIterator<T>> {
    return await this.pubSub.asyncIterableIterator<T>(triggers);
  }
}