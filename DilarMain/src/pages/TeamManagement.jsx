import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from '../features/authSlice';
import axios from "axios"; 
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  People as PeopleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
 const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Theme definition
const theme = createTheme({
  palette: {
    primary: {
      main: "#4285f4",
    },
    secondary: {
      main: "#ea4335",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
  },
});

const TeamManagement = () => {
  const [teams, setTeams] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); 
  const [teamToDelete, setTeamToDelete] = useState(null); 
  const [newTeam, setNewTeam] = useState({ name: "" });
  const [editTeam, setEditTeam] = useState({ id: null, name: "", created: "" });
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);

  // Fetch Team Dialog Handlers
  const fetchTeams = async () => {
    try {
      const userId = user.id
      const response = await axios.get(
        `${API_BASE_URL}/api/team/fetchTeamsByUser`,
        {
          params: { userId },
          headers: {
            Authorization: `Bearer ${token}`, // Add token if required
          },
        }
      );

      setTeams(response.data.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  // Fetch teams on component mount
  useEffect(() => {
    fetchTeams();
  }, []);

  // Add Team Dialog Handlers
  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewTeam({ name: "" });
  };

  const handleAddInputChange = (e) => {
    setNewTeam({ name: e.target.value });
  };

  const handleAddTeam = async () => {
    if (newTeam.name) {
      try {
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.post(
          `${API_BASE_URL}/api/team/addTeam`,
          {
            name: newTeam.name,
            userId: user.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          handleCloseAddDialog();
          fetchTeams();
        }
      } catch (error) {
        console.error("Error creating team:", error.response?.data?.msg || error.message);
      }
    }
  };

  // Edit Team Dialog Handlers
  const handleOpenEditDialog = (team) => {
    setEditTeam({ id: team._id, name: team.name });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditTeam({ id: null, name: "" });
  };

  const handleEditInputChange = (e) => {
    setEditTeam((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleUpdateTeam = async () => {
    if (editTeam.name) {
      try {
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.put(
          `${API_BASE_URL}/api/team/editTeam`,
          {
            name: editTeam.name,
            teamId: editTeam.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          handleCloseEditDialog();
          fetchTeams();
        }
      } catch (error) {
        console.error("Error updating team:", error.response?.data?.msg || error.message);
      }
    }
  };

  // Delete Team Handlers
  const handleOpenDeleteDialog = (id) => {
    setTeamToDelete(id);
    setOpenDeleteDialog(true); 
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false); 
    setTeamToDelete(null); 
  };

  const handleDeleteTeam = async () => {
    if (teamToDelete) {
      try {
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.delete(
          `https://codframe-dailerapp.onrender.com/api/team/deleteTeam/${teamToDelete}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          fetchTeams(); 
        }
      } catch (error) {
        console.error("Error deleting team:", error.response?.data?.msg || error.message);
      } finally {
        handleCloseDeleteDialog();
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh" }}>
          <Box sx={{ p: { xs: 2, sm: 3 }, width: "100%" }}>
            {/* Header with title and add button */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                gap: 2,
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PeopleIcon sx={{ color: "#4a148c", mr: 1 }} />
                <Typography variant="h5" component="h1">
                  Team Management
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenAddDialog}
                sx={{
                  bgcolor: "#4a148c",
                  "&:hover": {
                    bgcolor: "#6a1b9a",
                  },
                }}
              >
                Add New Team
              </Button>
            </Box>

            {/* Teams listing table */}
            <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e0e0e0", mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "medium", color: "#666" }}>NAME</TableCell>
                    <TableCell sx={{ fontWeight: "medium", color: "#666" }}>AGENTS</TableCell>
                    {!isTablet && <TableCell sx={{ fontWeight: "medium", color: "#666" }}>CREATED</TableCell>}
                    <TableCell sx={{ fontWeight: "medium", color: "#666" }}>ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teams.map((team) => (
                    <TableRow key={team._id}>
                      <TableCell>{team.name}</TableCell>
                      <TableCell>{team.assignedTo.length}</TableCell>
                      {!isTablet && <TableCell>{team.createdAt}</TableCell>}
                      <TableCell>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          <Button
                            startIcon={<EditIcon />}
                            variant="outlined"
                            size="small"
                            sx={{ color: "#4285f4", borderColor: "#4285f4" }}
                            onClick={() => handleOpenEditDialog(team)}
                          >
                            {!isTablet ? "Edit" : ""}
                          </Button>
                          <Button
                            startIcon={<DeleteIcon />}
                            variant="outlined"
                            size="small"
                            sx={{ color: "#ea4335", borderColor: "#ea4335" }}
                            onClick={() => handleOpenDeleteDialog(team._id)} 
                          >
                            {!isTablet ? "Delete" : ""}
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Add Team Dialog */}
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog} fullWidth maxWidth="sm">
              <DialogTitle>
                Add New Team
                <IconButton
                  aria-label="close"
                  onClick={handleCloseAddDialog}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="name"
                  label="Team Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={newTeam.name}
                  onChange={handleAddInputChange}
                  sx={{ mb: 2, mt: 1 }}
                />
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button onClick={handleCloseAddDialog} sx={{ color: "text.secondary" }}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddTeam}
                  variant="contained"
                  disabled={!newTeam.name}
                  sx={{
                    bgcolor: "#4a148c",
                    "&:hover": {
                      bgcolor: "#6a1b9a",
                    },
                  }}
                >
                  Add Team
                </Button>
              </DialogActions>
            </Dialog>

            {/* Edit Team Dialog */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="sm">
              <DialogTitle>
                Edit Team
                <IconButton
                  aria-label="close"
                  onClick={handleCloseEditDialog}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="name"
                  label="Team Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={editTeam.name}
                  onChange={handleEditInputChange}
                  sx={{ mb: 2, mt: 1 }}
                />
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button onClick={handleCloseEditDialog} sx={{ color: "text.secondary" }}>
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateTeam}
                  variant="contained"
                  disabled={!editTeam.name}
                  sx={{
                    bgcolor: "#4285f4",
                    "&:hover": {
                      bgcolor: "#3367d6",
                    },
                  }}
                >
                  Update Team
                </Button>
              </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} fullWidth maxWidth="sm">
              <DialogTitle>
                Confirm Delete
                <IconButton
                  aria-label="close"
                  onClick={handleCloseDeleteDialog}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Typography variant="body1">
                  Are you sure you want to delete this team? This action cannot be undone.
                </Typography>
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button onClick={handleCloseDeleteDialog} sx={{ color: "text.secondary" }}>
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteTeam}
                  variant="contained"
                  sx={{
                    bgcolor: "#ea4335",
                    "&:hover": {
                      bgcolor: "#d32f2f",
                    },
                  }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TeamManagement;