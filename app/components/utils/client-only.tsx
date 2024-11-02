import { ReactNode } from 'react';
import { useHydrate } from '~/hooks';

interface ClientOnlyProps {
    children: ReactNode;
    fallback?: ReactNode;
};

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
    const hydrated = useHydrate();
    if (hydrated) {
        return <>{children}</>
    }
    return <>{fallback}</>
}