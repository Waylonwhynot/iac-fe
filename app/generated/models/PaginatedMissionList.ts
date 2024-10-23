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
import type { Mission } from './Mission';
import {
    MissionFromJSON,
    MissionFromJSONTyped,
    MissionToJSON,
} from './Mission';

/**
 * 
 * @export
 * @interface PaginatedMissionList
 */
export interface PaginatedMissionList {
    /**
     * 
     * @type {number}
     * @memberof PaginatedMissionList
     */
    count?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedMissionList
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedMissionList
     */
    size?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedMissionList
     */
    numPages?: number;
    /**
     * 
     * @type {Array<Mission>}
     * @memberof PaginatedMissionList
     */
    results?: Array<Mission>;
}

/**
 * Check if a given object implements the PaginatedMissionList interface.
 */
export function instanceOfPaginatedMissionList(value: object): value is PaginatedMissionList {
    return true;
}

export function PaginatedMissionListFromJSON(json: any): PaginatedMissionList {
    return PaginatedMissionListFromJSONTyped(json, false);
}

export function PaginatedMissionListFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedMissionList {
    if (json == null) {
        return json;
    }
    return {
        
        'count': json['count'] == null ? undefined : json['count'],
        'page': json['page'] == null ? undefined : json['page'],
        'size': json['size'] == null ? undefined : json['size'],
        'numPages': json['num_pages'] == null ? undefined : json['num_pages'],
        'results': json['results'] == null ? undefined : ((json['results'] as Array<any>).map(MissionFromJSON)),
    };
}

export function PaginatedMissionListToJSON(value?: PaginatedMissionList | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'count': value['count'],
        'page': value['page'],
        'size': value['size'],
        'num_pages': value['numPages'],
        'results': value['results'] == null ? undefined : ((value['results'] as Array<any>).map(MissionToJSON)),
    };
}

