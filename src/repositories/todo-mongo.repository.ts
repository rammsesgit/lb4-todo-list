import {DefaultCrudRepository} from '@loopback/repository';
import {TodoMongo, TodoMongoRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TodoMongoRepository extends DefaultCrudRepository<
  TodoMongo,
  typeof TodoMongo.prototype.id,
  TodoMongoRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(TodoMongo, dataSource);
  }
}
