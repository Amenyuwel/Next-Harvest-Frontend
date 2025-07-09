import React, { useState } from "react";
import { Icon } from "@iconify/react";
import DropdownMenu from "./DropdownMenu";
import Modal from "./Modal";

const ClassCard = ({ classData, onFileUpload, onDeleteClass, onEditClass }) => {
  const { id, name } = classData;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(name);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDeleteClass(id);
    setShowDeleteModal(false);
  };

  const confirmEdit = () => {
    onEditClass(id, editName);
    setShowEditModal(false);
  };

  return (
    <>
      <div className="bg-[#F4FFB3] rounded-2xl p-4 min-h-[140px] flex flex-col relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-black flex items-center">
            {name}
          </span>
          <DropdownMenu onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full transition-colors hover:bg-black/5 rounded-xl">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => onFileUpload(id, Array.from(e.target.files))}
            />
            <div className="w-full h-[2px] bg-gray-300 my-3"></div>
            <Icon icon="material-symbols:cloud-upload" width="32" height="32" className="text-gray-400 mb-2" />
            <span className="text-sm text-gray-500 font-medium">Upload</span>
          </label>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Class"
      >
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "{name}"? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Class"
      >
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Class Name
          </label>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter class name"
          />
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setShowEditModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={confirmEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ClassCard;