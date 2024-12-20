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
  Mission,
  MissionCreation,
  MissionDetail,
  PaginatedMissionList,
} from '../models/index';
import {
    MissionFromJSON,
    MissionToJSON,
    MissionCreationFromJSON,
    MissionCreationToJSON,
    MissionDetailFromJSON,
    MissionDetailToJSON,
    PaginatedMissionListFromJSON,
    PaginatedMissionListToJSON,
} from '../models/index';

export interface CopyMissionRequest {
    id: number;
}

export interface CreateMissionRequest {
    missionCreation: MissionCreation;
}

export interface GetMissionRequest {
    id: number;
}

export interface ListMissionsRequest {
    page?: number;
    size?: number;
}

/**
 * 
 */
export class MissionApi extends runtime.BaseAPI {

    /**
     */
    async copyMissionRaw(requestParameters: CopyMissionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Mission>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling copyMission().'
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
            path: `/api/iac/mission/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MissionFromJSON(jsonValue));
    }

    /**
     */
    async copyMission(requestParameters: CopyMissionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Mission> {
        const response = await this.copyMissionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async createMissionRaw(requestParameters: CreateMissionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Mission>> {
        if (requestParameters['missionCreation'] == null) {
            throw new runtime.RequiredError(
                'missionCreation',
                'Required parameter "missionCreation" was null or undefined when calling createMission().'
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
            path: `/api/iac/mission/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MissionCreationToJSON(requestParameters['missionCreation']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MissionFromJSON(jsonValue));
    }

    /**
     */
    async createMission(requestParameters: CreateMissionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Mission> {
        const response = await this.createMissionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getMissionRaw(requestParameters: GetMissionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MissionDetail>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getMission().'
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
            path: `/api/iac/mission/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MissionDetailFromJSON(jsonValue));
    }

    /**
     */
    async getMission(requestParameters: GetMissionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MissionDetail> {
        const response = await this.getMissionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async listMissionsRaw(requestParameters: ListMissionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedMissionList>> {
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
            path: `/api/iac/mission/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedMissionListFromJSON(jsonValue));
    }

    /**
     */
    async listMissions(requestParameters: ListMissionsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedMissionList> {
        const response = await this.listMissionsRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
