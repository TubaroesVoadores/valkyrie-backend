import * as dynamoose from './dynamoose';
import { imagesSchema } from '../schemas';

const imageData = {
  createdAt: '2022-05-26T00:51:56Z',
  data: {
    area: 3,
    lat: 38.98769411111111,
    log: -107.88787850000001,
    nativeForest: 0.3686286458333333,
  },
  filteredImageLink: 'https://bucket.s3.amazonaws.com/image_resized_filtered.jpg',
  id: '111e2711-d708-4cec-a3d7-8e6c14d6ac6b',
  projectId: 'a8c4f47e-758a-49c0-9ad9-d438e3bad42e',
  s3link: 'https://bucket.s3.amazonaws.com/image.jpg',
  updatedAt: '2022-05-26T00:51:56Z',
};


const images = {
  '111e2711-d708-4cec-a3d7-8e6c14d6ac6b': {
    id: '111e2711-d708-4cec-a3d7-8e6c14d6ac6b',
    ...imageData,
  },
  '3a364710-3d2a-45d1-9ce2-96203129c7a2': {
    id: '3a364710-3d2a-45d1-9ce2-96203129c7a2',
    ...imageData,
  },
};

export class Images extends dynamoose.Model {
  static schemas = [{ schemaObject: imagesSchema }];

  static async get(id) {
    if (images[id]) return new Images(image[id]);
    return null;
  }

  static async update({ id, ...rest }, attrs = {}) {
    const image = images[id];

    if (image) return { ...image, ...rest, ...attrs };
    return null;
  }

  static async create(props) {
    props.id = '6dfd8b63-8c22-4da8-9eab-d57c31b660ad';
    props.createdAt = '2022-05-26T00:51:56Z';

    return new Images(props);
  }

  static exec() {
    return Object.values(images);
  }
}
