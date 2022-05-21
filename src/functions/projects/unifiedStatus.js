import {
} from '../../utils';
import { Projects, Images } from '../../models';

const nativeForestCalculator = (images) => {
  let nativeForestArea = 0;
  console.log(images);

  images.forEach(({ data }) => {
    console.log(data.nativeForest * data.area, nativeForestArea);

    nativeForestArea += data.nativeForest * data.area;
  });

  console.log(nativeForestArea);

  return nativeForestArea;
};

const defineProjectStatus = (nativeForestArea, projectZone) => {
  const nativeForestZonePorcent = nativeForestArea / projectZone;

  if (nativeForestZonePorcent >= 0.25) {
    console.log('Project is approved');
    return 'APROVADO';
  }

  return 'REPROVADO';
};

/**
 * @name UnifiedStatus
 * @description This lambda is responsible for creating a unfied status for a project.
 * @param {Object} event - Base event object of AWS Lambda.
 * @param {Object} event.projectId - Project's id.
 * @command sls invoke local -f UnifiedStatus -p tests/mocks/Projects/unifiedStatus.json -s STAGE
 */

export const main = async (event) => {
  try {
    const { projectId } = typeof event === 'string' ? JSON.parse(event) : event;

    const images = (
      await Images
        .query('projectId')
        .eq(projectId)
        .where('deletedAt')
        .not()
        .exists()
        .exec()
    ).toJSON();

    const [project] = (
      await Projects
        .query('id')
        .eq(projectId)
        .where('deletedAt')
        .not()
        .exists()
        .exec()
    ).toJSON();

    const imagesFinished = images.filter(({ filteredImageLink }) => (filteredImageLink));

    if (!imagesFinished.length) {
      console.log('There are unfinished images');
      return 'There are unfinished images';
    }

    const nativeForestArea = nativeForestCalculator(images);
    const status = defineProjectStatus(nativeForestArea, project.area);

    console.log('Project\'s infos to update', { nativeForestArea, status });

    await Projects.update({
      status,
      id: projectId,
      nativeForestArea,
    });

    return `finished unified status ${status}`;
  } catch (error) {
    console.error('Error', { error });
    throw error;
  }
};
