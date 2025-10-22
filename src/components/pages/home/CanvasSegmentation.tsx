'use client';

import React, { useRef, useEffect } from 'react';
import { useStore } from './store';

interface Point {
  x: number;
  y: number;
  label?: string;
  color?: string;
}

interface CanvasSegmentationProps {
  imageUrl?: string; // Optional: URL for background image
  width: number;
  points: Point[];
  height: number;
  pointRadius?: number; // Default: 5px
  fillColor?: string; // Color for polygon fill
  lineColor?: string; // Color for lines between points
}

const CanvasSegmentation: React.FC<CanvasSegmentationProps> = ({
  imageUrl,
  width,
  points,
  height,
  pointRadius = 1,
  fillColor = 'rgba(255, 0, 0, 0.5)', // Semi-transparent blue
  lineColor = 'red',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background image if provided
    const drawContent = () => {
      // Draw filled polygon
      if (points.length > 2) {
        // Need at least 3 points for a polygon
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw individual points
      points.forEach((point) => {
        const { x, y, label, color = 'red' } = point;

        // Draw point as a filled circle
        ctx.beginPath();
        ctx.arc(x, y, pointRadius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw label if provided
        if (label) {
          ctx.fillStyle = 'black';
          ctx.font = '12px Arial';
          ctx.fillText(label, x + pointRadius + 2, y - pointRadius - 2);
        }
      });
    };

    if (imageUrl) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        drawContent();
      };
      img.src = imageUrl;
    } else {
      drawContent();
    }
  }, [points, imageUrl, width, height, pointRadius, fillColor, lineColor]);

  // Handle click to add new points
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      style={{ border: '1px solid #ccc' }}
    />
  );
};

export default CanvasSegmentation;
