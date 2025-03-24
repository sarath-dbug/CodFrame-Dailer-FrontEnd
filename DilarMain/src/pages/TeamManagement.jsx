import { useState } from "react";
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

// Sample data for teams
const initialTeams = [
  {
    id: 1,
    name: "Marketing Team",
    members: 2,
    created: "1/15/2025",
    status: "Active",
  },
  {
    id: 2,
    name: "Development Team",
    members: 1,
    created: "11/20/2024",
    status: "Active",
  },
];

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
  const [teams, setTeams] = useState(initialTeams);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: "" });
  const [editTeam, setEditTeam] = useState({ id: null, name: "", created: "" });
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Add Team Dialog Handlers
  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewTeam({ name: "" });
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({ ...newTeam, [name]: value });
  };

  const handleAddTeam = () => {
    if (newTeam.name) {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

      const newTeamEntry = {
        id: teams.length + 1,
        name: newTeam.name,
        members: 0, // Default members count
        created: formattedDate,
        status: "Active",
      };

      setTeams([...teams, newTeamEntry]);
      handleCloseAddDialog();
    }
  };

  // Edit Team Dialog Handlers
  const handleOpenEditDialog = (team) => {
    setEditTeam(team);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditTeam({ id: null, name: "", created: "" });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditTeam({ ...editTeam, [name]: value });
  };

  const handleUpdateTeam = () => {
    if (editTeam.name) {
      setTeams(
        teams.map((team) =>
          team.id === editTeam.id
            ? { ...team, name: editTeam.name }
            : team,
        ),
      );
      handleCloseEditDialog();
    }
  };

  // Delete Team Handler
  const handleDeleteTeam = (id) => {
    setTeams(teams.filter((team) => team.id !== id));
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
                <PeopleIcon sx={{ color: "#4285f4", mr: 1 }} />
                <Typography variant="h5" component="h1">
                  Team Management
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenAddDialog}
                sx={{
                  bgcolor: "#4285f4",
                  "&:hover": {
                    bgcolor: "#3367d6",
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
                    <TableCell sx={{ fontWeight: "medium", color: "#666" }}>MEMBERS</TableCell>
                    {!isTablet && <TableCell sx={{ fontWeight: "medium", color: "#666" }}>CREATED</TableCell>}
                    <TableCell sx={{ fontWeight: "medium", color: "#666" }}>ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell>{team.name}</TableCell>
                      <TableCell>{team.members}</TableCell>
                      {!isTablet && <TableCell>{team.created}</TableCell>}
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
                            onClick={() => handleDeleteTeam(team.id)}
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
                    bgcolor: "#4285f4",
                    "&:hover": {
                      bgcolor: "#3367d6",
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
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TeamManagement;