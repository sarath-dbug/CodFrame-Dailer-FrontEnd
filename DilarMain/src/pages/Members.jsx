import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/authSlice";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Checkbox,
  Chip,
  Avatar,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Alert,
} from "@mui/material";
import {
  Search,
  Add,
  Delete,
  Close,
  Apps,
  FileUpload,
  FileDownload,
  RemoveCircle,
  Edit,
} from "@mui/icons-material";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
    success: { main: "#4caf50" },
    background: { default: "#f5f7fa" },
  },
});

function Members() {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const token = useSelector(selectCurrentToken);

  // Fetch all members
  const fetchAllMembers = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/member/fetchAllMembers`
      );
      console.log("Members data:", response.data);
      setMembers(response.data);
    } catch (error) {
      console.error(
        "Error fetching members:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  useEffect(() => {
    fetchAllMembers();
  }, []);

  // Filter members based on search query
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle change password
  const handleOpenPasswordDialog = (member) => {
    setSelectedMember(member);
    setOpenPasswordDialog(true);
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    setPasswordError("");
  };

  const handleChangePassword = async () => {
    if (!newPassword) {
      setPasswordError("Please enter a new password");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    setIsChangingPassword(true);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/member/changePassword`,
        {
          userId: selectedMember.userId,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      handleClosePasswordDialog();
      setNewPassword("");
      // Consider using a snackbar instead of alert
      setMembers((prev) =>
        prev.map((m) =>
          m._id === selectedMember._id
            ? { ...m, updatedAt: new Date().toISOString() }
            : m
        )
      );
    } catch (error) {
      console.error("Error changing password:", error);
      setPasswordError(
        error.response?.data?.msg || "Failed to update password"
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ my: 4 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Members
            </Typography>

            {/* Search and Actions Bar */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                mb: 3,
                alignItems: "center",
              }}
            >
              <TextField
                placeholder="Search Members"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  maxWidth: { sm: "400px" },
                  bgcolor: "background.paper",
                  borderRadius: 1,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", sm: "flex-end" },
                  flex: 1,
                }}
              >
                <Button variant="outlined" color="#4a148c" startIcon={<Add />}>
                  Add
                </Button>
                <Button
                  variant="outlined"
                  color="#4a148c"
                  startIcon={<FileDownload />}
                >
                  Export
                </Button>
              </Box>
            </Box>

            {/* Members List */}
            <Grid container spacing={3}>
              {filteredMembers.map((member) => (
                <Grid item xs={12} md={6} lg={4} key={member._id}>
                  <Card sx={{ position: "relative" }}>
                    <CardContent>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Box sx={{ ml: 2, flex: 1 }}>
                          <Typography variant="h6" component="div">
                            {member.name}
                          </Typography>
                        </Box>
                        <Avatar
                          sx={{
                            bgcolor: "#4a148c",
                            width: 40,
                            height: 40,
                          }}
                        >
                          {getInitials(member.name)}
                        </Avatar>
                      </Box>

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Email:</strong> {member.email}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Phone:</strong> {member.phone}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Role:</strong> {member.role}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Teams</strong>
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            mt: 1,
                          }}
                        >
                          {member.team.map((team, index) => (
                            <Chip key={index} label={team} size="small" />
                          ))}
                        </Box>
                      </Box>

                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Lists</strong>
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            mt: 1,
                          }}
                        >
                          {member.lists.map((list, index) => (
                            <Chip
                              key={index}
                              label={list}
                              size="small"
                              onDelete={() => {}}
                              deleteIcon={<Close fontSize="small" />}
                            />
                          ))}
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 3,
                          alignItems: "center",
                        }}
                      >
                        <Button
                          color="success"
                          onClick={() => handleOpenPasswordDialog(member)}
                        >
                          CHANGE PASSWORD
                        </Button>
                        <Box>
                          <IconButton
                            color="error"
                            // onClick={() => handleOpenDeleteDialog(member)}
                          >
                            <Delete />
                          </IconButton>
                          <IconButton
                            color="primary"
                            // onClick={() => handleEditMember(member)}
                          >
                            <Edit />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Add/Edit Member Dialog */}

            {/* Change Password Dialog */}
            <Dialog
              open={openPasswordDialog}
              onClose={handleClosePasswordDialog}
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle>
                Change Password 
              </DialogTitle>
              <DialogContent dividers>
                {passwordError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {passwordError}
                  </Alert>
                )}
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  value={newPassword}
                  onChange={handlePasswordChange}
                  margin="normal"
                  required
                  error={!!passwordError}
                  helperText={passwordError}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClosePasswordDialog}
                  disabled={isChangingPassword}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleChangePassword}
                  variant="contained"
                  color="primary"
                  disabled={!newPassword || isChangingPassword}
                >
                  {isChangingPassword ? "Changing..." : "Change Password"}
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Members;
