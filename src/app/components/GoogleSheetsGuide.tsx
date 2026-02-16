import { useState } from "react";
import { FileSpreadsheet, Copy, Check } from "lucide-react";
import { motion } from "motion/react";

export function GoogleSheetsGuide() {
  const [copied, setCopied] = useState(false);

  const sheetSchema = `product,brand,blend/style,Description,links,main_image,image2,image3,image4
ROUND NECK,BOLDFIT,P-100%,Product description here,https://example.com,https://image1.jpg,https://image2.jpg,https://image3.jpg,https://image4.jpg`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sheetSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-green-500/20 rounded-xl">
          <FileSpreadsheet className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Connect to Google Sheets</h2>
          <p className="text-sm text-white/60">Sync your product catalog</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2 text-white">Step 1: Create Your Sheet</h3>
          <p className="text-sm text-white/70 mb-2">
            Create a new Google Sheet with these exact column headers:
          </p>
          <div className="bg-black/30 rounded-lg p-3 relative border border-white/10">
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap text-white/90">
              {sheetSchema}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-white/70" />
              )}
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-white">Step 2: Enable Google Sheets API</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-white/70">
            <li>Go to Google Cloud Console</li>
            <li>Create a new project or select existing</li>
            <li>Enable Google Sheets API</li>
            <li>Create credentials (API key)</li>
          </ol>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-white">Step 3: Configure</h3>
          <p className="text-sm text-white/70">
            Update <code className="bg-black/30 px-1 rounded text-purple-300">googleSheetsHelper.ts</code> with your Sheet ID and API Key.
          </p>
        </div>

        <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
          <h4 className="font-semibold text-purple-300 mb-1">Column Guide:</h4>
          <ul className="text-sm text-white/80 space-y-1">
            <li>• <span className="text-purple-300">product</span>: Category (ROUND NECK, HOODIE, etc.)</li>
            <li>• <span className="text-purple-300">brand</span>: Brand name</li>
            <li>• <span className="text-purple-300">blend/style</span>: Material blend</li>
            <li>• <span className="text-purple-300">Description</span>: Product description</li>
            <li>• <span className="text-purple-300">links</span>: Product URL</li>
            <li>• <span className="text-purple-300">main_image</span>: Main product image URL</li>
            <li>• <span className="text-purple-300">image2, image3, image4</span>: Additional images</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}