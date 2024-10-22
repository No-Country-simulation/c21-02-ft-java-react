"use client";

import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { useParams } from 'next/navigation';

const Page = () => {
    
    const { id } = useParams<{ id: string }>();

    const lobby = useAppSelector(store => store.lobby)

    return (
        <div>
            <h1>Sala con ID: {id}</h1>
        </div>
    );
};

export default Page;
