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
import type { Release } from './Release';
import {
    ReleaseFromJSON,
    ReleaseFromJSONTyped,
    ReleaseToJSON,
} from './Release';

/**
 * 
 * @export
 * @interface PaginatedReleaseList
 */
export interface PaginatedReleaseList {
    /**
     * 
     * @type {number}
     * @memberof PaginatedReleaseList
     */
    count?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedReleaseList
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedReleaseList
     */
    size?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedReleaseList
     */
    numPages?: number;
    /**
     * 
     * @type {Array<Release>}
     * @memberof PaginatedReleaseList
     */
    results?: Array<Release>;
}

/**
 * Check if a given object implements the PaginatedReleaseList interface.
 */
export function instanceOfPaginatedReleaseList(value: object): value is PaginatedReleaseList {
    return true;
}

export function PaginatedReleaseListFromJSON(json: any): PaginatedReleaseList {
    return PaginatedReleaseListFromJSONTyped(json, false);
}

export function PaginatedReleaseListFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedReleaseList {
    if (json == null) {
        return json;
    }
    return {
        
        'count': json['count'] == null ? undefined : json['count'],
        'page': json['page'] == null ? undefined : json['page'],
        'size': json['size'] == null ? undefined : json['size'],
        'numPages': json['num_pages'] == null ? undefined : json['num_pages'],
        'results': json['results'] == null ? undefined : ((json['results'] as Array<any>).map(ReleaseFromJSON)),
    };
}

export function PaginatedReleaseListToJSON(value?: PaginatedReleaseList | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'count': value['count'],
        'page': value['page'],
        'size': value['size'],
        'num_pages': value['numPages'],
        'results': value['results'] == null ? undefined : ((value['results'] as Array<any>).map(ReleaseToJSON)),
    };
}
