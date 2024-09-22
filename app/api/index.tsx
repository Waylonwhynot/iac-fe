import { AuthApi, Configuration, RepositoryApi, TaskApi } from '~/generated';
const configuration = new Configuration({ basePath: "" })
export const repositoryApi = new RepositoryApi(configuration)
export const taskApi = new TaskApi(configuration)
export const authApi = new AuthApi(configuration)