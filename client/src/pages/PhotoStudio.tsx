import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Download, RotateCw, Crop, Home, Sliders, FlipHorizontal, FlipVertical, Sun, Contrast, Palette, Undo, Redo, Zap, Sparkles, Eye, Moon, Droplets, Scissors, Focus, Layers, Wand2, Trash2, Copy, PaintBucket, Circle, Image as ImageIcon, Paintbrush, Settings, Maximize2, Move, RotateCcw, Square, Type, Highlighter, Eraser, Brush, Crosshair, Users, Smile, Target, Filter, Aperture, Camera, Mountain, PersonStanding } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const filters = [
  { name: "Original", value: "original" },
  { name: "Grayscale", value: "grayscale" },
  { name: "Sepia", value: "sepia" },
  { name: "Vintage", value: "vintage" },
  { name: "Vibrant", value: "vibrant" },
  { name: "Cool", value: "cool" },
  { name: "Warm", value: "warm" },
  { name: "High Contrast", value: "contrast" },
  { name: "Noir", value: "noir" },
  { name: "Soft", value: "soft" },
  { name: "Dramatic", value: "dramatic" },
  { name: "Retro", value: "retro" },
];

export default function PhotoStudio() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("original");
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Basic adjustments
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [hue, setHue] = useState(0);
  const [exposure, setExposure] = useState(0);
  const [shadows, setShadows] = useState(0);
  const [highlights, setHighlights] = useState(0);
  const [vibrance, setVibrance] = useState(0);
  const [warmth, setWarmth] = useState(0);
  const [sharpness, setSharpness] = useState(0);
  const [vignette, setVignette] = useState(0);

  // Effects
  const [blur, setBlur] = useState(0);
  const [noise, setNoise] = useState(0);
  const [pixelate, setPixelate] = useState(0);
  const [emboss, setEmboss] = useState(0);
  const [edgeDetection, setEdgeDetection] = useState(false);
  const [backgroundRemoved, setBackgroundRemoved] = useState(false);
  const [invertColors, setInvertColors] = useState(false);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);

  // Advanced tools
  const [gamma, setGamma] = useState(1);
  const [shadows2, setShadows2] = useState(0);
  const [midtones, setMidtones] = useState(0);
  const [highlights2, setHighlights2] = useState(0);
  const [redChannel, setRedChannel] = useState(100);
  const [greenChannel, setGreenChannel] = useState(100);
  const [blueChannel, setBlueChannel] = useState(100);
  const [sepia, setSepia] = useState(0);
  const [posterize, setPosterize] = useState(256);
  const [threshold, setThreshold] = useState(128);
  const [solarize, setSolarize] = useState(false);
  const [mosaic, setMosaic] = useState(0);
  const [oil, setOil] = useState(0);
  const [sketch, setSketch] = useState(false);
  const [crossProcess, setCrossProcess] = useState(false);
  const [splitToning, setSplitToning] = useState(false);
  const [highlightColor, setHighlightColor] = useState("#ffffff");
  const [shadowColor, setShadowColor] = useState("#000000");
  const [cropMode, setCropMode] = useState(false);
  const [cropStart, setCropStart] = useState({ x: 0, y: 0 });
  const [cropEnd, setCropEnd] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(100);

  // Professional tools
  const [bgRemovalMode, setBgRemovalMode] = useState<'corner' | 'edge' | 'smart' | 'chroma'>('smart');
  const [bgTolerance, setBgTolerance] = useState(50);
  const [chromaKeyColor, setChromaKeyColor] = useState('#00ff00');
  const [skinSmoothing, setSkinSmoothing] = useState(0);
  const [teethWhitening, setTeethWhitening] = useState(0);
  const [eyeEnhancement, setEyeEnhancement] = useState(0);
  const [hdr, setHdr] = useState(0);
  const [clarity, setClarity] = useState(0);
  const [structure, setStructure] = useState(0);
  const [dehaze, setDehaze] = useState(0);
  const [ortonEffect, setOrtonEffect] = useState(0);
  const [colorGrading, setColorGrading] = useState({
    shadows: { r: 0, g: 0, b: 0, hex: '#808080' },
    midtones: { r: 0, g: 0, b: 0, hex: '#808080' },
    highlights: { r: 0, g: 0, b: 0, hex: '#808080' }
  });
  const [lensCorrection, setLensCorrection] = useState({
    vignetting: 0,
    distortion: 0,
    chromatic: 0
  });
  const [localAdjustments, setLocalAdjustments] = useState<Array<{
    id: string;
    type: 'radial' | 'linear';
    position: { x: number; y: number };
    size: number;
    feather: number;
    adjustments: { [key: string]: number };
  }>>([]);

  const [downloadFormat, setDownloadFormat] = useState("png");
  const [editHistory, setEditHistory] = useState<any[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedImage && canvasRef.current) {
      applyEffects();
    }
  }, [
    selectedFilter, selectedImage, rotation, brightness, contrast, saturation, hue,
    exposure, shadows, highlights, vibrance, warmth, sharpness, vignette, blur,
    noise, pixelate, emboss, edgeDetection, backgroundRemoved, invertColors,
    flipHorizontal, flipVertical, gamma, shadows2, midtones, highlights2,
    redChannel, greenChannel, blueChannel, sepia, posterize, threshold,
    solarize, mosaic, oil, sketch, crossProcess, splitToning, zoom,
    bgRemovalMode, bgTolerance, chromaKeyColor, skinSmoothing, teethWhitening,
    eyeEnhancement, hdr, clarity, structure, dehaze, ortonEffect, colorGrading,
    lensCorrection, localAdjustments
  ]);

  const applyEffects = () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedImage) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      const rotRad = (rotation * Math.PI) / 180;
      const is90or270 = rotation % 180 !== 0;

      if (is90or270) {
        canvas.width = img.height;
        canvas.height = img.width;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      let scaleX = flipHorizontal ? -1 : 1;
      let scaleY = flipVertical ? -1 : 1;
      ctx.scale(scaleX, scaleY);

      ctx.rotate(rotRad);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore();

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Apply filter
      applySelectedFilter(data);

      // Apply adjustments
      applyAdjustments(data);

      // Apply effects
      applyAdvancedEffects(data, canvas.width, canvas.height);

      ctx.putImageData(imageData, 0, 0);
    };
    img.src = selectedImage;
  };

  const applySelectedFilter = (data: Uint8ClampedArray) => {
    switch (selectedFilter) {
      case "grayscale":
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i + 1] = data[i + 2] = avg;
        }
        break;
      case "sepia":
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
          data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
          data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        }
        break;
      case "vintage":
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.1);
          data[i + 1] = Math.min(255, data[i + 1] * 0.95);
          data[i + 2] = Math.min(255, data[i + 2] * 0.85);
        }
        break;
      case "vibrant":
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.3);
          data[i + 1] = Math.min(255, data[i + 1] * 1.3);
          data[i + 2] = Math.min(255, data[i + 2] * 1.3);
        }
        break;
      case "cool":
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 0.9);
          data[i + 1] = Math.min(255, data[i + 1] * 0.95);
          data[i + 2] = Math.min(255, data[i + 2] * 1.1);
        }
        break;
      case "warm":
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.1);
          data[i + 1] = Math.min(255, data[i + 1] * 1.05);
          data[i + 2] = Math.min(255, data[i + 2] * 0.9);
        }
        break;
      case "contrast":
        const factor = 1.5;
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, factor * (data[i] - 128) + 128);
          data[i + 1] = Math.min(255, factor * (data[i + 1] - 128) + 128);
          data[i + 2] = Math.min(255, factor * (data[i + 2] - 128) + 128);
        }
        break;
      case "noir":
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          const contrast = avg < 128 ? avg * 0.7 : avg * 1.3;
          data[i] = data[i + 1] = data[i + 2] = Math.min(255, Math.max(0, contrast));
        }
        break;
      case "soft":
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 0.9 + 25);
          data[i + 1] = Math.min(255, data[i + 1] * 0.9 + 25);
          data[i + 2] = Math.min(255, data[i + 2] * 0.9 + 25);
        }
        break;
      case "dramatic":
        for (let i = 0; i < data.length; i += 4) {
          const luminance = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          const dramFactor = luminance < 128 ? 0.6 : 1.4;
          data[i] = Math.min(255, Math.max(0, data[i] * dramFactor));
          data[i + 1] = Math.min(255, Math.max(0, data[i + 1] * dramFactor));
          data[i + 2] = Math.min(255, Math.max(0, data[i + 2] * dramFactor));
        }
        break;
      case "retro":
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          data[i] = Math.min(255, r * 1.2 + g * 0.1);
          data[i + 1] = Math.min(255, g * 0.9 + r * 0.1);
          data[i + 2] = Math.min(255, b * 0.7 + r * 0.1);
        }
        break;
    }
  };

  const applyAdjustments = (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      // Brightness
      if (brightness !== 0) {
        const brightnessAdj = brightness * 2.55;
        r = Math.max(0, Math.min(255, r + brightnessAdj));
        g = Math.max(0, Math.min(255, g + brightnessAdj));
        b = Math.max(0, Math.min(255, b + brightnessAdj));
      }

      // Contrast
      if (contrast !== 0) {
        const contrastFactor = (259 * (contrast + 259)) / (259 * (259 - contrast));
        r = Math.max(0, Math.min(255, contrastFactor * (r - 128) + 128));
        g = Math.max(0, Math.min(255, contrastFactor * (g - 128) + 128));
        b = Math.max(0, Math.min(255, contrastFactor * (b - 128) + 128));
      }

      // Saturation
      if (saturation !== 0) {
        const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
        const satFactor = (saturation + 100) / 100;
        r = Math.max(0, Math.min(255, gray + satFactor * (r - gray)));
        g = Math.max(0, Math.min(255, gray + satFactor * (g - gray)));
        b = Math.max(0, Math.min(255, gray + satFactor * (b - gray)));
      }

      // Exposure
      if (exposure !== 0) {
        const expFactor = Math.pow(2, exposure / 50);
        r = Math.max(0, Math.min(255, r * expFactor));
        g = Math.max(0, Math.min(255, g * expFactor));
        b = Math.max(0, Math.min(255, b * expFactor));
      }

      // Warmth
      if (warmth !== 0) {
        const warmthFactor = warmth / 100;
        r = Math.max(0, Math.min(255, r + warmthFactor * 30));
        b = Math.max(0, Math.min(255, b - warmthFactor * 30));
      }

      // Vibrance
      if (vibrance !== 0) {
        const maxRGB = Math.max(r, g, b);
        const minRGB = Math.min(r, g, b);
        const vibranceFactor = 1 + (vibrance / 100) * (1 - (maxRGB - minRGB) / 255);
        const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
        r = Math.max(0, Math.min(255, gray + vibranceFactor * (r - gray)));
        g = Math.max(0, Math.min(255, gray + vibranceFactor * (g - gray)));
        b = Math.max(0, Math.min(255, gray + vibranceFactor * (b - gray)));
      }

      // Gamma correction
      if (gamma !== 1) {
        r = Math.pow(r / 255, 1 / gamma) * 255;
        g = Math.pow(g / 255, 1 / gamma) * 255;
        b = Math.pow(b / 255, 1 / gamma) * 255;
      }

      // Color channels
      if (redChannel !== 100) {
        r = Math.max(0, Math.min(255, r * (redChannel / 100)));
      }
      if (greenChannel !== 100) {
        g = Math.max(0, Math.min(255, g * (greenChannel / 100)));
      }
      if (blueChannel !== 100) {
        b = Math.max(0, Math.min(255, b * (blueChannel / 100)));
      }

      // Sepia (if using slider instead of filter)
      if (sepia > 0) {
        const sepiaR = (r * 0.393 + g * 0.769 + b * 0.189) * (sepia / 100) + r * (1 - sepia / 100);
        const sepiaG = (r * 0.349 + g * 0.686 + b * 0.168) * (sepia / 100) + g * (1 - sepia / 100);
        const sepiaB = (r * 0.272 + g * 0.534 + b * 0.131) * (sepia / 100) + b * (1 - sepia / 100);
        r = Math.min(255, sepiaR);
        g = Math.min(255, sepiaG);
        b = Math.min(255, sepiaB);
      }

      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
    }
  };

  const applyAdvancedEffects = (data: Uint8ClampedArray, width: number, height: number) => {
    // Professional background removal
    if (backgroundRemoved) {
      switch (bgRemovalMode) {
        case 'corner':
          applyCornerBasedBgRemoval(data, width, height);
          break;
        case 'edge':
          applyEdgeBasedBgRemoval(data, width, height);
          break;
        case 'smart':
          applySmartBgRemoval(data, width, height);
          break;
        case 'chroma':
          applyChromaKeyBgRemoval(data, width, height);
          break;
      }
    }

    // Professional skin smoothing
    if (skinSmoothing > 0) {
      applySkinSmoothing(data, width, height, skinSmoothing);
    }

    // Teeth whitening
    if (teethWhitening > 0) {
      applyTeethWhitening(data, width, height, teethWhitening);
    }

    // Eye enhancement
    if (eyeEnhancement > 0) {
      applyEyeEnhancement(data, width, height, eyeEnhancement);
    }

    // HDR processing
    if (hdr > 0) {
      applyHDRProcessing(data, width, height, hdr);
    }

    // Clarity enhancement
    if (clarity !== 0) {
      applyClarityAdjustment(data, width, height, clarity);
    }

    // Structure enhancement
    if (structure > 0) {
      applyStructureEnhancement(data, width, height, structure);
    }

    // Dehaze
    if (dehaze > 0) {
      applyDehazeEffect(data, width, height, dehaze);
    }

    // Orton effect
    if (ortonEffect > 0) {
      applyOrtonEffect(data, width, height, ortonEffect);
    }

    // Color grading
    if (colorGrading.shadows.r !== 0 || colorGrading.shadows.g !== 0 || colorGrading.shadows.b !== 0 ||
      colorGrading.midtones.r !== 0 || colorGrading.midtones.g !== 0 || colorGrading.midtones.b !== 0 ||
      colorGrading.highlights.r !== 0 || colorGrading.highlights.g !== 0 || colorGrading.highlights.b !== 0) {
      applyColorGrading(data, width, height, colorGrading);
    }

    // Lens corrections
    if (lensCorrection.vignetting !== 0 || lensCorrection.distortion !== 0 || lensCorrection.chromatic !== 0) {
      applyLensCorrections(data, width, height, lensCorrection);
    }

    // Edge detection
    if (edgeDetection) {
      const newData = new Uint8ClampedArray(data);
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = (y * width + x) * 4;
          const getPixel = (ox: number, oy: number) => {
            const i = ((y + oy) * width + (x + ox)) * 4;
            return (data[i] + data[i + 1] + data[i + 2]) / 3;
          };

          const gx = (-1 * getPixel(-1, -1)) + (1 * getPixel(1, -1)) +
            (-2 * getPixel(-1, 0)) + (2 * getPixel(1, 0)) +
            (-1 * getPixel(-1, 1)) + (1 * getPixel(1, 1));

          const gy = (-1 * getPixel(-1, -1)) + (-2 * getPixel(0, -1)) + (-1 * getPixel(1, -1)) +
            (1 * getPixel(-1, 1)) + (2 * getPixel(0, 1)) + (1 * getPixel(1, 1));

          const magnitude = Math.sqrt(gx * gx + gy * gy);
          const edge = magnitude > 50 ? 255 : 0;
          newData[idx] = newData[idx + 1] = newData[idx + 2] = edge;
        }
      }
      data.set(newData);
    }

    // Blur
    if (blur > 0) {
      const blurRadius = Math.floor(blur / 10);
      if (blurRadius > 0) {
        const newData = new Uint8ClampedArray(data);
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0, count = 0;
            for (let dy = -blurRadius; dy <= blurRadius; dy++) {
              for (let dx = -blurRadius; dx <= blurRadius; dx++) {
                const nx = x + dx, ny = y + dy;
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                  const idx = (ny * width + nx) * 4;
                  r += data[idx];
                  g += data[idx + 1];
                  b += data[idx + 2];
                  count++;
                }
              }
            }
            const idx = (y * width + x) * 4;
            newData[idx] = r / count;
            newData[idx + 1] = g / count;
            newData[idx + 2] = b / count;
          }
        }
        data.set(newData);
      }
    }

    // Noise
    if (noise > 0) {
      for (let i = 0; i < data.length; i += 4) {
        const noiseAmount = (Math.random() - 0.5) * noise * 2;
        data[i] = Math.max(0, Math.min(255, data[i] + noiseAmount));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noiseAmount));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noiseAmount));
      }
    }

    // Pixelate
    if (pixelate > 0) {
      const blockSize = Math.max(1, Math.floor(pixelate / 10));
      for (let y = 0; y < height; y += blockSize) {
        for (let x = 0; x < width; x += blockSize) {
          let r = 0, g = 0, b = 0, count = 0;
          for (let dy = 0; dy < blockSize && y + dy < height; dy++) {
            for (let dx = 0; dx < blockSize && x + dx < width; dx++) {
              const idx = ((y + dy) * width + (x + dx)) * 4;
              r += data[idx];
              g += data[idx + 1];
              b += data[idx + 2];
              count++;
            }
          }
          r /= count; g /= count; b /= count;
          for (let dy = 0; dy < blockSize && y + dy < height; dy++) {
            for (let dx = 0; dx < blockSize && x + dx < width; dx++) {
              const idx = ((y + dy) * width + (x + dx)) * 4;
              data[idx] = r;
              data[idx + 1] = g;
              data[idx + 2] = b;
            }
          }
        }
      }
    }

    // Emboss
    if (emboss > 0) {
      const newData = new Uint8ClampedArray(data);
      const embossStrength = emboss / 50;
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = (y * width + x) * 4;
          const prevIdx = ((y - 1) * width + (x - 1)) * 4;
          for (let c = 0; c < 3; c++) {
            const diff = (data[idx + c] - data[prevIdx + c]) * embossStrength;
            newData[idx + c] = Math.max(0, Math.min(255, 128 + diff));
          }
        }
      }
      data.set(newData);
    }

    // Posterize
    if (posterize < 256) {
      const levels = Math.max(2, posterize);
      const factor = 255 / (levels - 1);
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.round(data[i] / factor) * factor;
        data[i + 1] = Math.round(data[i + 1] / factor) * factor;
        data[i + 2] = Math.round(data[i + 2] / factor) * factor;
      }
    }

    // Threshold
    if (threshold !== 128) {
      for (let i = 0; i < data.length; i += 4) {
        const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const val = gray > threshold ? 255 : 0;
        data[i] = data[i + 1] = data[i + 2] = val;
      }
    }

    // Solarize
    if (solarize) {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] > 128 ? 255 - data[i] : data[i];
        data[i + 1] = data[i + 1] > 128 ? 255 - data[i + 1] : data[i + 1];
        data[i + 2] = data[i + 2] > 128 ? 255 - data[i + 2] : data[i + 2];
      }
    }

    // Mosaic
    if (mosaic > 0) {
      const mosaicSize = Math.max(2, Math.floor(mosaic / 5));
      for (let y = 0; y < height; y += mosaicSize) {
        for (let x = 0; x < width; x += mosaicSize) {
          let r = 0, g = 0, b = 0, count = 0;
          for (let dy = 0; dy < mosaicSize && y + dy < height; dy++) {
            for (let dx = 0; dx < mosaicSize && x + dx < width; dx++) {
              const idx = ((y + dy) * width + (x + dx)) * 4;
              r += data[idx];
              g += data[idx + 1];
              b += data[idx + 2];
              count++;
            }
          }
          r /= count; g /= count; b /= count;
          for (let dy = 0; dy < mosaicSize && y + dy < height; dy++) {
            for (let dx = 0; dx < mosaicSize && x + dx < width; dx++) {
              const idx = ((y + dy) * width + (x + dx)) * 4;
              data[idx] = r;
              data[idx + 1] = g;
              data[idx + 2] = b;
            }
          }
        }
      }
    }

    // Invert colors
    if (invertColors) {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
    }

    // Sketch effect
    if (sketch) {
      // Convert to grayscale first
      for (let i = 0; i < data.length; i += 4) {
        const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        data[i] = data[i + 1] = data[i + 2] = gray;
      }

      // Apply edge detection
      const newData = new Uint8ClampedArray(data);
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = (y * width + x) * 4;
          const getPixel = (ox: number, oy: number) => {
            const i = ((y + oy) * width + (x + ox)) * 4;
            return data[i];
          };

          const gx = (-1 * getPixel(-1, -1)) + (1 * getPixel(1, -1)) +
            (-2 * getPixel(-1, 0)) + (2 * getPixel(1, 0)) +
            (-1 * getPixel(-1, 1)) + (1 * getPixel(1, 1));

          const gy = (-1 * getPixel(-1, -1)) + (-2 * getPixel(0, -1)) + (-1 * getPixel(1, -1)) +
            (1 * getPixel(-1, 1)) + (2 * getPixel(0, 1)) + (1 * getPixel(1, 1));

          const magnitude = Math.sqrt(gx * gx + gy * gy);
          const edge = 255 - Math.min(255, magnitude);
          newData[idx] = newData[idx + 1] = newData[idx + 2] = edge;
        }
      }
      data.set(newData);
    }

    // Cross process
    if (crossProcess) {
      for (let i = 0; i < data.length; i += 4) {
        // Simulate cross-processing by altering color curves
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        r = Math.min(255, r * 1.3 - 30);
        g = Math.min(255, g * 0.8 + 20);
        b = Math.min(255, b * 1.1 + 10);

        data[i] = Math.max(0, r);
        data[i + 1] = Math.max(0, g);
        data[i + 2] = Math.max(0, b);
      }
    }
  };

  // Professional background removal functions
  const applyCornerBasedBgRemoval = (data: Uint8ClampedArray, width: number, height: number) => {
    const cornerSamples = [
      { x: 0, y: 0 }, { x: width - 1, y: 0 },
      { x: 0, y: height - 1 }, { x: width - 1, y: height - 1 }
    ];

    const bgColors = cornerSamples.map(pos => {
      const idx = (pos.y * width + pos.x) * 4;
      return { r: data[idx], g: data[idx + 1], b: data[idx + 2] };
    });

    const avgBg = {
      r: bgColors.reduce((sum, c) => sum + c.r, 0) / bgColors.length,
      g: bgColors.reduce((sum, c) => sum + c.g, 0) / bgColors.length,
      b: bgColors.reduce((sum, c) => sum + c.b, 0) / bgColors.length
    };

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const distance = Math.sqrt(
        Math.pow(r - avgBg.r, 2) +
        Math.pow(g - avgBg.g, 2) +
        Math.pow(b - avgBg.b, 2)
      );
      if (distance < bgTolerance) {
        data[i + 3] = Math.max(0, 255 - (distance / bgTolerance) * 255);
      }
    }
  };

  const applyEdgeBasedBgRemoval = (data: Uint8ClampedArray, width: number, height: number) => {
    const edgeData = new Uint8ClampedArray(data);

    // Apply edge detection
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        const getGray = (ox: number, oy: number) => {
          const i = ((y + oy) * width + (x + ox)) * 4;
          return (data[i] + data[i + 1] + data[i + 2]) / 3;
        };

        const gx = (-1 * getGray(-1, -1)) + (1 * getGray(1, -1)) +
          (-2 * getGray(-1, 0)) + (2 * getGray(1, 0)) +
          (-1 * getGray(-1, 1)) + (1 * getGray(1, 1));

        const gy = (-1 * getGray(-1, -1)) + (-2 * getGray(0, -1)) + (-1 * getGray(1, -1)) +
          (1 * getGray(-1, 1)) + (2 * getGray(0, 1)) + (1 * getGray(1, 1));

        const magnitude = Math.sqrt(gx * gx + gy * gy);

        // If on an edge, keep the pixel; otherwise, check for background
        if (magnitude > 30) {
          // This is an edge pixel, keep it
        } else {
          // Apply corner-based removal for non-edge areas
          const r = data[idx], g = data[idx + 1], b = data[idx + 2];
          // Sample from edges of image for background color
          const edgeSamples = [];
          if (x < width * 0.1 || x > width * 0.9 || y < height * 0.1 || y > height * 0.9) {
            edgeSamples.push({ r, g, b });
          }

          if (edgeSamples.length > 0) {
            const avgEdge = {
              r: edgeSamples.reduce((sum, c) => sum + c.r, 0) / edgeSamples.length,
              g: edgeSamples.reduce((sum, c) => sum + c.g, 0) / edgeSamples.length,
              b: edgeSamples.reduce((sum, c) => sum + c.b, 0) / edgeSamples.length
            };

            const distance = Math.sqrt(
              Math.pow(r - avgEdge.r, 2) +
              Math.pow(g - avgEdge.g, 2) +
              Math.pow(b - avgEdge.b, 2)
            );

            if (distance < bgTolerance) {
              data[idx + 3] = Math.max(0, 255 - (distance / bgTolerance) * 255);
            }
          }
        }
      }
    }
  };

  const applySmartBgRemoval = (data: Uint8ClampedArray, width: number, height: number) => {
    // Combine multiple approaches for smart removal
    const histogram = new Array(256).fill(0);

    // Build color histogram from edge pixels
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (x < width * 0.05 || x > width * 0.95 || y < height * 0.05 || y > height * 0.95) {
          const idx = (y * width + x) * 4;
          const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          histogram[Math.floor(gray)]++;
        }
      }
    }

    // Find most common background color
    let maxCount = 0;
    let bgGray = 0;
    for (let i = 0; i < 256; i++) {
      if (histogram[i] > maxCount) {
        maxCount = histogram[i];
        bgGray = i;
      }
    }

    // Apply intelligent removal
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const gray = (r + g + b) / 3;
      const distance = Math.abs(gray - bgGray);

      // Also check color similarity
      const colorDistance = Math.sqrt(
        Math.pow(r - bgGray, 2) +
        Math.pow(g - bgGray, 2) +
        Math.pow(b - bgGray, 2)
      );

      if (distance < bgTolerance / 2 && colorDistance < bgTolerance) {
        const alpha = Math.max(0, 255 - (colorDistance / bgTolerance) * 255);
        data[i + 3] = alpha;
      }
    }
  };

  const applyChromaKeyBgRemoval = (data: Uint8ClampedArray, width: number, height: number) => {
    // Parse chroma key color
    const hex = chromaKeyColor.replace('#', '');
    const chromaR = parseInt(hex.substr(0, 2), 16);
    const chromaG = parseInt(hex.substr(2, 2), 16);
    const chromaB = parseInt(hex.substr(4, 2), 16);

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const distance = Math.sqrt(
        Math.pow(r - chromaR, 2) +
        Math.pow(g - chromaG, 2) +
        Math.pow(b - chromaB, 2)
      );

      if (distance < bgTolerance * 2) {
        data[i + 3] = Math.max(0, 255 - (distance / (bgTolerance * 2)) * 255);
      }
    }
  };

  const applySkinSmoothing = (data: Uint8ClampedArray, width: number, height: number, intensity: number) => {
    const newData = new Uint8ClampedArray(data);
    const radius = Math.max(1, Math.floor(intensity / 20));

    for (let y = radius; y < height - radius; y++) {
      for (let x = radius; x < width - radius; x++) {
        const idx = (y * width + x) * 4;
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];

        // Detect skin tones (simple heuristic)
        const isSkin = (r > g && r > b && r > 95 && g > 40 && b > 20 &&
          Math.abs(r - g) > 15 && r - b > 15);

        if (isSkin) {
          let sumR = 0, sumG = 0, sumB = 0, count = 0;

          for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
              const ni = ((y + dy) * width + (x + dx)) * 4;
              sumR += data[ni];
              sumG += data[ni + 1];
              sumB += data[ni + 2];
              count++;
            }
          }

          const avgR = sumR / count;
          const avgG = sumG / count;
          const avgB = sumB / count;
          const factor = intensity / 100;

          newData[idx] = r + (avgR - r) * factor;
          newData[idx + 1] = g + (avgG - g) * factor;
          newData[idx + 2] = b + (avgB - b) * factor;
        }
      }
    }

    data.set(newData);
  };

  const applyTeethWhitening = (data: Uint8ClampedArray, width: number, height: number, intensity: number) => {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];

      // Detect teeth-like colors (light yellowish/white)
      const isTeeth = (r > 150 && g > 140 && b > 120 && r > b && g > b &&
        Math.abs(r - g) < 30);

      if (isTeeth) {
        const factor = intensity / 100;
        const whitenAmount = Math.min(30, factor * 50);

        data[i] = Math.min(255, r + whitenAmount);
        data[i + 1] = Math.min(255, g + whitenAmount);
        data[i + 2] = Math.min(255, b + whitenAmount * 1.2); // Slightly more blue for whiter look
      }
    }
  };

  const applyEyeEnhancement = (data: Uint8ClampedArray, width: number, height: number, intensity: number) => {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];

      // Detect eye colors (blues, greens, browns)
      const isEye = ((b > r && b > g) || (g > r && g > b) ||
        (r > 100 && g > 60 && b > 40 && r > g && r > b));

      if (isEye) {
        const factor = intensity / 100;
        const enhanceAmount = factor * 1.3;

        data[i] = Math.min(255, r * enhanceAmount);
        data[i + 1] = Math.min(255, g * enhanceAmount);
        data[i + 2] = Math.min(255, b * enhanceAmount);
      }
    }
  };

  const applyHDRProcessing = (data: Uint8ClampedArray, width: number, height: number, intensity: number) => {
    // Tone mapping for HDR effect
    const factor = intensity / 100;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i] / 255;
      let g = data[i + 1] / 255;
      let b = data[i + 2] / 255;

      // Apply tone mapping
      r = r / (1 + r * factor);
      g = g / (1 + g * factor);
      b = b / (1 + b * factor);

      // Enhance local contrast
      const localContrast = 1 + factor * 0.3;
      r = Math.pow(r, 1 / localContrast);
      g = Math.pow(g, 1 / localContrast);
      b = Math.pow(b, 1 / localContrast);

      data[i] = Math.min(255, r * 255);
      data[i + 1] = Math.min(255, g * 255);
      data[i + 2] = Math.min(255, b * 255);
    }
  };

  const applyClarityAdjustment = (data: Uint8ClampedArray, width: number, height: number, intensity: number) => {
    // Unsharp masking for clarity
    const newData = new Uint8ClampedArray(data);
    const radius = 2;
    const amount = intensity / 50;

    for (let y = radius; y < height - radius; y++) {
      for (let x = radius; x < width - radius; x++) {
        const idx = (y * width + x) * 4;

        // Calculate gaussian blur for this pixel
        let sumR = 0, sumG = 0, sumB = 0, weightSum = 0;

        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const weight = Math.exp(-(dx * dx + dy * dy) / (2 * radius * radius));
            const ni = ((y + dy) * width + (x + dx)) * 4;
            sumR += data[ni] * weight;
            sumG += data[ni + 1] * weight;
            sumB += data[ni + 2] * weight;
            weightSum += weight;
          }
        }

        const blurR = sumR / weightSum;
        const blurG = sumG / weightSum;
        const blurB = sumB / weightSum;

        // Apply unsharp mask
        newData[idx] = Math.min(255, Math.max(0, data[idx] + amount * (data[idx] - blurR)));
        newData[idx + 1] = Math.min(255, Math.max(0, data[idx + 1] + amount * (data[idx + 1] - blurG)));
        newData[idx + 2] = Math.min(255, Math.max(0, data[idx + 2] + amount * (data[idx + 2] - blurB)));
      }
    }

    data.set(newData);
  };

  const applyStructureEnhancement = (data: Uint8ClampedArray, width: number, height: number, intensity: number) => {
    // High-pass filter for structure enhancement
    const newData = new Uint8ClampedArray(data);
    const factor = intensity / 100;

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;

        // Calculate high-pass filter
        const center = 8;
        const neighbors = -1;

        for (let c = 0; c < 3; c++) {
          const value =
            data[idx + c] * center +
            data[((y - 1) * width + (x - 1)) * 4 + c] * neighbors +
            data[((y - 1) * width + x) * 4 + c] * neighbors +
            data[((y - 1) * width + (x + 1)) * 4 + c] * neighbors +
            data[(y * width + (x - 1)) * 4 + c] * neighbors +
            data[(y * width + (x + 1)) * 4 + c] * neighbors +
            data[((y + 1) * width + (x - 1)) * 4 + c] * neighbors +
            data[((y + 1) * width + x) * 4 + c] * neighbors +
            data[((y + 1) * width + (x + 1)) * 4 + c] * neighbors;

          const enhanced = data[idx + c] + value * factor * 0.1;
          newData[idx + c] = Math.min(255, Math.max(0, enhanced));
        }
      }
    }

    data.set(newData);
  };

  const applyDehazeEffect = (data: Uint8ClampedArray, width: number, height: number, intensity: number) => {
    const factor = intensity / 100;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      // Increase contrast and saturation to dehaze
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      const contrastFactor = 1 + factor * 0.5;

      r = gray + contrastFactor * (r - gray);
      g = gray + contrastFactor * (g - gray);
      b = gray + contrastFactor * (b - gray);

      // Increase saturation
      const satFactor = 1 + factor * 0.3;
      r = gray + satFactor * (r - gray);
      g = gray + satFactor * (g - gray);
      b = gray + satFactor * (b - gray);

      data[i] = Math.min(255, Math.max(0, r));
      data[i + 1] = Math.min(255, Math.max(0, g));
      data[i + 2] = Math.min(255, Math.max(0, b));
    }
  };

  const applyOrtonEffect = (data: Uint8ClampedArray, width: number, height: number, intensity: number) => {
    // Orton effect: dreamy, glowing look
    const factor = intensity / 100;
    const newData = new Uint8ClampedArray(data);

    // First pass: increase brightness and reduce contrast
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      // Lighten
      r = r + (255 - r) * factor * 0.3;
      g = g + (255 - g) * factor * 0.3;
      b = b + (255 - b) * factor * 0.3;

      // Reduce contrast
      const mid = 128;
      r = mid + (r - mid) * (1 - factor * 0.2);
      g = mid + (g - mid) * (1 - factor * 0.2);
      b = mid + (b - mid) * (1 - factor * 0.2);

      newData[i] = Math.min(255, Math.max(0, r));
      newData[i + 1] = Math.min(255, Math.max(0, g));
      newData[i + 2] = Math.min(255, Math.max(0, b));
    }

    data.set(newData);
  };

  const applyColorGrading = (data: Uint8ClampedArray, width: number, height: number, grading: any) => {
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      const shadowWeight = Math.max(0, 1 - luminance / 85);
      const highlightWeight = Math.max(0, (luminance - 170) / 85);
      const midtoneWeight = 1 - shadowWeight - highlightWeight;

      // Apply color grading
      r += grading.shadows.r * shadowWeight + grading.midtones.r * midtoneWeight + grading.highlights.r * highlightWeight;
      g += grading.shadows.g * shadowWeight + grading.midtones.g * midtoneWeight + grading.highlights.g * highlightWeight;
      b += grading.shadows.b * shadowWeight + grading.midtones.b * midtoneWeight + grading.highlights.b * highlightWeight;

      data[i] = Math.min(255, Math.max(0, r));
      data[i + 1] = Math.min(255, Math.max(0, g));
      data[i + 2] = Math.min(255, Math.max(0, b));
    }
  };

  const applyLensCorrections = (data: Uint8ClampedArray, width: number, height: number, corrections: any) => {
    if (corrections.vignetting !== 0) {
      const centerX = width / 2;
      const centerY = height / 2;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const vignetteStrength = corrections.vignetting / 100;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          const vignetteFactor = 1 - (distance / maxDistance) * vignetteStrength;

          data[idx] *= Math.max(0.1, vignetteFactor);
          data[idx + 1] *= Math.max(0.1, vignetteFactor);
          data[idx + 2] *= Math.max(0.1, vignetteFactor);
        }
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSelectedImage(result);
      setOriginalImage(result);
      resetAllSettings();
    };
    reader.readAsDataURL(file);
  };

  const resetAllSettings = () => {
    setSelectedFilter("original");
    setRotation(0);
    setBrightness(0);
    setContrast(0);
    setSaturation(0);
    setHue(0);
    setExposure(0);
    setShadows(0);
    setHighlights(0);
    setVibrance(0);
    setWarmth(0);
    setSharpness(0);
    setVignette(0);
    setBlur(0);
    setNoise(0);
    setPixelate(0);
    setEmboss(0);
    setEdgeDetection(false);
    setBackgroundRemoved(false);
    setInvertColors(false);
    setFlipHorizontal(false);
    setFlipVertical(false);
    setGamma(1);
    setShadows2(0);
    setMidtones(0);
    setHighlights2(0);
    setRedChannel(100);
    setGreenChannel(100);
    setBlueChannel(100);
    setSepia(0);
    setPosterize(256);
    setThreshold(128);
    setSolarize(false);
    setMosaic(0);
    setOil(0);
    setSketch(false);
    setCrossProcess(false);
    setSplitToning(false);
    setZoom(100);

    // Reset professional tools
    setBgRemovalMode('smart');
    setBgTolerance(50);
    setChromaKeyColor('#00ff00');
    setSkinSmoothing(0);
    setTeethWhitening(0);
    setEyeEnhancement(0);
    setHdr(0);
    setClarity(0);
    setStructure(0);
    setDehaze(0);
    setOrtonEffect(0);
    setColorGrading({
      shadows: { r: 0, g: 0, b: 0, hex: '#808080' },
      midtones: { r: 0, g: 0, b: 0, hex: '#808080' },
      highlights: { r: 0, g: 0, b: 0, hex: '#808080' }
    });
    setLensCorrection({
      vignetting: 0,
      distortion: 0,
      chromatic: 0
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleFlipHorizontal = () => {
    setFlipHorizontal(prev => !prev);
  };

  const handleFlipVertical = () => {
    setFlipVertical(prev => !prev);
  };

  const resetAdjustments = () => {
    resetAllSettings();
  };

  const resetToOriginal = () => {
    if (originalImage) {
      setSelectedImage(originalImage);
      resetAllSettings();
    }
  };

  const toggleBackgroundRemoval = () => {
    setBackgroundRemoved(prev => !prev);
  };

  const toggleEdgeDetection = () => {
    setEdgeDetection(prev => !prev);
  };

  const toggleInvertColors = () => {
    setInvertColors(prev => !prev);
  };

  const toggleSketch = () => {
    setSketch(prev => !prev);
  };

  const toggleSolarize = () => {
    setSolarize(prev => !prev);
  };

  const toggleCrossProcess = () => {
    setCrossProcess(prev => !prev);
  };

  const duplicateImage = () => {
    if (!selectedImage) return;
    const link = document.createElement("a");
    link.download = `copy-${Date.now()}.png`;
    link.href = selectedImage;
    link.click();
    toast({
      title: "Image copied!",
      description: "Original image has been downloaded",
    });
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let mimeType = "image/png";
    let quality = 1.0;

    switch (downloadFormat) {
      case "jpeg":
        mimeType = "image/jpeg";
        quality = 0.9;
        break;
      case "webp":
        mimeType = "image/webp";
        quality = 0.9;
        break;
      default:
        mimeType = "image/png";
    }

    const link = document.createElement("a");
    link.download = `edited-photo-${Date.now()}.${downloadFormat}`;
    link.href = canvas.toDataURL(mimeType, quality);
    link.click();

    toast({
      title: "Photo downloaded!",
      description: `Your edited photo has been saved as ${downloadFormat.toUpperCase()}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-home">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-photo-accent/20 flex items-center justify-center">
                <Sliders className="h-5 w-5 text-photo-accent" />
              </div>
              Photo Studio
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {selectedImage && (
              <Button
                onClick={resetToOriginal}
                variant="outline"
                size="sm"
                data-testid="button-reset-original"
              >
                <Undo className="h-4 w-4 mr-2" />
                Reset to Original
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* Left side - Preview */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Preview</h2>
                {selectedImage && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Zoom: {zoom}%
                    </span>
                    <Slider
                      value={[zoom]}
                      onValueChange={(value) => setZoom(value[0])}
                      min={25}
                      max={200}
                      step={25}
                      className="w-24"
                    />
                  </div>
                )}
              </div>
              <div
                className={`relative aspect-video rounded-lg border-2 border-dashed ${isDragging ? "border-photo-accent bg-photo-accent/10" : "border-border"
                  } flex items-center justify-center overflow-hidden`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                data-testid="dropzone-photo"
              >
                {!selectedImage ? (
                  <div className="text-center p-8">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-2">Drag & drop your photo here</p>
                    <p className="text-sm text-muted-foreground mb-4">or</p>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-photo-accent hover:bg-photo-accent text-photo-accent-foreground"
                      data-testid="button-browse-photo"
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Browse Files
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      data-testid="input-file-photo"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <canvas
                      ref={canvasRef}
                      className="max-w-full max-h-full object-contain"
                      style={{ transform: `scale(${zoom / 100})` }}
                    />
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right side - Tools */}
          <div className="space-y-6">
            {selectedImage ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card className="p-6">
                  <Tabs defaultValue="filters" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="filters" className="text-xs">
                        <Palette className="h-4 w-4 mr-1" />
                        Filters
                      </TabsTrigger>
                      <TabsTrigger value="adjust" className="text-xs">
                        <Sliders className="h-4 w-4 mr-1" />
                        Adjust
                      </TabsTrigger>
                      <TabsTrigger value="effects" className="text-xs">
                        <Wand2 className="h-4 w-4 mr-1" />
                        Effects
                      </TabsTrigger>
                      <TabsTrigger value="professional" className="text-xs">
                        <Camera className="h-4 w-4 mr-1" />
                        Pro
                      </TabsTrigger>
                      <TabsTrigger value="tools" className="text-xs">
                        <Settings className="h-4 w-4 mr-1" />
                        Tools
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="filters" className="space-y-4 mt-4">
                      <h3 className="font-semibold">Filters</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {filters.map((filter) => (
                          <Button
                            key={filter.value}
                            variant={selectedFilter === filter.value ? "default" : "outline"}
                            onClick={() => setSelectedFilter(filter.value)}
                            className={`text-xs ${selectedFilter === filter.value ? "bg-photo-accent hover:bg-photo-accent text-photo-accent-foreground" : ""}`}
                            data-testid={`button-filter-${filter.value}`}
                          >
                            {filter.name}
                          </Button>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="adjust" className="space-y-4 mt-4">
                      <h3 className="font-semibold">Basic Adjustments</h3>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Button
                            onClick={handleRotate}
                            variant="outline"
                            size="sm"
                            data-testid="button-rotate"
                          >
                            <RotateCw className="h-4 w-4 mr-1" />
                            Rotate
                          </Button>
                          <Button
                            onClick={handleFlipHorizontal}
                            variant="outline"
                            size="sm"
                            data-testid="button-flip-horizontal"
                          >
                            <FlipHorizontal className="h-4 w-4 mr-1" />
                            Flip H
                          </Button>
                          <Button
                            onClick={handleFlipVertical}
                            variant="outline"
                            size="sm"
                            data-testid="button-flip-vertical"
                          >
                            <FlipVertical className="h-4 w-4 mr-1" />
                            Flip V
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Sun className="h-4 w-4" />
                              Brightness: {brightness > 0 ? '+' : ''}{brightness}
                            </label>
                            <Slider
                              value={[brightness]}
                              onValueChange={(value) => setBrightness(value[0])}
                              min={-100}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Contrast className="h-4 w-4" />
                              Contrast: {contrast > 0 ? '+' : ''}{contrast}
                            </label>
                            <Slider
                              value={[contrast]}
                              onValueChange={(value) => setContrast(value[0])}
                              min={-100}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Palette className="h-4 w-4" />
                              Saturation: {saturation > 0 ? '+' : ''}{saturation}
                            </label>
                            <Slider
                              value={[saturation]}
                              onValueChange={(value) => setSaturation(value[0])}
                              min={-100}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Zap className="h-4 w-4" />
                              Exposure: {exposure > 0 ? '+' : ''}{exposure}
                            </label>
                            <Slider
                              value={[exposure]}
                              onValueChange={(value) => setExposure(value[0])}
                              min={-100}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Sparkles className="h-4 w-4" />
                              Vibrance: {vibrance > 0 ? '+' : ''}{vibrance}
                            </label>
                            <Slider
                              value={[vibrance]}
                              onValueChange={(value) => setVibrance(value[0])}
                              min={-100}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Droplets className="h-4 w-4" />
                              Warmth: {warmth > 0 ? '+' : ''}{warmth}
                            </label>
                            <Slider
                              value={[warmth]}
                              onValueChange={(value) => setWarmth(value[0])}
                              min={-100}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              Gamma: {gamma.toFixed(2)}
                            </label>
                            <Slider
                              value={[gamma]}
                              onValueChange={(value) => setGamma(value[0])}
                              min={0.1}
                              max={3}
                              step={0.1}
                              className="w-full"
                            />
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-3">Color Channels</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium mb-2 block text-red-500">
                                Red: {redChannel}%
                              </label>
                              <Slider
                                value={[redChannel]}
                                onValueChange={(value) => setRedChannel(value[0])}
                                min={0}
                                max={200}
                                step={1}
                                className="w-full"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block text-green-500">
                                Green: {greenChannel}%
                              </label>
                              <Slider
                                value={[greenChannel]}
                                onValueChange={(value) => setGreenChannel(value[0])}
                                min={0}
                                max={200}
                                step={1}
                                className="w-full"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block text-blue-500">
                                Blue: {blueChannel}%
                              </label>
                              <Slider
                                value={[blueChannel]}
                                onValueChange={(value) => setBlueChannel(value[0])}
                                min={0}
                                max={200}
                                step={1}
                                className="w-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="effects" className="space-y-4 mt-4">
                      <h3 className="font-semibold">Effects & Filters</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            onClick={toggleSketch}
                            variant={sketch ? "default" : "outline"}
                            size="sm"
                            className={sketch ? "bg-blue-500 hover:bg-blue-600" : ""}
                            data-testid="button-sketch"
                          >
                            <Brush className="h-4 w-4 mr-1" />
                            {sketch ? "Normal" : "Sketch"}
                          </Button>

                          <Button
                            onClick={toggleSolarize}
                            variant={solarize ? "default" : "outline"}
                            size="sm"
                            className={solarize ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                            data-testid="button-solarize"
                          >
                            <Sun className="h-4 w-4 mr-1" />
                            {solarize ? "Normal" : "Solarize"}
                          </Button>

                          <Button
                            onClick={toggleCrossProcess}
                            variant={crossProcess ? "default" : "outline"}
                            size="sm"
                            className={crossProcess ? "bg-purple-500 hover:bg-purple-600" : ""}
                            data-testid="button-cross-process"
                          >
                            <Layers className="h-4 w-4 mr-1" />
                            {crossProcess ? "Normal" : "X-Process"}
                          </Button>

                          <Button
                            onClick={toggleEdgeDetection}
                            variant={edgeDetection ? "default" : "outline"}
                            size="sm"
                            className={edgeDetection ? "bg-green-500 hover:bg-green-600" : ""}
                            data-testid="button-edge-detect"
                          >
                            <Focus className="h-4 w-4 mr-1" />
                            {edgeDetection ? "Normal" : "Edges"}
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Circle className="h-4 w-4" />
                              Blur: {blur}
                            </label>
                            <Slider
                              value={[blur]}
                              onValueChange={(value) => setBlur(value[0])}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Wand2 className="h-4 w-4" />
                              Noise: {noise}
                            </label>
                            <Slider
                              value={[noise]}
                              onValueChange={(value) => setNoise(value[0])}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 flex items-center gap-2">
                              <PaintBucket className="h-4 w-4" />
                              Pixelate: {pixelate}
                            </label>
                            <Slider
                              value={[pixelate]}
                              onValueChange={(value) => setPixelate(value[0])}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Layers className="h-4 w-4" />
                              Emboss: {emboss}
                            </label>
                            <Slider
                              value={[emboss]}
                              onValueChange={(value) => setEmboss(value[0])}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Palette className="h-4 w-4" />
                              Sepia: {sepia}%
                            </label>
                            <Slider
                              value={[sepia]}
                              onValueChange={(value) => setSepia(value[0])}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Square className="h-4 w-4" />
                              Posterize: {posterize} levels
                            </label>
                            <Slider
                              value={[posterize]}
                              onValueChange={(value) => setPosterize(value[0])}
                              min={2}
                              max={256}
                              step={1}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Circle className="h-4 w-4" />
                              Mosaic: {mosaic}
                            </label>
                            <Slider
                              value={[mosaic]}
                              onValueChange={(value) => setMosaic(value[0])}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="tools" className="space-y-4 mt-4">
                      <h3 className="font-semibold">Advanced Tools</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-2">
                          <Button
                            onClick={toggleBackgroundRemoval}
                            variant={backgroundRemoved ? "default" : "outline"}
                            size="sm"
                            className={backgroundRemoved ? "bg-red-500 hover:bg-red-600" : ""}
                            data-testid="button-bg-remove"
                          >
                            <Scissors className="h-4 w-4 mr-2" />
                            {backgroundRemoved ? "Restore Background" : "Remove Background"}
                          </Button>

                          <Button
                            onClick={toggleInvertColors}
                            variant={invertColors ? "default" : "outline"}
                            size="sm"
                            className={invertColors ? "bg-purple-500 hover:bg-purple-600" : ""}
                            data-testid="button-invert"
                          >
                            <Layers className="h-4 w-4 mr-2" />
                            {invertColors ? "Normal Colors" : "Invert Colors"}
                          </Button>

                          <Button
                            onClick={duplicateImage}
                            variant="outline"
                            size="sm"
                            data-testid="button-duplicate"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Download Original
                          </Button>

                          <Button
                            onClick={resetAdjustments}
                            variant="outline"
                            size="sm"
                            data-testid="button-reset"
                          >
                            <Undo className="h-4 w-4 mr-2" />
                            Reset All Settings
                          </Button>
                        </div>

                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-3">Export Settings</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                Download Format
                              </label>
                              <Select value={downloadFormat} onValueChange={setDownloadFormat}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="png">PNG (Lossless)</SelectItem>
                                  <SelectItem value="jpeg">JPEG (Compressed)</SelectItem>
                                  <SelectItem value="webp">WebP (Modern)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <Button
                              onClick={handleDownload}
                              className="w-full bg-photo-accent hover:bg-photo-accent text-photo-accent-foreground"
                              data-testid="button-download"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download as {downloadFormat.toUpperCase()}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="professional" className="space-y-4 mt-4">
                      <h3 className="font-semibold">Professional Tools</h3>
                      <div className="space-y-4">
                        {/* Background Removal */}
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-3">Advanced Background Removal</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                Removal Mode
                              </label>
                              <Select value={bgRemovalMode} onValueChange={(value: 'corner' | 'edge' | 'smart' | 'chroma') => setBgRemovalMode(value)}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="corner">Corner-based</SelectItem>
                                  <SelectItem value="edge">Edge Detection</SelectItem>
                                  <SelectItem value="smart">Smart Detection</SelectItem>
                                  <SelectItem value="chroma">Chroma Key</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                Tolerance: {bgTolerance}
                              </label>
                              <Slider
                                value={[bgTolerance]}
                                onValueChange={(value) => setBgTolerance(value[0])}
                                max={100}
                                min={1}
                                step={1}
                                className="w-full"
                              />
                            </div>

                            {bgRemovalMode === 'chroma' && (
                              <div>
                                <label className="text-sm font-medium mb-2 block">
                                  Chroma Key Color
                                </label>
                                <input
                                  type="color"
                                  value={chromaKeyColor}
                                  onChange={(e) => setChromaKeyColor(e.target.value)}
                                  className="w-full h-8 rounded border"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Portrait Enhancement */}
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-3">Portrait Enhancement</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                Skin Smoothing: {skinSmoothing}
                              </label>
                              <Slider
                                value={[skinSmoothing]}
                                onValueChange={(value) => setSkinSmoothing(value[0])}
                                max={100}
                                min={0}
                                step={1}
                                className="w-full"
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                Teeth Whitening: {teethWhitening}
                              </label>
                              <Slider
                                value={[teethWhitening]}
                                onValueChange={(value) => setTeethWhitening(value[0])}
                                max={100}
                                min={0}
                                step={1}
                                className="w-full"
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                Eye Enhancement: {eyeEnhancement}
                              </label>
                              <Slider
                                value={[eyeEnhancement]}
                                onValueChange={(value) => setEyeEnhancement(value[0])}
                                max={100}
                                min={0}
                                step={1}
                                className="w-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* HDR & Clarity */}
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-3">HDR & Image Quality</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                HDR Processing: {hdr}
                              </label>
                              <Slider
                                value={[hdr]}
                                onValueChange={(value) => setHdr(value[0])}
                                max={100}
                                min={0}
                                step={1}
                                className="w-full"
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                Clarity: {clarity}
                              </label>
                              <Slider
                                value={[clarity]}
                                onValueChange={(value) => setClarity(value[0])}
                                max={100}
                                min={0}
                                step={1}
                                className="w-full"
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                Structure: {structure}
                              </label>
                              <Slider
                                value={[structure]}
                                onValueChange={(value) => setStructure(value[0])}
                                max={100}
                                min={0}
                                step={1}
                                className="w-full"
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                Dehaze: {dehaze}
                              </label>
                              <Slider
                                value={[dehaze]}
                                onValueChange={(value) => setDehaze(value[0])}
                                max={100}
                                min={0}
                                step={1}
                                className="w-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Creative Effects */}
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-3">Creative Effects</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                Orton Effect: {ortonEffect}
                              </label>
                              <Slider
                                value={[ortonEffect]}
                                onValueChange={(value) => setOrtonEffect(value[0])}
                                max={100}
                                min={0}
                                step={1}
                                className="w-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Color Grading */}
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-3">Color Grading</h4>
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <label className="text-sm font-medium mb-1 block">Shadows</label>
                                <input
                                  type="color"
                                  value={colorGrading.shadows.hex}
                                  onChange={(e) => {
                                    const hex = e.target.value;
                                    const r = parseInt(hex.substr(1, 2), 16) - 128;
                                    const g = parseInt(hex.substr(3, 2), 16) - 128;
                                    const b = parseInt(hex.substr(5, 2), 16) - 128;
                                    setColorGrading(prev => ({
                                      ...prev,
                                      shadows: { r, g, b, hex }
                                    }));
                                  }}
                                  className="w-full h-8 rounded border"
                                />
                              </div>

                              <div>
                                <label className="text-sm font-medium mb-1 block">Midtones</label>
                                <input
                                  type="color"
                                  value={colorGrading.midtones.hex}
                                  onChange={(e) => {
                                    const hex = e.target.value;
                                    const r = parseInt(hex.substr(1, 2), 16) - 128;
                                    const g = parseInt(hex.substr(3, 2), 16) - 128;
                                    const b = parseInt(hex.substr(5, 2), 16) - 128;
                                    setColorGrading(prev => ({
                                      ...prev,
                                      midtones: { r, g, b, hex }
                                    }));
                                  }}
                                  className="w-full h-8 rounded border"
                                />
                              </div>

                              <div>
                                <label className="text-sm font-medium mb-1 block">Highlights</label>
                                <input
                                  type="color"
                                  value={colorGrading.highlights.hex}
                                  onChange={(e) => {
                                    const hex = e.target.value;
                                    const r = parseInt(hex.substr(1, 2), 16) - 128;
                                    const g = parseInt(hex.substr(3, 2), 16) - 128;
                                    const b = parseInt(hex.substr(5, 2), 16) - 128;
                                    setColorGrading(prev => ({
                                      ...prev,
                                      highlights: { r, g, b, hex }
                                    }));
                                  }}
                                  className="w-full h-8 rounded border"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Lens Corrections */}
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-3">Lens Corrections</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                Vignetting: {lensCorrection.vignetting}
                              </label>
                              <Slider
                                value={[lensCorrection.vignetting]}
                                onValueChange={(value) => setLensCorrection(prev => ({
                                  ...prev,
                                  vignetting: value[0]
                                }))}
                                max={100}
                                min={-100}
                                step={1}
                                className="w-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </motion.div>
            ) : (
              <Card className="p-6">
                <div className="text-center py-8">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">No Image Selected</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload an image to start editing with our powerful tools
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}