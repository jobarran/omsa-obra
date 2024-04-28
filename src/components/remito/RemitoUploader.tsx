'use client'


import React, { ChangeEvent, useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';

export const RemitoUploader: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [recognizedText, setRecognizedText] = useState<string[]>([]);

    useEffect(() => {
        const recognizeText = async () => {
            if (selectedImage) {
                const result = await Tesseract.recognize(selectedImage);
                const filteredWords = extractFormattedText(result.data.words);
                setRecognizedText(filteredWords);
            }
        };
        recognizeText();
    }, [selectedImage]);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0];
            setSelectedImage(URL.createObjectURL(image));
        }
    };

    const extractFormattedText = (words: any[]): string[] => {
        const validFormatRegex = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
        const filteredWords = words.filter(word => validFormatRegex.test(word.text));
        return filteredWords.map(word => word.text);
    };

    return (
        <div>
            <div>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {selectedImage && <img src={selectedImage} alt="Selected" />}
            </div>
            <div>
                <h2>Recognized Text:</h2>
                <ul>
                    {recognizedText.map((text, index) => (
                        <li key={index}>{text}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};