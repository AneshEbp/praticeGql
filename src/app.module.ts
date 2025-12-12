import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
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
      installSubscriptionHandlers: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
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
