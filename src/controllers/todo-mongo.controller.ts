import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {TodoMongo} from '../models';
import {TodoMongoRepository} from '../repositories';

export class TodoMongoController {
  constructor(
    @repository(TodoMongoRepository)
    public todoMongoRepository : TodoMongoRepository,
  ) {}

  @post('/todo-mongos', {
    responses: {
      '200': {
        description: 'TodoMongo model instance',
        content: {'application/json': {schema: getModelSchemaRef(TodoMongo)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodoMongo, {
            title: 'NewTodoMongo',
            exclude: ['id'],
          }),
        },
      },
    })
    todoMongo: Omit<TodoMongo, 'id'>,
  ): Promise<TodoMongo> {
    return this.todoMongoRepository.create(todoMongo);
  }

  @get('/todo-mongos/count', {
    responses: {
      '200': {
        description: 'TodoMongo model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TodoMongo)) where?: Where<TodoMongo>,
  ): Promise<Count> {
    return this.todoMongoRepository.count(where);
  }

  @get('/todo-mongos', {
    responses: {
      '200': {
        description: 'Array of TodoMongo model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TodoMongo)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TodoMongo)) filter?: Filter<TodoMongo>,
  ): Promise<TodoMongo[]> {
    return this.todoMongoRepository.find(filter);
  }

  @patch('/todo-mongos', {
    responses: {
      '200': {
        description: 'TodoMongo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodoMongo, {partial: true}),
        },
      },
    })
    todoMongo: TodoMongo,
    @param.query.object('where', getWhereSchemaFor(TodoMongo)) where?: Where<TodoMongo>,
  ): Promise<Count> {
    return this.todoMongoRepository.updateAll(todoMongo, where);
  }

  @get('/todo-mongos/{id}', {
    responses: {
      '200': {
        description: 'TodoMongo model instance',
        content: {'application/json': {schema: getModelSchemaRef(TodoMongo)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<TodoMongo> {
    return this.todoMongoRepository.findById(id);
  }

  @patch('/todo-mongos/{id}', {
    responses: {
      '204': {
        description: 'TodoMongo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodoMongo, {partial: true}),
        },
      },
    })
    todoMongo: TodoMongo,
  ): Promise<void> {
    await this.todoMongoRepository.updateById(id, todoMongo);
  }

  @put('/todo-mongos/{id}', {
    responses: {
      '204': {
        description: 'TodoMongo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() todoMongo: TodoMongo,
  ): Promise<void> {
    await this.todoMongoRepository.replaceById(id, todoMongo);
  }

  @del('/todo-mongos/{id}', {
    responses: {
      '204': {
        description: 'TodoMongo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: string): Promise<void> {
    await this.todoMongoRepository.deleteById(id);
  }
}
