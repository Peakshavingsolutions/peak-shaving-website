import React, { useEffect, useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { get, set } from 'idb-keyval';
import { Loader2 } from 'lucide-react';

interface GeneratedImageProps {
  prompt: string;
  alt: string;
  className?: string;
}

export default function GeneratedImage({ prompt, alt, className = '' }: GeneratedImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchImage() {
      try {
        // Create a unique key for the prompt
        const cacheKey = `img_${btoa(prompt).substring(0, 32)}`;
        
        // Check cache first
        const cachedImage = await get(cacheKey);
        if (cachedImage) {
          if (isMounted) {
            setImageUrl(cachedImage);
            setLoading(false);
          }
          return;
        }

        // Initialize Gemini API
        // @ts-ignore - process.env is injected by Vite
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          throw new Error('Gemini API key is not configured.');
        }

        const ai = new GoogleGenAI({ apiKey });

        // Generate image
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              { text: prompt }
            ]
          },
          config: {
            imageConfig: {
              aspectRatio: "4:3"
            }
          }
        });

        const parts = response.candidates?.[0]?.content?.parts || [];
        let base64Image = null;

        for (const part of parts) {
          if (part.inlineData) {
            const mimeType = part.inlineData.mimeType || 'image/png';
            base64Image = `data:${mimeType};base64,${part.inlineData.data}`;
            break;
          } else if (part.text) {
            console.log("Model returned text instead of image:", part.text);
          }
        }

        if (!base64Image) {
          throw new Error('No image data returned from the model.');
        }

        // Save to cache
        await set(cacheKey, base64Image);

        if (isMounted) {
          setImageUrl(base64Image);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Failed to generate image:', err);
        if (isMounted) {
          setError(err.message || 'Failed to generate image');
          setLoading(false);
        }
      }
    }

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [prompt]);

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gray-100 ${className}`}>
        <Loader2 className="w-8 h-8 text-pss-orange animate-spin mb-2" />
        <span className="text-sm text-pss-slate font-medium">Genereren van AI afbeelding...</span>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 text-red-500 p-4 text-center ${className}`}>
        <p className="text-sm">Afbeelding kon niet worden gegenereerd.<br/>{error}</p>
      </div>
    );
  }

  return (
    <img 
      src={imageUrl} 
      alt={alt} 
      className={className} 
      referrerPolicy="no-referrer"
    />
  );
}
