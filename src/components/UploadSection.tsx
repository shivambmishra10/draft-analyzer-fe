import { useState } from "react";
import { UploadCloud } from "lucide-react"; // Assuming you are using lucide-react icons

export default function UploadSection() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      simulateUpload(file);
    }
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setExtractedText(
            "This is a preview of your uploaded document.\n\nScroll through the text here. It will later show real extracted content."
          );
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 mb-8 transition-all duration-500 ${uploadedFile ? "flex gap-8" : "flex flex-col items-center"}`}>
      
      {/* Upload Box */}
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 w-full md:w-1/2">
        <UploadCloud className="w-10 h-10 text-blue-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Document Summarizer</h2>
        <p className="text-gray-500 text-center mb-4">
          Upload your policy or document files here to generate a smart summary instantly.
        </p>

        {/* Browse Button */}
        <label className="border border-dashed border-gray-400 rounded-lg py-6 px-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-gray-50">
          <UploadCloud className="w-8 h-8 text-gray-500 mb-2" />
          <span className="text-gray-500">Click to browse a file</span>
          <input type="file" className="hidden" onChange={handleFileUpload} />
        </label>

        {/* Upload button */}
        <button className="bg-blue-600 text-white px-6 py-2 rounded mt-6 hover:bg-blue-700">
          Upload
        </button>

        {/* Progress Bar */}
        {isUploading && (
          <div className="w-full mt-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">{uploadProgress}%</p>
          </div>
        )}
      </div>

      {/* Preview section */}
      {uploadedFile && !isUploading && (
        <div className="flex-1 border border-gray-300 rounded-lg p-4 overflow-y-auto max-h-[400px] bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Preview Your Uploaded Document</h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{extractedText}</p>
        </div>
      )}
    </div>
  );
}
