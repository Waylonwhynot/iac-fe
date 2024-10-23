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
 * @interface Crontab
 */
export interface Crontab {
    /**
     * 
     * @type {number}
     * @memberof Crontab
     */
    readonly id: number;
    /**
     * 
     * @type {string}
     * @memberof Crontab
     */
    timezone: string;
    /**
     * Cron Minutes to Run. Use "*" for "all". (Example: "0,30")
     * @type {string}
     * @memberof Crontab
     */
    minute?: string;
    /**
     * Cron Hours to Run. Use "*" for "all". (Example: "8,20")
     * @type {string}
     * @memberof Crontab
     */
    hour?: string;
    /**
     * Cron Days Of The Month to Run. Use "*" for "all". (Example: "1,15")
     * @type {string}
     * @memberof Crontab
     */
    dayOfMonth?: string;
    /**
     * Cron Months (1-12) Of The Year to Run. Use "*" for "all". (Example: "1,12")
     * @type {string}
     * @memberof Crontab
     */
    monthOfYear?: string;
    /**
     * Cron Days Of The Week to Run. Use "*" for "all", Sunday is 0 or 7, Monday is 1. (Example: "0,5")
     * @type {string}
     * @memberof Crontab
     */
    dayOfWeek?: string;
}

/**
 * Check if a given object implements the Crontab interface.
 */
export function instanceOfCrontab(value: object): value is Crontab {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('timezone' in value) || value['timezone'] === undefined) return false;
    return true;
}

export function CrontabFromJSON(json: any): Crontab {
    return CrontabFromJSONTyped(json, false);
}

export function CrontabFromJSONTyped(json: any, ignoreDiscriminator: boolean): Crontab {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'timezone': json['timezone'],
        'minute': json['minute'] == null ? undefined : json['minute'],
        'hour': json['hour'] == null ? undefined : json['hour'],
        'dayOfMonth': json['day_of_month'] == null ? undefined : json['day_of_month'],
        'monthOfYear': json['month_of_year'] == null ? undefined : json['month_of_year'],
        'dayOfWeek': json['day_of_week'] == null ? undefined : json['day_of_week'],
    };
}

export function CrontabToJSON(value?: Omit<Crontab, 'id'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'timezone': value['timezone'],
        'minute': value['minute'],
        'hour': value['hour'],
        'day_of_month': value['dayOfMonth'],
        'month_of_year': value['monthOfYear'],
        'day_of_week': value['dayOfWeek'],
    };
}

