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
 * @interface TemplateMutation
 */
export interface TemplateMutation {
    /**
     * 
     * @type {number}
     * @memberof TemplateMutation
     */
    release?: number;
    /**
     * 
     * @type {string}
     * @memberof TemplateMutation
     */
    playbook?: string;
    /**
     * 
     * @type {string}
     * @memberof TemplateMutation
     */
    role?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TemplateMutation
     */
    tags?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TemplateMutation
     */
    inventories?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TemplateMutation
     */
    envvars?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TemplateMutation
     */
    extravars?: string | null;
    /**
     * 
     * @type {number}
     * @memberof TemplateMutation
     */
    forks?: number;
    /**
     * 
     * @type {number}
     * @memberof TemplateMutation
     */
    timeout?: number;
    /**
     * 
     * @type {string}
     * @memberof TemplateMutation
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof TemplateMutation
     */
    description?: string | null;
}

/**
 * Check if a given object implements the TemplateMutation interface.
 */
export function instanceOfTemplateMutation(value: object): value is TemplateMutation {
    return true;
}

export function TemplateMutationFromJSON(json: any): TemplateMutation {
    return TemplateMutationFromJSONTyped(json, false);
}

export function TemplateMutationFromJSONTyped(json: any, ignoreDiscriminator: boolean): TemplateMutation {
    if (json == null) {
        return json;
    }
    return {
        
        'release': json['release'] == null ? undefined : json['release'],
        'playbook': json['playbook'] == null ? undefined : json['playbook'],
        'role': json['role'] == null ? undefined : json['role'],
        'tags': json['tags'] == null ? undefined : json['tags'],
        'inventories': json['inventories'] == null ? undefined : json['inventories'],
        'envvars': json['envvars'] == null ? undefined : json['envvars'],
        'extravars': json['extravars'] == null ? undefined : json['extravars'],
        'forks': json['forks'] == null ? undefined : json['forks'],
        'timeout': json['timeout'] == null ? undefined : json['timeout'],
        'name': json['name'] == null ? undefined : json['name'],
        'description': json['description'] == null ? undefined : json['description'],
    };
}

export function TemplateMutationToJSON(value?: TemplateMutation | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'release': value['release'],
        'playbook': value['playbook'],
        'role': value['role'],
        'tags': value['tags'],
        'inventories': value['inventories'],
        'envvars': value['envvars'],
        'extravars': value['extravars'],
        'forks': value['forks'],
        'timeout': value['timeout'],
        'name': value['name'],
        'description': value['description'],
    };
}
