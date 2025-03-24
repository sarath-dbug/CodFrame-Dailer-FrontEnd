// import React, { useState } from 'react';
// import { Button, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
// import * as XLSX from 'xlsx'; // Install xlsx package

// const Contacts = () => {
//   const [contacts, setContacts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   const categories = ['All', 'Restaurant', 'Loan', 'Lab', 'Healthcare', 'Retail'];

//   // Handle Excel file upload
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });

//       // Assuming first sheet is the one we need
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);

//       // Map Excel data to contact structure
//       const formattedData = jsonData.map((item, index) => ({
//         id: index + 1,
//         name: item['Name'] || '',
//         number: item['Phone'] || '',
//         category: item['Category'] || 'Uncategorized',
//         agent: item['Agent'] || 'Unassigned',
//         status: 'Active'
//       }));

//       setContacts(formattedData);
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   const filteredContacts = selectedCategory === 'All'
//     ? contacts
//     : contacts.filter(contact => contact.category === selectedCategory);

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-sm">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <div className="flex items-center gap-4">
//           <input
//             type="file"
//             id="file-upload"
//             hidden
//             accept=".xlsx, .xls, .csv"
//             onChange={handleFileUpload}
//           />
//           <label htmlFor="file-upload">
//             <Button
//               variant="contained"
//               component="span"
//               color="primary"
//               startIcon={<i className="fas fa-upload" />}
//             >
//               Upload Contacts (Excel/CSV)
//             </Button>
//           </label>

//           <Select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="min-w-[150px]"
//           >
//             {categories.map(category => (
//               <MenuItem key={category} value={category}>
//                 {category}
//               </MenuItem>
//             ))}
//           </Select>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto">
//         <Table className="min-w-[800px]">
//           <TableHead>
//             <TableRow className="bg-gray-50">
//               <TableCell>Contact Name</TableCell>
//               <TableCell>Number</TableCell>
//               <TableCell>Category</TableCell>
//               <TableCell>Assigned Agent</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {filteredContacts.map((contact) => (
//               <TableRow key={contact.id} hover>
//                 <TableCell>{contact.name}</TableCell>
//                 <TableCell>{contact.number}</TableCell>
//                 <TableCell>
//                   <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                     {contact.category}
//                   </span>
//                 </TableCell>
//                 <TableCell>{contact.agent}</TableCell>
//                 <TableCell>
//                   <span className={`px-2 py-1 rounded-full text-sm ${
//                     contact.status === 'Active'
//                       ? 'bg-green-100 text-green-800'
//                       : 'bg-red-100 text-red-800'
//                   }`}>
//                     {contact.status}
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex gap-2">
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => handleEdit(contact.id)}
//                     >
//                       <i className="fas fa-edit mr-2" /> Edit
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       color="secondary"
//                       onClick={() => handleAssign(contact.id)}
//                     >
//                       <i className="fas fa-user-check mr-2" /> Assign
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       color="error"
//                       onClick={() => handleDelete(contact.id)}
//                     >
//                       <i className="fas fa-trash mr-2" /> Delete
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// // Install required packages
// // npm install xlsx @mui/material @emotion/react @emotion/styled

// export default Contacts;

import React, { useState } from "react";
import {
  Upload,
  FileText,
  Plus,
  Filter,
  Edit,
  Trash2,
  UserPlus,
  Search,
  ArrowUpDown,
  AlertCircle,
  X,
  Check,
} from "lucide-react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoIosContacts } from "react-icons/io";
import { RiPlayListAddLine } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { CgPlayListRemove } from "react-icons/cg";
import { CgTrashEmpty } from "react-icons/cg";
import { PiExportBold } from "react-icons/pi";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { MdOutlineLocalLibrary } from "react-icons/md";

const ContactManagement = () => {
  // Sample data - would be replaced with API data
  const initialContacts = [
    {
      id: 1,
      name: "Rahul Verma",
      phone: "9876543210",
      category: "Loan",
      agent: "Agent A",
      status: "Pending",
    },
    {
      id: 2,
      name: "Pooja Rao",
      phone: "8765432109",
      category: "Restaurant",
      agent: "Agent B",
      status: "Completed",
    },
    {
      id: 3,
      name: "Amir Khan",
      phone: "7654321098",
      category: "Lab",
      agent: "Agent C",
      status: "In Progress",
    },
    {
      id: 4,
      name: "Priya Sharma",
      phone: "6543210987",
      category: "Restaurant",
      agent: "Agent A",
      status: "Completed",
    },
    {
      id: 5,
      name: "Vikram Patel",
      phone: "5432109876",
      category: "Loan",
      agent: "Agent D",
      status: "Pending",
    },
  ];

  // State
  const [contacts, setContacts] = useState(initialContacts);
  const [filteredContacts, setFilteredContacts] = useState(initialContacts);
  const [filters, setFilters] = useState({
    category: "",
    agent: "",
    status: "",
    search: "",
  });
  const [fileUploadModal, setFileUploadModal] = useState(false);
  const [editContactModal, setEditContactModal] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [deleteContactId, setDeleteContactId] = useState(null);
  const [assignAgentModal, setAssignAgentModal] = useState(false);
  const [assignAgentContact, setAssignAgentContact] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // Extract unique values for filters
  const categories = [...new Set(contacts.map((c) => c.category))];
  const agents = [...new Set(contacts.map((c) => c.agent))];
  const statuses = [...new Set(contacts.map((c) => c.status))];

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...contacts];

    if (filters.category) {
      filtered = filtered.filter((c) => c.category === filters.category);
    }

    if (filters.agent) {
      filtered = filtered.filter((c) => c.agent === filters.agent);
    }

    if (filters.status) {
      filtered = filtered.filter((c) => c.status === filters.status);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.phone.includes(filters.search)
      );
    }

    // Apply sorting if active
    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortDirection === "asc") {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
    }

    setFilteredContacts(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: "",
      agent: "",
      status: "",
      search: "",
    });
    setFilteredContacts(contacts);
    setSortBy(null);
    setSortDirection("asc");
  };

  // Sort function
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  // Mock file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFilePreview({
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        type: file.type,
      });
    }
  };

  // Process uploaded file
  const processUploadedFile = () => {
    // In a real implementation, this would call an API to process the file
    alert("Processing file: " + filePreview.name);
    setFileUploadModal(false);
    setFilePreview(null);
  };

  // Handle contact edit
  const openEditModal = (contact) => {
    setEditContact({ ...contact });
    setEditContactModal(true);
  };

  // Save contact changes
  const saveContactChanges = () => {
    setContacts((prevContacts) =>
      prevContacts.map((c) => (c.id === editContact.id ? editContact : c))
    );
    applyFilters();
    setEditContactModal(false);
    setEditContact(null);
  };

  // Handle contact deletion
  const openDeleteConfirm = (id) => {
    setDeleteContactId(id);
    setDeleteConfirmModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    setContacts((prevContacts) =>
      prevContacts.filter((c) => c.id !== deleteContactId)
    );
    setFilteredContacts((prevFiltered) =>
      prevFiltered.filter((c) => c.id !== deleteContactId)
    );
    setDeleteConfirmModal(false);
    setDeleteContactId(null);
  };

  // Assign agent modal
  const openAssignAgentModal = (contact) => {
    setAssignAgentContact({ ...contact });
    setAssignAgentModal(true);
  };

  // Save agent assignment
  const saveAgentAssignment = () => {
    setContacts((prevContacts) =>
      prevContacts.map((c) =>
        c.id === assignAgentContact.id ? assignAgentContact : c
      )
    );
    applyFilters();
    setAssignAgentModal(false);
    setAssignAgentContact(null);
  };

  // Effect to apply filters when filters or sorting changes
  React.useEffect(() => {
    applyFilters();
  }, [filters, sortBy, sortDirection]);

  // Status badge styles
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const [options] = useState([
    { title: "All Contacts" },
    { title: "Recent Leads" },
    { title: "Important Clients" },
    { title: "Archived Contacts" }
  ]);
  const [selectedValue, setSelectedValue] = useState(options[0]);

  return (
    <div className="p-6 mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Contact Management</h1>
      <div className="flex flex-col gap-4 p-4 md:p-6">
        {/* Top Section */}
        <div className="flex  gap-4 bg-red-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Choose List:</h2>
          <Autocomplete
      options={options}
      getOptionLabel={(option) => option.title}
      value={selectedValue}
      onChange={(event, newValue) => {
        setSelectedValue(newValue);
      }}
      className="w-full"
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select option"
          fullWidth
          size="small"
        />
      )}
    />
        </div>

        {/* Bottom Section */}
        <div className="bg-green-100 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <Button className="!hover:bg-stone-300 p-2 flex flex-col items-center gap-1 md:gap-2 text-xs md:text-base !capitalize">
              <IoPersonAddOutline className="text-black text-lg md:text-xl " />
              <span className="hidden md:inline">Add Contact</span>
            </Button>

            <Button className="!hover:bg-stone-300 p-2 flex flex-col items-center gap-1 md:gap-2 text-xs md:text-base !capitalize">
              <IoIosContacts className="text-black text-lg md:text-xl" />
              <span className="hidden md:inline">Import Contact</span>
            </Button>

            <Button className="hover:bg-stone-300 p-2 flex flex-col items-center gap-1 md:gap-2 text-xs md:text-base !capitalize">
              <RiPlayListAddLine className="text-black text-lg md:text-xl" />
              <span className="hidden md:inline">New List</span>
            </Button>

            <Button className="hover:bg-stone-300 p-2 flex flex-col items-center gap-1 md:gap-2 text-xs md:text-base !capitalize">
              <BiSolidEdit className="text-black text-lg md:text-xl" />
              <span className="hidden md:inline">Edit List</span>
            </Button>

            <Button className="hover:bg-stone-300 p-2 flex flex-col items-center gap-1 md:gap-2 text-xs md:text-base !capitalize">
              <CgPlayListRemove className="text-black text-lg md:text-xl" />
              <span className="hidden md:inline">Remove List</span>
            </Button>

            <Button className="hover:bg-stone-300 p-2 flex flex-col items-center gap-1 md:gap-2 text-xs md:text-base !capitalize">
              <CgTrashEmpty className="text-black text-lg md:text-xl" />
              <span className="hidden md:inline">Empty List</span>
            </Button>

            <Button className="hover:bg-stone-300 p-2 flex flex-col items-center gap-1 md:gap-2 text-xs md:text-base !capitalize">
              <IoPersonAddOutline className="text-black text-lg md:text-xl" />
              <span className="hidden md:inline">Rechurn List</span>
            </Button>

            <Button className="hover:bg-stone-300 p-2 flex flex-col items-center gap-1 md:gap-2 text-xs md:text-base !capitalize">
              <PiExportBold className="text-black text-lg md:text-xl" />
              <span className="hidden md:inline">Export List</span>
            </Button>

            <Button className="hover:bg-stone-300 p-2 flex flex-col items-center gap-1 md:gap-2 text-xs md:text-base !capitalize">
              <MdOutlineAssignmentInd className="text-black text-lg md:text-xl" />
              <span className="hidden md:inline">Assign Members</span>
            </Button>

            <Button className="hover:bg-stone-300 p-2 flex flex-col items-center gap-1 md:gap-2 text-xs md:text-base !capitalize">
              <MdOutlineLocalLibrary className="text-black text-lg md:text-xl" />
              <span className="hidden md:inline">Call Script</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Action Bar */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <button
          onClick={() => setFileUploadModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Upload className="mr-2" size={18} />
          Upload Contacts
        </button>

        <div className="relative flex-grow md:max-w-xs">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search contacts..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center mb-4">
          <Filter className="mr-2" size={18} />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="py-2 px-3 border rounded-lg w-full"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assigned Agent
            </label>
            <select
              name="agent"
              value={filters.agent}
              onChange={handleFilterChange}
              className="py-2 px-3 border rounded-lg w-full"
            >
              <option value="">All Agents</option>
              {agents.map((agent) => (
                <option key={agent} value={agent}>
                  {agent}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="py-2 px-3 border rounded-lg w-full"
            >
              <option value="">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={resetFilters}
            className="px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-100"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Name
                  {sortBy === "name" && (
                    <ArrowUpDown className="ml-1" size={14} />
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("phone")}
              >
                <div className="flex items-center">
                  Phone Number
                  {sortBy === "phone" && (
                    <ArrowUpDown className="ml-1" size={14} />
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center">
                  Category
                  {sortBy === "category" && (
                    <ArrowUpDown className="ml-1" size={14} />
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("agent")}
              >
                <div className="flex items-center">
                  Assigned Agent
                  {sortBy === "agent" && (
                    <ArrowUpDown className="ml-1" size={14} />
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center">
                  Status
                  {sortBy === "status" && (
                    <ArrowUpDown className="ml-1" size={14} />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {contact.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contact.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contact.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contact.agent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                      contact.status
                    )}`}
                  >
                    {contact.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(contact)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit contact"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => openAssignAgentModal(contact)}
                      className="text-green-600 hover:text-green-900"
                      title="Assign agent"
                    >
                      <UserPlus size={16} />
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(contact.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete contact"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No contacts match your filters. Try adjusting your search criteria.
        </div>
      )}

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
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{filteredContacts.length}</span> of{" "}
              <span className="font-medium">{filteredContacts.length}</span>{" "}
              results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300  text-sm font-medium text-blue-600 bg-blue-50">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Upload Contacts Modal */}
      {fileUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Upload Contacts</h3>
              <button
                onClick={() => {
                  setFileUploadModal(false);
                  setFilePreview(null);
                }}
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
                          onChange={handleFileUpload}
                        />
                      </label>
                      <p className="text-xs text-gray-500">
                        CSV or PDF up to 10MB
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 text-blue-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium">
                          {filePreview.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {filePreview.size}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setFilePreview(null)}
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
                onClick={() => {
                  setFileUploadModal(false);
                  setFilePreview(null);
                }}
                className="px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={processUploadedFile}
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
      )}

      {/* Edit Contact Modal */}
      {editContactModal && editContact && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Edit Contact</h3>
              <button
                onClick={() => {
                  setEditContactModal(false);
                  setEditContact(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editContact.name}
                  onChange={(e) =>
                    setEditContact({ ...editContact, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={editContact.phone}
                  onChange={(e) =>
                    setEditContact({ ...editContact, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={editContact.category}
                  onChange={(e) =>
                    setEditContact({ ...editContact, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned Agent
                </label>
                <select
                  value={editContact.agent}
                  onChange={(e) =>
                    setEditContact({ ...editContact, agent: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {agents.map((agent) => (
                    <option key={agent} value={agent}>
                      {agent}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={editContact.status}
                  onChange={(e) =>
                    setEditContact({ ...editContact, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setEditContactModal(false);
                  setEditContact(null);
                }}
                className="px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveContactChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">
                Delete Contact
              </h3>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete this contact? This action cannot
              be undone.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setDeleteConfirmModal(false);
                  setDeleteContactId(null);
                }}
                className="px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Agent Modal */}
      {assignAgentModal && assignAgentContact && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Assign Agent</h3>
              <button
                onClick={() => {
                  setAssignAgentModal(false);
                  setAssignAgentContact(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">
                Assign contact <strong>{assignAgentContact.name}</strong> to an
                agent:
              </p>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Agent
                </label>
                <select
                  value={assignAgentContact.agent}
                  onChange={(e) =>
                    setAssignAgentContact({
                      ...assignAgentContact,
                      agent: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {agents.map((agent) => (
                    <option key={agent} value={agent}>
                      {agent}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setAssignAgentModal(false);
                  setAssignAgentContact(null);
                }}
                className="px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveAgentAssignment}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;
