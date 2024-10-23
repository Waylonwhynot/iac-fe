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
import type { Crontab } from './Crontab';
import {
    CrontabFromJSON,
    CrontabFromJSONTyped,
    CrontabToJSON,
} from './Crontab';
import type { Interval } from './Interval';
import {
    IntervalFromJSON,
    IntervalFromJSONTyped,
    IntervalToJSON,
} from './Interval';

/**
 * 
 * @export
 * @interface PeriodicMissionMutation
 */
export interface PeriodicMissionMutation {
    /**
     * 
     * @type {Interval}
     * @memberof PeriodicMissionMutation
     */
    interval?: Interval;
    /**
     * 
     * @type {Crontab}
     * @memberof PeriodicMissionMutation
     */
    crontab?: Crontab;
    /**
     * 
     * @type {number}
     * @memberof PeriodicMissionMutation
     */
    release?: number;
    /**
     * 
     * @type {string}
     * @memberof PeriodicMissionMutation
     */
    playbook?: string;
    /**
     * 
     * @type {string}
     * @memberof PeriodicMissionMutation
     */
    role?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PeriodicMissionMutation
     */
    tags?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PeriodicMissionMutation
     */
    inventories?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PeriodicMissionMutation
     */
    envvars?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PeriodicMissionMutation
     */
    extravars?: string | null;
    /**
     * 
     * @type {number}
     * @memberof PeriodicMissionMutation
     */
    forks?: number;
    /**
     * 
     * @type {number}
     * @memberof PeriodicMissionMutation
     */
    timeout?: number;
    /**
     * 
     * @type {string}
     * @memberof PeriodicMissionMutation
     */
    name?: string;
    /**
     * 
     * @type {boolean}
     * @memberof PeriodicMissionMutation
     */
    enabled?: boolean;
    /**
     * 
     * @type {number}
     * @memberof PeriodicMissionMutation
     */
    beat?: number | null;
}

/**
 * Check if a given object implements the PeriodicMissionMutation interface.
 */
export function instanceOfPeriodicMissionMutation(value: object): value is PeriodicMissionMutation {
    return true;
}

export function PeriodicMissionMutationFromJSON(json: any): PeriodicMissionMutation {
    return PeriodicMissionMutationFromJSONTyped(json, false);
}

export function PeriodicMissionMutationFromJSONTyped(json: any, ignoreDiscriminator: boolean): PeriodicMissionMutation {
    if (json == null) {
        return json;
    }
    return {
        
        'interval': json['interval'] == null ? undefined : IntervalFromJSON(json['interval']),
        'crontab': json['crontab'] == null ? undefined : CrontabFromJSON(json['crontab']),
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
        'enabled': json['enabled'] == null ? undefined : json['enabled'],
        'beat': json['beat'] == null ? undefined : json['beat'],
    };
}

export function PeriodicMissionMutationToJSON(value?: PeriodicMissionMutation | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'interval': IntervalToJSON(value['interval']),
        'crontab': CrontabToJSON(value['crontab']),
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
        'enabled': value['enabled'],
        'beat': value['beat'],
    };
}
