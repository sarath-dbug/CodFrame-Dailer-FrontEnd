import React, { useState } from 'react';
import { Calendar, Download, FileSpreadsheet, FileText, Filter, Search } from 'lucide-react';

const CallLogsAndReports = () => {
  // Sample data - would be replaced with API data
  const initialLogs = [
    { id: 1, agent: "Agent A", contactName: "Rahul Verma", duration: "2:45", status: "Completed", notes: "Interested in Loan", date: "2025-03-07" },
    { id: 2, agent: "Agent B", contactName: "Pooja Rao", duration: "1:30", status: "Missed", notes: "Call Again", date: "2025-03-07" },
    { id: 3, agent: "Agent C", contactName: "Amir Khan", duration: "4:12", status: "Completed", notes: "Application submitted", date: "2025-03-06" },
    { id: 4, agent: "Agent A", contactName: "Priya Sharma", duration: "3:05", status: "Completed", notes: "Loan approved", date: "2025-03-06" },
    { id: 5, agent: "Agent D", contactName: "Vikram Patel", duration: "0:45", status: "Abandoned", notes: "Will call back tomorrow", date: "2025-03-05" },
  ];

  // States
  const [logs, setLogs] = useState(initialLogs);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    agent: "",
    status: "",
    search: ""
  });

  // Unique values for filters
  const agents = [...new Set(initialLogs.map(log => log.agent))];
  const statuses = [...new Set(initialLogs.map(log => log.status))];

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply filters
  const applyFilters = () => {
    let filteredLogs = [...initialLogs];

    if (filters.startDate) {
      filteredLogs = filteredLogs.filter(log => log.date >= filters.startDate);
    }
    
    if (filters.endDate) {
      filteredLogs = filteredLogs.filter(log => log.date <= filters.endDate);
    }
    
    if (filters.agent) {
      filteredLogs = filteredLogs.filter(log => log.agent === filters.agent);
    }
    
    if (filters.status) {
      filteredLogs = filteredLogs.filter(log => log.status === filters.status);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredLogs = filteredLogs.filter(log => 
        log.contactName.toLowerCase().includes(searchLower) || 
        log.notes.toLowerCase().includes(searchLower)
      );
    }
    
    setLogs(filteredLogs);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      agent: "",
      status: "",
      search: ""
    });
    setLogs(initialLogs);
  };

  // Mock download function
  const downloadReport = (format) => {
    alert(`Downloading ${format} report...`);
    // In a real implementation, this would call an API endpoint
    // that would generate and return the file for download
  };

  // Status badge styles
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Missed':
        return 'bg-red-100 text-red-800';
      case 'Abandoned':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Call Logs and Reports</h1>
      
      {/* Filters Section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center mb-4">
          <Filter className="mr-2" size={20} />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="pl-8 pr-2 py-2 border rounded w-full"
                />
                <Calendar className="absolute left-2 top-2.5 text-gray-400" size={16} />
              </div>
              <span>to</span>
              <div className="relative flex-1">
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="pl-8 pr-2 py-2 border rounded w-full"
                />
                <Calendar className="absolute left-2 top-2.5 text-gray-400" size={16} />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Agent</label>
            <select
              name="agent"
              value={filters.agent}
              onChange={handleFilterChange}
              className="py-2 px-3 border rounded w-full"
            >
              <option value="">All Agents</option>
              {agents.map(agent => (
                <option key={agent} value={agent}>{agent}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="py-2 px-3 border rounded w-full"
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search by contact or notes..."
                className="pl-10 pr-3 py-2 border rounded w-full"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Apply Filters
            </button>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      
      {/* Export Options */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Showing {logs.length} results
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => downloadReport('CSV')}
            className="flex items-center px-3 py-2 bg-green-50 text-green-700 rounded hover:bg-green-100"
          >
            <FileSpreadsheet className="mr-2" size={16} />
            Export CSV
          </button>
          <button
            onClick={() => downloadReport('PDF')}
            className="flex items-center px-3 py-2 bg-red-50 text-red-700 rounded hover:bg-red-100"
          >
            <FileText className="mr-2" size={16} />
            Export PDF
          </button>
        </div>
      </div>
      
      {/* Call Logs Table */}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Agent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {log.agent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {log.contactName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {log.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(log.status)}`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {log.notes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {log.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="px-4 py-2 border rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 px-4 py-2 border rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{logs.length}</span> of{" "}
              <span className="font-medium">{logs.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallLogsAndReports;