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
     * @type {Blob}
     * @memberof RepositoryMutation
     */
    store?: Blob;
    /**
     * 
     * @type {string}
     * @memberof RepositoryMutation
     */
    name?: string;
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
        
        'store': json['store'] == null ? undefined : json['store'],
        'name': json['name'] == null ? undefined : json['name'],
    };
}

export function RepositoryMutationToJSON(value?: RepositoryMutation | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'store': value['store'],
        'name': value['name'],
    };
}

