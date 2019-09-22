import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class TodoMongo extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'object',
  })
  body?: object;

  @property({
    type: 'boolean',
    default: false,
  })
  isDone?: boolean;


  constructor(data?: Partial<TodoMongo>) {
    super(data);
  }
}

export interface TodoMongoRelations {
  // describe navigational properties here
}

export type TodoMongoWithRelations = TodoMongo & TodoMongoRelations;
