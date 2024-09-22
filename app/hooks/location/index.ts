import { useLocation, useNavigate } from 'remix';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PaginationProps } from 'antd';

export interface Pagination {
    count?: number,
    page?: number,
    size?: number
}

export function usePagination(defaultValue?: Pagination):[PaginationProps|undefined, Dispatch<SetStateAction<Pagination|undefined>>] {
    const navigate = useNavigate();
    const location = useLocation();
    const [pagination, setPagination] = useState(defaultValue);
    const [props, setProps] = useState<PaginationProps>();

    useEffect(() => {
        if (pagination) {
            setProps({
                current: pagination.page,
                pageSize: pagination.size,
                total: pagination.count,
                onChange: (page: Number, size: Number) => {
                    const query = new URLSearchParams(location.search)
                    query.set("page", page.toString())
                    query.set("size", size.toString())
                    navigate({ pathname: location.pathname, search: query.toString()})
                }
            })
        }
    }, [pagination])
    return [props, setPagination]
}