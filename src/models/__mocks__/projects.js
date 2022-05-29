import * as dynamoose from './dynamoose';
import { projectsSchema } from '../schemas';

const proejctData = {
  area: 9,
  city: 'Belem',
  country: 'Brasil',
  createdAt: '2022-05-27T19:05:54Z',
  email: 'pedroaluz137@gmail.com',
  name: 'ARGO',
  nativeForestArea: 8.517337499999998,
  nativeForestAreaPercent: 0.9463708333333332,
  state: 'PA',
  status: 'APROVADO',
  updatedAt: '2022-05-27T19:05:54Z',
  userId: 'us-east-1:58d4c81e-089f-4c46-9662-de70ce93af3b',
};

const projects = {
  '3ea14f4b-934d-4258-91c9-fc8deb81e99a': {
    id: '3ea14f4b-934d-4258-91c9-fc8deb81e99a',
    ...proejctData,
  },
  '01351290-28b0-4bfc-b107-7bdbffa628f8': {
    id: '01351290-28b0-4bfc-b107-7bdbffa628f8',
    ...proejctData,
  },
};

export class Projects extends dynamoose.Model {
  static schemas = [{ schemaObject: projectsSchema }];

  static async get(id) {
    if (projects[id]) return new Projects(projects[id]);
    return null;
  }

  static async update({ id, ...rest }, attrs = {}) {
    const project = projects[id];

    if (project) return { ...project, ...rest, ...attrs };
    return null;
  }

  static async create(props) {
    props.id = '6dfd8b63-8c22-4da8-9eab-d57c31b660ad';
    props.createdAt = '2021-03-23T17:11:48.543-03:00';

    return new Projects(props);
  }

  static exec() {
    return Object.values(projects);
  }
}
