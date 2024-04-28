'use client'

import useTextRecognition from '@/hooks/useTextRecognition';
import { useMaterialStore } from '@/store';
import React, { ChangeEvent, useEffect } from 'react';

interface Props {
    text: string;
    icon: React.ReactNode;
    action: () => void;
}

export const ButtonCardUploadRemito: React.FC<Props> = ({ text, icon, action }) => {

    const setStoreMaterial = useMaterialStore(state => state.setStoreMaterial)
    const setIsLoadingMaterial = useMaterialStore(state => state.setIsLoadingMaterial)

    const { recognizedMaterials, isLoading, handleImageUpload } = useTextRecognition();

    useEffect(() => {
        setIsLoadingMaterial(isLoading); // Update isLoading state in the store
        if (!isLoading && recognizedMaterials.length > 0) {
            setStoreMaterial(recognizedMaterials);
        }
    }, [recognizedMaterials, isLoading, setStoreMaterial]);

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0];
            handleImageUpload(image);
        }
    };

    return (
        <label className="flex-1 p-2 mx-1 bg-white border border-gray-200 rounded-lg hover:bg-gray-200 cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
            <div onClick={action}>
                <p className="font-normal text-base text-gray-700">{icon}</p>
                <h5 className="mt-2 text-sm font-medium tracking-tight text-gray-900">{text}</h5>
            </div>
        </label>
    );
};