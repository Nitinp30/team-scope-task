import { useQuery } from "@apollo/client";
import { Briefcase, Calendar, Edit, Mail, MapPin, MoreVertical, Phone, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { GET_EMPLOYEE } from "../graphql/queries";

// Employee Detail Tile Component
const EmployeeDetailTile = ({ employee, onClose, onSave, onDelete, currentEmployee }) => {

  console.log(employee)
  const [isEditing, setIsEditing] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(employee);
  const { data } = useQuery(GET_EMPLOYEE, {
    variables: { id: String(employee.id) },
  });

  const handleEdit = () => {
    setIsEditing(true);
    setIsActionsOpen(false);
  };

  const handleSave = () => {
    onSave(editedEmployee);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedEmployee(employee);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(employee.id);
    setIsActionsOpen(false);
  };

  const handleInputChange = (field, value) => {
    setEditedEmployee(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
              {data?.getEmployee?.avatar}
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedEmployee.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-2xl font-bold bg-transparent border-b-2 border-white border-opacity-50 focus:outline-none focus:border-opacity-100 text-white placeholder-white placeholder-opacity-70"
                />
              ) : (
                <h2 className="text-2xl font-bold">{data?.getEmployee?.name}</h2>
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={editedEmployee.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="text-lg bg-transparent border-b border-white border-opacity-50 focus:outline-none focus:border-opacity-100 text-white placeholder-white placeholder-opacity-70 mt-1"
                />
              ) : (
                <p className="text-lg opacity-90">{data?.getEmployee?.position}</p>
              )}
            </div>
          </div>

          {/* Actions Menu */}
          <div className="absolute top-4 right-12">
            {currentEmployee === 'admin' &&
              <button
                onClick={() => setIsActionsOpen(!isActionsOpen)}
                className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
            }
            {isActionsOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                <button
                  onClick={handleEdit}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Edit className="h-4 w-4 mr-3" />
                  Edit Employee
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4 mr-3" />
                  Delete Employee
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Contact Information</h3>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="email"
                    value={editedEmployee.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <span className="text-gray-600">{data?.getEmployee?.email}</span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedEmployee.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <span className="text-gray-600">{data?.getEmployee?.phone}</span>
                )}
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                {isEditing ? (
                  <textarea
                    value={editedEmployee.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="2"
                  />
                ) : (
                  <span className="text-gray-600">{data?.getEmployee?.address}</span>
                )}
              </div>
            </div>

            {/* Work Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Work Information</h3>

              <div className="flex items-center space-x-3">
                <Briefcase className="h-5 w-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="text"
                    value={editedEmployee.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <span className="text-gray-600">{data?.getEmployee?.department}</span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="date"
                    value={editedEmployee.joinDate}
                    onChange={(e) => handleInputChange('joinDate', e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <span className="text-gray-600">Joined {new Date(data?.getEmployee?.joinDate).toLocaleDateString()}</span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-gray-400">💰</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedEmployee.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <span className="text-gray-600">{data?.getEmployee?.salary}</span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-gray-400">📊</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${data?.getEmployee?.status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                  }`}>
                  {data?.getEmployee?.status}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Close overlay when clicking outside */}
      {isActionsOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsActionsOpen(false)}
        />
      )}
    </div>
  );
};
export default EmployeeDetailTile