import React, { useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";

const Agents = () => {
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: "Rohan Kumar",
      email: "rohan@email.com",
      role: "Senior Agent",
      assignedContacts: 100,
      status: "Active",
      lastActivity: "2024-02-15",
    },
    // Add more sample agents
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Junior Agent",
  });

  // Add/Edit Agent
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAgent) {
      // Update existing agent
      setAgents(
        agents.map((a) =>
          a.id === selectedAgent.id ? { ...formData, id: a.id } : a
        )
      );
    } else {
      // Add new agent
      setAgents([
        ...agents,
        { ...formData, id: Date.now(), assignedContacts: 0, status: "Active" },
      ]);
    }
    setShowAddModal(false);
    setFormData({ name: "", email: "", role: "Junior Agent" });
  };

  // Delete Agent
  const handleDelete = (id) => {
    setAgents(agents.filter((agent) => agent.id !== id));
  };

  // Assign Contacts
  const handleAssignContacts = (contactsCount) => {
    setAgents(
      agents.map((agent) =>
        agent.id === selectedAgent.id
          ? {
              ...agent,
              assignedContacts: agent.assignedContacts + contactsCount,
            }
          : agent
      )
    );
    setShowAssignModal(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <UserGroupIcon className="h-6 w-6 mr-2" />
          Agent Management
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Agent
        </button>
      </div>

      {/* Agents Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Assigned Contacts
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {agents.map((agent) => (
              <tr key={agent.id}>
                <td className="px-6 py-4 whitespace-nowrap">{agent.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {agent.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{agent.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      setSelectedAgent(agent);
                      setShowAssignModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {agent.assignedContacts}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      agent.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {agent.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedAgent(agent);
                      setFormData(agent);
                      setShowAddModal(true);
                    }}
                    className="px-3 py-1 border border-blue-500 text-blue-600 rounded-md cursor-pointer 
                 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-700 
                 transition-all duration-300 flex items-center focus:outline-none 
                 focus:ring-2 focus:ring-blue-200"
                  >
                    <i className="fas fa-edit text-sm mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(agent.id)}
                    className="px-3 py-1 border border-red-500 text-red-600 rounded-md cursor-pointer 
                 hover:bg-red-50 hover:border-red-600 hover:text-red-700 
                 transition-all duration-300 flex items-center focus:outline-none 
                 focus:ring-2 focus:ring-red-200"
                  >
                    <i className="fas fa-trash text-sm mr-2" />
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      // Implement call progress view
                    }}
                    className="px-3 py-1 border border-purple-500 text-purple-600 rounded-md cursor-pointer 
                 hover:bg-purple-50 hover:border-purple-600 hover:text-purple-700 
                 transition-all duration-300 flex items-center focus:outline-none 
                 focus:ring-2 focus:ring-purple-200"
                  >
                    <i className="fas fa-user-check text-sm mr-2" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Agent Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {selectedAgent ? "Edit Agent" : "Add New Agent"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  >
                    <option>Junior Agent</option>
                    <option>Senior Agent</option>
                    <option>Team Lead</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedAgent(null);
                  }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {selectedAgent ? "Update" : "Create"} Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Contacts Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Assign Contacts to {selectedAgent?.name}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Contacts
                </label>
                <input
                  type="number"
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue="10"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAssignContacts(10)} // Replace with actual input value
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Assign Contacts
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// API Integration Example
const handleAPIRequest = async (method, endpoint, data) => {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) throw new Error("Request failed");
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    // Handle error
  }
};

/* Example API Usage:
- Get agents: handleAPIRequest('GET', 'agents')
- Create agent: handleAPIRequest('POST', 'agents', formData)
- Update agent: handleAPIRequest('PUT', `agents/${selectedAgent.id}`, formData)
- Delete agent: handleAPIRequest('DELETE', `agents/${id}`)
- Assign contacts: handleAPIRequest('POST', `agents/${agentId}/assign`, {count})
*/

export default Agents;
