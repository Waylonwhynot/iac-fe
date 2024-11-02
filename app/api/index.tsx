import { AuthApi, Configuration, RepositoryApi, MissionApi, TemplateApi, ScheduleApi } from '~/generated';
import { auth } from './middlewares';

const configuration = new Configuration({ basePath: '' });
export const repositoryApi = new RepositoryApi(configuration).withMiddleware(auth);
export const missionApi = new MissionApi(configuration).withMiddleware(auth);
export const authApi = new AuthApi(configuration);
export const templateApi = new TemplateApi(configuration).withMiddleware(auth);
export const scheduleApi = new ScheduleApi(configuration).withMiddleware(auth);