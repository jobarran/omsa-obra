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
                    }, 7000);
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
                console.log(result)
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
        // Adjusted regex pattern to match the expected formats
        const validFormatRegex = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
        
        // Function to normalize the text before validation
        const normalizeText = (text: string): string => {
            // Replace ':' with '-'
            text = text.replace(/:/g, '-');
            // Replace lowercase 'm' with uppercase 'M'
            text = text.replace(/m/g, 'M');
            // Replace 's' with '5'
            text = text.replace(/s/g, '5');
            // Remove special characters like '¢'
            text = text.replace(/[^A-Z0-9\-]/g, '');
            // Ensure the first character is uppercase
            text = text.charAt(0).toUpperCase() + text.slice(1);
            return text;
        };
    
        const filteredWords = words.filter(word => {
            const normalizedText = normalizeText(word.text);
            return validFormatRegex.test(normalizedText);
        });
    
        // Map and normalize the filtered words for the final result
        return filteredWords.map(word => normalizeText(word.text));
    };

    return { recognizedMaterials, isLoading, handleImageUpload };
};

export default useTextRecognition;
