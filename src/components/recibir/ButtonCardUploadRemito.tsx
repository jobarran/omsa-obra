'use client'

import useTextRecognition from '@/hooks/useTextRecognition';
import { useMaterialStore } from '@/store';
import React, { ChangeEvent, useEffect } from 'react';

interface Props {
    text: string;
    icon: React.ReactNode;
    action: () => void;
    smallText: string
}

export const ButtonCardUploadRemito: React.FC<Props> = ({ text, icon, action, smallText }) => {

    const setStoreMaterial = useMaterialStore(state => state.setStoreMaterial)
    const setIsLoadingMaterial = useMaterialStore(state => state.setIsLoadingMaterial)
    const emptyStoreMaterial = useMaterialStore(state => state.emptyStoreMaterial)

    const { recognizedMaterials, isLoading, handleImageUpload } = useTextRecognition();

    useEffect(() => {
        setIsLoadingMaterial(isLoading)
        if (!isLoading && recognizedMaterials.length > 0) {
            setStoreMaterial(recognizedMaterials);
        }
    }, [recognizedMaterials, isLoading, setStoreMaterial]);

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        emptyStoreMaterial();
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0];
            handleImageUpload(image);
        }
        event.target.value = '';
    };

    return (
        <label className="flex-1 p-2 mx-1 bg-white border border-gray-200 rounded-lg hover:bg-gray-200 cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
            <div onClick={action}>
                <p className="font-normal text-base text-gray-700 hidden sm:block">{icon}</p>
                <p className="font-normal text-xl text-gray-700 flex items-center justify-center sm:hidden">{icon}</p>
                <h5 className="mt-2 text-sm font-medium tracking-tight text-gray-900 hidden sm:block">{text}</h5>
                <h5 className="mt-2 text-sm font-medium tracking-tight text-gray-900 flex items-center justify-center sm:hidden">{smallText}</h5>
            </div>
        </label>
    );
};