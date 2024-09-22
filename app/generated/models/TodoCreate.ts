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
 * @interface TodoCreate
 */
export interface TodoCreate {
    /**
     * 
     * @type {string}
     * @memberof TodoCreate
     */
    text: string;
}

/**
 * Check if a given object implements the TodoCreate interface.
 */
export function instanceOfTodoCreate(value: object): value is TodoCreate {
    if (!('text' in value) || value['text'] === undefined) return false;
    return true;
}

export function TodoCreateFromJSON(json: any): TodoCreate {
    return TodoCreateFromJSONTyped(json, false);
}

export function TodoCreateFromJSONTyped(json: any, ignoreDiscriminator: boolean): TodoCreate {
    if (json == null) {
        return json;
    }
    return {
        
        'text': json['text'],
    };
}

export function TodoCreateToJSON(value?: TodoCreate | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'text': value['text'],
    };
}
