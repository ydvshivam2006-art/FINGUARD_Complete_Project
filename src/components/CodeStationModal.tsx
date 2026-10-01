import React from 'react';

interface CodeStationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const CodeStationModal: React.FC<CodeStationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-lg w-full text-white shadow-xl">
        <h3 className="text-xl font-bold mb-2">Code Station</h3>
        <p className="text-slate-300 text-sm mb-4">FinGuard Architecture & Documentation Module</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CodeStationModal;