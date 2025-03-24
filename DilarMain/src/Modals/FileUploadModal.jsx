import React from "react";
import { FileText, X } from "lucide-react";

const FileUploadModal = ({
  isOpen,
  onClose,
  filePreview,
  onFileUpload,
  onProcessFile,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Upload Contacts</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">
            Upload a CSV or PDF file containing contact information.
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {!filePreview ? (
              <>
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-blue-600 hover:text-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".csv,.pdf"
                      onChange={onFileUpload}
                    />
                  </label>
                  <p className="text-xs text-gray-500">CSV or PDF up to 10MB</p>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-blue-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium">{filePreview.name}</p>
                    <p className="text-xs text-gray-500">{filePreview.size}</p>
                  </div>
                </div>
                <button
                  onClick={() => onFileUpload(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onProcessFile}
            disabled={!filePreview}
            className={`px-4 py-2 rounded-lg ${
              filePreview
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
