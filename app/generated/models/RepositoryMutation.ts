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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface RepositoryMutation
 */
export interface RepositoryMutation {
    /**
     * 
     * @type {string}
     * @memberof RepositoryMutation
     */
    token?: string;
    /**
     * 
     * @type {string}
     * @memberof RepositoryMutation
     */
    url?: string;
    /**
     * 
     * @type {string}
     * @memberof RepositoryMutation
     */
    providerClass?: string;
}

/**
 * Check if a given object implements the RepositoryMutation interface.
 */
export function instanceOfRepositoryMutation(value: object): value is RepositoryMutation {
    return true;
}

export function RepositoryMutationFromJSON(json: any): RepositoryMutation {
    return RepositoryMutationFromJSONTyped(json, false);
}

export function RepositoryMutationFromJSONTyped(json: any, ignoreDiscriminator: boolean): RepositoryMutation {
    if (json == null) {
        return json;
    }
    return {
        
        'token': json['token'] == null ? undefined : json['token'],
        'url': json['url'] == null ? undefined : json['url'],
        'providerClass': json['provider_class'] == null ? undefined : json['provider_class'],
    };
}

export function RepositoryMutationToJSON(value?: RepositoryMutation | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'token': value['token'],
        'url': value['url'],
        'provider_class': value['providerClass'],
    };
}

