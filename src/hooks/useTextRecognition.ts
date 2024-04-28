import { qrScannerToObjectArray } from '@/utils';
import { Material } from '@prisma/client';
import { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';

const useTextRecognition = () => {
    const [recognizedMaterials, setRecognizedMaterials] = useState<Omit<Material, 'id'>[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const recognizeText = async () => {
            if (selectedImage) {
                setIsLoading(true);
                const recognitionPromise = Tesseract.recognize(selectedImage);
                const timeoutPromise = new Promise<void>((resolve) => {
                    timeoutId = setTimeout(() => {
                        resolve();
                    }, 7000); // Set max loading time to 5 seconds
                });

                try {
                    await Promise.race([recognitionPromise, timeoutPromise]);
                    clearTimeout(timeoutId);
                } catch (error) {
                    console.error("Recognition error:", error);
                    clearTimeout(timeoutId);
                    setIsLoading(false);
                    return;
                }

                const result = await recognitionPromise;
                const filteredWords = extractFormattedText(result.data.words);
                const materials = qrScannerToObjectArray(filteredWords); // Convert recognized text to materials
                setRecognizedMaterials(materials);
                setIsLoading(false);
            }
        };

        recognizeText();

        return () => {
            clearTimeout(timeoutId); // Clean up the timeout on component unmount or re-render
        };
    }, [selectedImage]);

    const handleImageUpload = (image: File) => {
        setSelectedImage(URL.createObjectURL(image));
    };

    const extractFormattedText = (words: any[]): string[] => {
        const validFormatRegex = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
        const filteredWords = words.filter(word => validFormatRegex.test(word.text));
        return filteredWords.map(word => word.text);
    };

    return { recognizedMaterials, isLoading, handleImageUpload };
};

export default useTextRecognition;
