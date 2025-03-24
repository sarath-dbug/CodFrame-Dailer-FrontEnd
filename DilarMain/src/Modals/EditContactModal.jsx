import React from 'react';
import { X } from 'lucide-react';

const EditContactModal = ({ isOpen, onClose, contact, onSave }) => {
  const [editedContact, setEditedContact] = React.useState(contact);

  if (!isOpen || !contact) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Edit Contact</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Form fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={editedContact.name}
              onChange={(e) => setEditedContact({...editedContact, name: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          {/* Add other form fields similarly */}
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={() => onSave(editedContact)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContactModal;