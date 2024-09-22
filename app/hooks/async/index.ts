import { useState } from 'react';

type State = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED"

export interface UseAsyncResult<T, R> {
    state: State;
    data?: R;
    err?: Error;
    run: (arg: T) => void;
}

export interface UseAsyncOptions<T, R> {
    onBefore?: (arg: T) => void;
    onSuccess?: (arg: T, data: R) => void;
    onError?: (arg: T, err: Error) => void;
    onFinally?: (arg: T, data?: R, err?: Error) => void;
}

export function useAsync<T, R>(service: (arg: T) => Promise<R>, options?: UseAsyncOptions<T, R>): UseAsyncResult<T, R> {
    const [state, setState] = useState<State>("PENDING");
    const [data, setData] = useState<R>();
    const [err, setErr] = useState<Error>();

    const run = async (arg: T) => {
        if (options?.onBefore) {
            options.onBefore(arg);
        }
        setState("RUNNING");
        service(arg).then((data) => {
            if (options?.onSuccess) {
                options.onSuccess(arg, data);
            }
            setData(data);
            setState("COMPLETED");
        }).catch((err) => {
            if (options?.onError) {
                options.onError(arg, err);
            }
            setErr(err);
            setState("FAILED");
        }).finally(() => {
            if (options?.onFinally) {
                options.onFinally(arg, data, err);
            }
        })
    }

    return { state, data, err, run };
}