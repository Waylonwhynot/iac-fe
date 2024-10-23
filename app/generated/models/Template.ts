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
import type { UserSummary } from './UserSummary';
import {
    UserSummaryFromJSON,
    UserSummaryFromJSONTyped,
    UserSummaryToJSON,
} from './UserSummary';
import type { ReleaseSummary } from './ReleaseSummary';
import {
    ReleaseSummaryFromJSON,
    ReleaseSummaryFromJSONTyped,
    ReleaseSummaryToJSON,
} from './ReleaseSummary';

/**
 * 
 * @export
 * @interface Template
 */
export interface Template {
    /**
     * 
     * @type {number}
     * @memberof Template
     */
    readonly id: number;
    /**
     * 
     * @type {Date}
     * @memberof Template
     */
    readonly createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof Template
     */
    readonly updatedAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof Template
     */
    readonly deletedAt: Date;
    /**
     * 
     * @type {UserSummary}
     * @memberof Template
     */
    readonly createdBy: UserSummary;
    /**
     * 
     * @type {UserSummary}
     * @memberof Template
     */
    readonly updatedBy: UserSummary;
    /**
     * 
     * @type {UserSummary}
     * @memberof Template
     */
    readonly deletedBy: UserSummary;
    /**
     * 
     * @type {ReleaseSummary}
     * @memberof Template
     */
    release: ReleaseSummary;
    /**
     * 
     * @type {string}
     * @memberof Template
     */
    playbook?: string;
    /**
     * 
     * @type {string}
     * @memberof Template
     */
    role?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Template
     */
    tags?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Template
     */
    inventories?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Template
     */
    envvars?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Template
     */
    extravars?: string | null;
    /**
     * 
     * @type {number}
     * @memberof Template
     */
    forks?: number;
    /**
     * 
     * @type {number}
     * @memberof Template
     */
    timeout?: number;
    /**
     * 
     * @type {string}
     * @memberof Template
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Template
     */
    description?: string | null;
}

/**
 * Check if a given object implements the Template interface.
 */
export function instanceOfTemplate(value: object): value is Template {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    if (!('deletedAt' in value) || value['deletedAt'] === undefined) return false;
    if (!('createdBy' in value) || value['createdBy'] === undefined) return false;
    if (!('updatedBy' in value) || value['updatedBy'] === undefined) return false;
    if (!('deletedBy' in value) || value['deletedBy'] === undefined) return false;
    if (!('release' in value) || value['release'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    return true;
}

export function TemplateFromJSON(json: any): Template {
    return TemplateFromJSONTyped(json, false);
}

export function TemplateFromJSONTyped(json: any, ignoreDiscriminator: boolean): Template {
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
        'release': ReleaseSummaryFromJSON(json['release']),
        'playbook': json['playbook'] == null ? undefined : json['playbook'],
        'role': json['role'] == null ? undefined : json['role'],
        'tags': json['tags'] == null ? undefined : json['tags'],
        'inventories': json['inventories'] == null ? undefined : json['inventories'],
        'envvars': json['envvars'] == null ? undefined : json['envvars'],
        'extravars': json['extravars'] == null ? undefined : json['extravars'],
        'forks': json['forks'] == null ? undefined : json['forks'],
        'timeout': json['timeout'] == null ? undefined : json['timeout'],
        'name': json['name'],
        'description': json['description'] == null ? undefined : json['description'],
    };
}

export function TemplateToJSON(value?: Omit<Template, 'id'|'created_at'|'updated_at'|'deleted_at'|'created_by'|'updated_by'|'deleted_by'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'release': ReleaseSummaryToJSON(value['release']),
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

