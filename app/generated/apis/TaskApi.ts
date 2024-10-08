/* tslint:disable */
/* eslint-disable */
/**
 * CodeBox API
 * Code Box
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  PaginatedTaskList,
  Task,
  TaskCreation,
} from '../models/index';
import {
    PaginatedTaskListFromJSON,
    PaginatedTaskListToJSON,
    TaskFromJSON,
    TaskToJSON,
    TaskCreationFromJSON,
    TaskCreationToJSON,
} from '../models/index';

export interface CopyTaskRequest {
    id: number;
}

export interface CreateTaskRequest {
    taskCreation: TaskCreation;
}

export interface GetTaskRequest {
    id: number;
}

export interface ListTasksRequest {
    page?: number;
    size?: number;
}

/**
 * 
 */
export class TaskApi extends runtime.BaseAPI {

    /**
     */
    async copyTaskRaw(requestParameters: CopyTaskRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Task>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling copyTask().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerTokenAuthentication", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/iac/task/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TaskFromJSON(jsonValue));
    }

    /**
     */
    async copyTask(requestParameters: CopyTaskRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Task> {
        const response = await this.copyTaskRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async createTaskRaw(requestParameters: CreateTaskRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Task>> {
        if (requestParameters['taskCreation'] == null) {
            throw new runtime.RequiredError(
                'taskCreation',
                'Required parameter "taskCreation" was null or undefined when calling createTask().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerTokenAuthentication", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/iac/task/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TaskCreationToJSON(requestParameters['taskCreation']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TaskFromJSON(jsonValue));
    }

    /**
     */
    async createTask(requestParameters: CreateTaskRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Task> {
        const response = await this.createTaskRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getTaskRaw(requestParameters: GetTaskRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Task>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getTask().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerTokenAuthentication", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/iac/task/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TaskFromJSON(jsonValue));
    }

    /**
     */
    async getTask(requestParameters: GetTaskRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Task> {
        const response = await this.getTaskRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async listTasksRaw(requestParameters: ListTasksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedTaskList>> {
        const queryParameters: any = {};

        if (requestParameters['page'] != null) {
            queryParameters['page'] = requestParameters['page'];
        }

        if (requestParameters['size'] != null) {
            queryParameters['size'] = requestParameters['size'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerTokenAuthentication", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/iac/task/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedTaskListFromJSON(jsonValue));
    }

    /**
     */
    async listTasks(requestParameters: ListTasksRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedTaskList> {
        const response = await this.listTasksRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
