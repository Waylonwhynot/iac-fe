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
  PaginatedTemplateList,
  Template,
  TemplateCreation,
  TemplateMutation,
} from '../models/index';
import {
    PaginatedTemplateListFromJSON,
    PaginatedTemplateListToJSON,
    TemplateFromJSON,
    TemplateToJSON,
    TemplateCreationFromJSON,
    TemplateCreationToJSON,
    TemplateMutationFromJSON,
    TemplateMutationToJSON,
} from '../models/index';

export interface CreateTemplateRequest {
    templateCreation: TemplateCreation;
}

export interface DeleteTemplateRequest {
    id: number;
}

export interface GetTemplateRequest {
    id: number;
}

export interface ListTemplatesRequest {
    kw?: string;
    page?: number;
    size?: number;
}

export interface UpdateTemplateRequest {
    id: number;
    templateMutation?: TemplateMutation;
}

/**
 * 
 */
export class TemplateApi extends runtime.BaseAPI {

    /**
     */
    async createTemplateRaw(requestParameters: CreateTemplateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Template>> {
        if (requestParameters['templateCreation'] == null) {
            throw new runtime.RequiredError(
                'templateCreation',
                'Required parameter "templateCreation" was null or undefined when calling createTemplate().'
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
            path: `/api/iac/template/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TemplateCreationToJSON(requestParameters['templateCreation']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TemplateFromJSON(jsonValue));
    }

    /**
     */
    async createTemplate(requestParameters: CreateTemplateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Template> {
        const response = await this.createTemplateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async deleteTemplateRaw(requestParameters: DeleteTemplateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling deleteTemplate().'
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
            path: `/api/iac/template/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async deleteTemplate(requestParameters: DeleteTemplateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteTemplateRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getTemplateRaw(requestParameters: GetTemplateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Template>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getTemplate().'
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
            path: `/api/iac/template/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TemplateFromJSON(jsonValue));
    }

    /**
     */
    async getTemplate(requestParameters: GetTemplateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Template> {
        const response = await this.getTemplateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async listTemplatesRaw(requestParameters: ListTemplatesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedTemplateList>> {
        const queryParameters: any = {};

        if (requestParameters['kw'] != null) {
            queryParameters['kw'] = requestParameters['kw'];
        }

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
            path: `/api/iac/template/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedTemplateListFromJSON(jsonValue));
    }

    /**
     */
    async listTemplates(requestParameters: ListTemplatesRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedTemplateList> {
        const response = await this.listTemplatesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async updateTemplateRaw(requestParameters: UpdateTemplateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Template>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling updateTemplate().'
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
            path: `/api/iac/template/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: TemplateMutationToJSON(requestParameters['templateMutation']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TemplateFromJSON(jsonValue));
    }

    /**
     */
    async updateTemplate(requestParameters: UpdateTemplateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Template> {
        const response = await this.updateTemplateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}