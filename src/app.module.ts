import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { graphqlUploadExpress } from 'graphql-upload-ts';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        connectionFactory: (connection) => {
          console.log('connectde to DB');
          return connection;
        },
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // uploads:false,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      // subscriptions: {
      //   'graphql-ws': {
      //     path: '/graphql',
      //     onConnect: (ctx) => {
      //       console.log('Subscription client connected', ctx.connectionParams);
      //       return true; // allow all connections
      //     },
      //     onDisconnect: (ctx, code, reason) => {
      //       console.log('Subscription client disconnected', code, reason);
      //     },
      //   },
      // },
      subscriptions:{
        'graphql-ws':true,
        'subscriptions-transport-ws':true
      }
    }),
    UserModule,
    AuthModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        graphqlUploadExpress({ maxFileSize: 10 * 1024 * 1024, maxFiles: 5 }),
      )
      .forRoutes('graphql');
  }
}
