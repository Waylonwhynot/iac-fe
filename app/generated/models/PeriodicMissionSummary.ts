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
 * @interface PeriodicMissionSummary
 */
export interface PeriodicMissionSummary {
    /**
     * 
     * @type {number}
     * @memberof PeriodicMissionSummary
     */
    readonly id: number;
    /**
     * 
     * @type {string}
     * @memberof PeriodicMissionSummary
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof PeriodicMissionSummary
     */
    readonly crontab: string;
    /**
     * 
     * @type {string}
     * @memberof PeriodicMissionSummary
     */
    readonly interval: string;
}

/**
 * Check if a given object implements the PeriodicMissionSummary interface.
 */
export function instanceOfPeriodicMissionSummary(value: object): value is PeriodicMissionSummary {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('crontab' in value) || value['crontab'] === undefined) return false;
    if (!('interval' in value) || value['interval'] === undefined) return false;
    return true;
}

export function PeriodicMissionSummaryFromJSON(json: any): PeriodicMissionSummary {
    return PeriodicMissionSummaryFromJSONTyped(json, false);
}

export function PeriodicMissionSummaryFromJSONTyped(json: any, ignoreDiscriminator: boolean): PeriodicMissionSummary {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'crontab': json['crontab'],
        'interval': json['interval'],
    };
}

export function PeriodicMissionSummaryToJSON(value?: Omit<PeriodicMissionSummary, 'id'|'crontab'|'interval'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'name': value['name'],
    };
}

