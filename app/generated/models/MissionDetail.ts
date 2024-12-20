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
import type { StateEnum } from './StateEnum';
import {
    StateEnumFromJSON,
    StateEnumFromJSONTyped,
    StateEnumToJSON,
} from './StateEnum';
import type { Stats } from './Stats';
import {
    StatsFromJSON,
    StatsFromJSONTyped,
    StatsToJSON,
} from './Stats';
import type { UserSummary } from './UserSummary';
import {
    UserSummaryFromJSON,
    UserSummaryFromJSONTyped,
    UserSummaryToJSON,
} from './UserSummary';
import type { PeriodicMissionSummary } from './PeriodicMissionSummary';
import {
    PeriodicMissionSummaryFromJSON,
    PeriodicMissionSummaryFromJSONTyped,
    PeriodicMissionSummaryToJSON,
} from './PeriodicMissionSummary';
import type { ReleaseSummary } from './ReleaseSummary';
import {
    ReleaseSummaryFromJSON,
    ReleaseSummaryFromJSONTyped,
    ReleaseSummaryToJSON,
} from './ReleaseSummary';

/**
 * 
 * @export
 * @interface MissionDetail
 */
export interface MissionDetail {
    /**
     * 
     * @type {number}
     * @memberof MissionDetail
     */
    readonly id: number;
    /**
     * 
     * @type {Date}
     * @memberof MissionDetail
     */
    readonly createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof MissionDetail
     */
    readonly updatedAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof MissionDetail
     */
    readonly deletedAt: Date;
    /**
     * 
     * @type {UserSummary}
     * @memberof MissionDetail
     */
    readonly createdBy: UserSummary;
    /**
     * 
     * @type {UserSummary}
     * @memberof MissionDetail
     */
    readonly updatedBy: UserSummary;
    /**
     * 
     * @type {UserSummary}
     * @memberof MissionDetail
     */
    readonly deletedBy: UserSummary;
    /**
     * 
     * @type {StateEnum}
     * @memberof MissionDetail
     */
    readonly state: StateEnum;
    /**
     * 
     * @type {string}
     * @memberof MissionDetail
     */
    readonly output: string;
    /**
     * 
     * @type {ReleaseSummary}
     * @memberof MissionDetail
     */
    readonly release: ReleaseSummary;
    /**
     * 
     * @type {PeriodicMissionSummary}
     * @memberof MissionDetail
     */
    readonly fromPeriodic: PeriodicMissionSummary;
    /**
     * 
     * @type {Array<Stats>}
     * @memberof MissionDetail
     */
    readonly statsSet: Array<Stats>;
    /**
     * 
     * @type {string}
     * @memberof MissionDetail
     */
    playbook?: string;
    /**
     * 
     * @type {string}
     * @memberof MissionDetail
     */
    role?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MissionDetail
     */
    tags?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MissionDetail
     */
    inventories?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MissionDetail
     */
    envvars?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MissionDetail
     */
    extravars?: string | null;
    /**
     * 
     * @type {number}
     * @memberof MissionDetail
     */
    forks?: number;
    /**
     * 
     * @type {number}
     * @memberof MissionDetail
     */
    timeout?: number;
}



/**
 * Check if a given object implements the MissionDetail interface.
 */
export function instanceOfMissionDetail(value: object): value is MissionDetail {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    if (!('deletedAt' in value) || value['deletedAt'] === undefined) return false;
    if (!('createdBy' in value) || value['createdBy'] === undefined) return false;
    if (!('updatedBy' in value) || value['updatedBy'] === undefined) return false;
    if (!('deletedBy' in value) || value['deletedBy'] === undefined) return false;
    if (!('state' in value) || value['state'] === undefined) return false;
    if (!('output' in value) || value['output'] === undefined) return false;
    if (!('release' in value) || value['release'] === undefined) return false;
    if (!('fromPeriodic' in value) || value['fromPeriodic'] === undefined) return false;
    if (!('statsSet' in value) || value['statsSet'] === undefined) return false;
    return true;
}

export function MissionDetailFromJSON(json: any): MissionDetail {
    return MissionDetailFromJSONTyped(json, false);
}

export function MissionDetailFromJSONTyped(json: any, ignoreDiscriminator: boolean): MissionDetail {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'createdAt': (new Date(json['created_at'])),
        'updatedAt': (new Date(json['updated_at'])),
        'deletedAt': (new Date(json['deleted_at'])),
        'createdBy': UserSummaryFromJSON(json['created_by']),
        'updatedBy': UserSummaryFromJSON(json['updated_by']),
        'deletedBy': UserSummaryFromJSON(json['deleted_by']),
        'state': StateEnumFromJSON(json['state']),
        'output': json['output'],
        'release': ReleaseSummaryFromJSON(json['release']),
        'fromPeriodic': PeriodicMissionSummaryFromJSON(json['from_periodic']),
        'statsSet': ((json['stats_set'] as Array<any>).map(StatsFromJSON)),
        'playbook': json['playbook'] == null ? undefined : json['playbook'],
        'role': json['role'] == null ? undefined : json['role'],
        'tags': json['tags'] == null ? undefined : json['tags'],
        'inventories': json['inventories'] == null ? undefined : json['inventories'],
        'envvars': json['envvars'] == null ? undefined : json['envvars'],
        'extravars': json['extravars'] == null ? undefined : json['extravars'],
        'forks': json['forks'] == null ? undefined : json['forks'],
        'timeout': json['timeout'] == null ? undefined : json['timeout'],
    };
}

export function MissionDetailToJSON(value?: Omit<MissionDetail, 'id'|'created_at'|'updated_at'|'deleted_at'|'created_by'|'updated_by'|'deleted_by'|'state'|'output'|'release'|'from_periodic'|'stats_set'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'playbook': value['playbook'],
        'role': value['role'],
        'tags': value['tags'],
        'inventories': value['inventories'],
        'envvars': value['envvars'],
        'extravars': value['extravars'],
        'forks': value['forks'],
        'timeout': value['timeout'],
    };
}

