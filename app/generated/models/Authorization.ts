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
 * @interface Authorization
 */
export interface Authorization {
    /**
     * 
     * @type {string}
     * @memberof Authorization
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof Authorization
     */
    password: string;
    /**
     * 
     * @type {string}
     * @memberof Authorization
     */
    readonly token: string;
    /**
     * 
     * @type {Date}
     * @memberof Authorization
     */
    readonly expiredAt: Date;
}

/**
 * Check if a given object implements the Authorization interface.
 */
export function instanceOfAuthorization(value: object): value is Authorization {
    if (!('username' in value) || value['username'] === undefined) return false;
    if (!('password' in value) || value['password'] === undefined) return false;
    if (!('token' in value) || value['token'] === undefined) return false;
    if (!('expiredAt' in value) || value['expiredAt'] === undefined) return false;
    return true;
}

export function AuthorizationFromJSON(json: any): Authorization {
    return AuthorizationFromJSONTyped(json, false);
}

export function AuthorizationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Authorization {
    if (json == null) {
        return json;
    }
    return {
        
        'username': json['username'],
        'password': json['password'],
        'token': json['token'],
        'expiredAt': (new Date(json['expired_at'])),
    };
}

export function AuthorizationToJSON(value?: Omit<Authorization, 'token'|'expired_at'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'username': value['username'],
        'password': value['password'],
    };
}
