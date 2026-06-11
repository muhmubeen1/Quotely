import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, X, Image as ImageIcon, Scan } from 'lucide-react';
import { GlassCard } from '@/components/ui/custom/GlassCard';
import { NeonButton } from '@/components/ui/custom/NeonButton';

export function ScanPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedText, setScannedText] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setScannedText(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!uploadedImage) return;
    setIsScanning(true);
    // Simulate OCR scanning
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setScannedText(
      '"The only way to do great work is to love what you do. If you haven\'t found it yet, keep looking. Don\'t settle."'
    );
    setIsScanning(false);
  };

  const clearImage = () => {
    setUploadedImage(null);
    setScannedText(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-1">OCR Scan</h1>
        <p className="text-white/60">Extract text from images of book pages</p>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {!uploadedImage ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              isDragging
                ? 'border-neon-blue bg-neon-blue/10'
                : 'border-white/20 hover:border-white/40'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-neon-blue" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Drop an image here, or click to browse
            </h3>
            <p className="text-white/50 text-sm">
              Supports JPG, PNG, and WebP up to 10MB
            </p>
          </div>
        ) : (
          <GlassCard className="relative">
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Preview */}
              <div>
                <h3 className="text-sm font-medium text-white/50 mb-3">Preview</h3>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-dark-surface">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Result */}
              <div>
                <h3 className="text-sm font-medium text-white/50 mb-3">Extracted Text</h3>
                <div className="aspect-[4/3] rounded-xl bg-white/5 p-4 overflow-auto">
                  {scannedText ? (
                    <p className="text-white/80 leading-relaxed">{scannedText}</p>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-white/40 text-center">
                        {isScanning ? 'Scanning...' : 'Click scan to extract text'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <NeonButton
                variant="primary"
                className="flex-1"
                onClick={handleScan}
                loading={isScanning}
                disabled={isScanning}
              >
                <Scan className="w-5 h-5" />
                {isScanning ? 'Scanning...' : 'Scan Text'}
              </NeonButton>
              {scannedText && (
                <NeonButton variant="outline">
                  <Camera className="w-5 h-5" />
                  Save Quote
                </NeonButton>
              )}
            </div>
          </GlassCard>
        )}
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <GlassCard>
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-neon-blue" />
            Tips for best results
          </h3>
          <ul className="space-y-2 text-white/60 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-neon-blue">•</span>
              Ensure good lighting and avoid shadows on the page
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neon-blue">•</span>
              Keep the camera parallel to the page surface
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neon-blue">•</span>
              Make sure the text is in focus and clearly visible
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neon-blue">•</span>
              Crop the image to include only the text you want to extract
            </li>
          </ul>
        </GlassCard>
      </motion.div>
    </div>
  );
}
