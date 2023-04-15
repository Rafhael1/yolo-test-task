import { Module, NestModule } from '@nestjs/common';
import { CustomersModule } from './modules/customers/customers.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customers } from './modules/customers/entities/customers.entity';
import { GamesModule } from './modules/games/games.module';
import { PaginationMiddleware } from './middlewares/pagination.middleware';
import { GameCategoriesModule } from './modules/game-categories/game-categories.module';
import { GameCategories } from './modules/game-categories/entities/game-category.entity';
import { Games } from './modules/games/entities/game.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './yolotest.db',
      autoLoadModels: true,
      synchronize: true,
      sync: { force: true },
      models: [Customers, Games, GameCategories]
    }),  
    CustomersModule, GamesModule, GameCategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: any) {
    consumer.apply(PaginationMiddleware).forRoutes({ path: '(*)', method: 'GET'});
  }
}
