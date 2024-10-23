import { AuthApi, Configuration, RepositoryApi, MissionApi, TemplateApi, ScheduleApi } from '~/generated';
const configuration = new Configuration({ basePath: "" })
export const repositoryApi = new RepositoryApi(configuration)
export const missionApi = new MissionApi(configuration)
export const authApi = new AuthApi(configuration)
export const templateApi = new TemplateApi(configuration)
export const scheduleApi = new ScheduleApi(configuration)