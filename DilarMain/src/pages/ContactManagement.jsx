import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  IconButton,
  Chip,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Search,
  Add,
  CloudUpload,
  Edit,
  Delete,
  RemoveCircle,
  Refresh,
  GetApp,
  People,
  Visibility,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../features/authSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const theme = createTheme({
  palette: {
    primary: {
      main: "#0F172A",
    },
    secondary: {
      main: "#CED1D5",
    },
    background: {
      default: "#F1F5F9",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
  },
});

function ContactManagement() {
  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down("sm"));

  // States for various dialogs
  const [selectedList, setSelectedList] = useState("");
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // States for table data
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedDisposition, setSelectedDisposition] =
    useState("All Dispositions");
  const [searchQuery, setSearchQuery] = useState("");

  // User data from redux
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);

  // Mock data for contacts
  const [contacts, setContacts] = useState([
    {
      id: 1,
      number: "+91(61)3155319",
      secondaryNumber: "",
      name: "",
      companyName: "",
      email: "",
      disposition: "NEW",
      address: "",
      extra: "",
      remarks: "",
      note: "",
      createdOn: "2023-05-15",
      assignee: "Abhishek Kumar",
      totalDuration: "00:00:00",
    },
    {
      id: 2,
      number: "9654359043",
      secondaryNumber: "",
      name: "Jyoti",
      companyName: "Delhi Physiotherapy Occupational Therapy Clinic",
      email: "",
      disposition: "NEW",
      address: "",
      extra: "",
      remarks: "",
      note: "",
      createdOn: "2023-05-16",
      assignee: "Abhishek Kumar",
      totalDuration: "00:05:23",
    },
  ]);

  // Fetch all lists
  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/api/lists/fetchAllList`
        );
        console.log(response.data);

        setLists(response.data);

        if (response.data.length > 0) {
          setSelectedList(response.data[0].name);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  // Filter contacts based on search and disposition
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      searchQuery === "" ||
      contact.number.includes(searchQuery) ||
      contact.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDisposition =
      selectedDisposition === "All Dispositions" ||
      contact.disposition === selectedDisposition;

    return matchesSearch && matchesDisposition;
  });

  // Get current page of contacts
  const currentContacts = filteredContacts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            bgcolor: "#F1F5F9",
            minHeight: "100vh",
            padding: 2,
            color: "#0F172A",
          }}
        >
          <Paper elevation={1} sx={{ p: 3, mb: 2, bgcolor: "white" }}>
            <Typography
              variant="h5"
              component="h1"
              sx={{ fontWeight: "bold", mb: 3 }}
            >
              CRM
            </Typography>

            {loading && <Typography>Loading lists...</Typography>}
            {error && (
              <Typography color="error">
                Error loading lists: {error}
              </Typography>
            )}

            {/* List selector */}
            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Grid item xs={12} sm={3} md={2}>
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  Choose Lists :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9} md={10}>
                <FormControl fullWidth size="small">
                  <Select
                    value={selectedList}
                    onChange={(e) => setSelectedList(e.target.value)}
                    sx={{
                      bgcolor: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#CED1D5",
                      },
                    }}
                    disabled={loading}
                  >
                    {lists?.map((list) => (
                      <MenuItem key={list._id} value={list.name}>
                        {list.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Buttons */}
            <Grid container spacing={isMobile ? 1 : 2} sx={{ mb: 3 }}>
              <Grid item xs={4} sm={3} md={1.5}>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  //   onClick={() => setOpenAddContact(true)}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderColor: "#CED1D5",
                    color: "#0F172A",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    transition: "all 0.2s ease",
                    p: 1,
                    height: "100%",
                    "&:hover": {
                      borderColor: "#0F172A",
                      bgcolor: "rgba(15, 23, 42, 0.04)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Typography
                    variant={isMobile ? "caption" : "body2"}
                    sx={{ mt: isMobile ? 0.5 : 1, textAlign: "center" }}
                  >
                    Add Contact
                  </Typography>
                </Button>
              </Grid>

              <Grid item xs={4} sm={3} md={1.5}>
                <Button
                  variant="outlined"
                  startIcon={<CloudUpload />}
                  //   onClick={() => setOpenImportContacts(true)}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderColor: "#CED1D5",
                    color: "#0F172A",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    transition: "all 0.2s ease",
                    p: 1,
                    height: "100%",
                    "&:hover": {
                      borderColor: "#0F172A",
                      bgcolor: "rgba(15, 23, 42, 0.04)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Typography
                    variant={isMobile ? "caption" : "body2"}
                    sx={{ mt: isMobile ? 0.5 : 1, textAlign: "center" }}
                  >
                    Import Contacts
                  </Typography>
                </Button>
              </Grid>

              <Grid item xs={4} sm={3} md={1.5}>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  //   onClick={() => setOpenNewList(true)}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderColor: "#CED1D5",
                    color: "#0F172A",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    transition: "all 0.2s ease",
                    p: 1,
                    height: "100%",
                    "&:hover": {
                      borderColor: "#0F172A",
                      bgcolor: "rgba(15, 23, 42, 0.04)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Typography
                    variant={isMobile ? "caption" : "body2"}
                    sx={{ mt: isMobile ? 0.5 : 1, textAlign: "center" }}
                  >
                    New List
                  </Typography>
                </Button>
              </Grid>

              <Grid item xs={4} sm={3} md={1.5}>
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  //   onClick={() => setOpenEditList(true)}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderColor: "#CED1D5",
                    color: "#0F172A",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    transition: "all 0.2s ease",
                    p: 1,
                    height: "100%",
                    "&:hover": {
                      borderColor: "#0F172A",
                      bgcolor: "rgba(15, 23, 42, 0.04)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Typography
                    variant={isMobile ? "caption" : "body2"}
                    sx={{ mt: isMobile ? 0.5 : 1, textAlign: "center" }}
                  >
                    Edit List
                  </Typography>
                </Button>
              </Grid>

              <Grid item xs={4} sm={3} md={1.5}>
                <Button
                  variant="outlined"
                  startIcon={<Delete />}
                  //   onClick={() => setOpenRemoveList(true)}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderColor: "#CED1D5",
                    color: "#0F172A",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    transition: "all 0.2s ease",
                    p: 1,
                    height: "100%",
                    "&:hover": {
                      borderColor: "#0F172A",
                      bgcolor: "rgba(15, 23, 42, 0.04)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Typography
                    variant={isMobile ? "caption" : "body2"}
                    sx={{ mt: isMobile ? 0.5 : 1, textAlign: "center" }}
                  >
                    Remove List
                  </Typography>
                </Button>
              </Grid>

              <Grid item xs={4} sm={3} md={1.5}>
                <Button
                  variant="outlined"
                  startIcon={<RemoveCircle />}
                  //   onClick={() => setOpenEmptyList(true)}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderColor: "#CED1D5",
                    color: "#0F172A",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    transition: "all 0.2s ease",
                    p: 1,
                    height: "100%",
                    "&:hover": {
                      borderColor: "#0F172A",
                      bgcolor: "rgba(15, 23, 42, 0.04)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Typography
                    variant={isMobile ? "caption" : "body2"}
                    sx={{ mt: isMobile ? 0.5 : 1, textAlign: "center" }}
                  >
                    Empty List
                  </Typography>
                </Button>
              </Grid>

              <Grid item xs={4} sm={3} md={1.5}>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderColor: "#CED1D5",
                    color: "#0F172A",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    transition: "all 0.2s ease",
                    p: 1,
                    height: "100%",
                    "&:hover": {
                      borderColor: "#0F172A",
                      bgcolor: "rgba(15, 23, 42, 0.04)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Typography
                    variant={isMobile ? "caption" : "body2"}
                    sx={{ mt: isMobile ? 0.5 : 1, textAlign: "center" }}
                  >
                    Reclaim List
                  </Typography>
                </Button>
              </Grid>

              <Grid item xs={4} sm={3} md={1.5}>
                <Button
                  variant="outlined"
                  startIcon={<GetApp />}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderColor: "#CED1D5",
                    color: "#0F172A",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    transition: "all 0.2s ease",
                    p: 1,
                    height: "100%",
                    "&:hover": {
                      borderColor: "#0F172A",
                      bgcolor: "rgba(15, 23, 42, 0.04)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Typography
                    variant={isMobile ? "caption" : "body2"}
                    sx={{ mt: isMobile ? 0.5 : 1, textAlign: "center" }}
                  >
                    Export List
                  </Typography>
                </Button>
              </Grid>

              <Grid item xs={4} sm={3} md={1.5}>
                <Button
                  variant="outlined"
                  startIcon={<People />}
                  //   onClick={() => setOpenAssignMembers(true)}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderColor: "#CED1D5",
                    color: "#0F172A",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    transition: "all 0.2s ease",
                    p: 1,
                    height: "100%",
                    "&:hover": {
                      borderColor: "#0F172A",
                      bgcolor: "rgba(15, 23, 42, 0.04)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Typography
                    variant={isMobile ? "caption" : "body2"}
                    sx={{ mt: isMobile ? 0.5 : 1, textAlign: "center" }}
                  >
                    Assign Members
                  </Typography>
                </Button>
              </Grid>
            </Grid>

            {/* Disposition selector & Search bar      */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth size="small">
                  <Select
                    value={selectedDisposition}
                    onChange={(e) => setSelectedDisposition(e.target.value)}
                    sx={{
                      bgcolor: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#CED1D5",
                      },
                    }}
                    startAdornment={
                      <InputAdornment position="start">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            All Dispositions
                          </Typography>
                        </Box>
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="All Dispositions">
                      All Dispositions
                    </MenuItem>
                    <MenuItem value="SKIP">SKIP</MenuItem>
                    <MenuItem value="CONTACTED">INCOMING</MenuItem>
                    <MenuItem value="QUALIFIED">CALLBACK</MenuItem>
                    <MenuItem value="NEW">NEW</MenuItem>
                    <MenuItem value="WRONG NUMBER">WRONG NUMBER</MenuItem>
                    <MenuItem value="INTERESTED">INTERESTED</MenuItem>
                    <MenuItem value="UNREACHABLE">UNREACHABLE</MenuItem>
                    <MenuItem value="NOT INTERESTED">NOT INTERESTED</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Phone / Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          color="primary"
                          sx={{
                            bgcolor: "#4CAF50",
                            color: "white",
                            "&:hover": { bgcolor: "#388E3C" },
                          }}
                        >
                          <Search />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      bgcolor: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#CED1D5",
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>

            {/* table */}
            <TableContainer component={Paper} sx={{ mb: 2, overflowX: "auto" }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: "#F1F5F9" }}>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Secondary Phone</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Disposition</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Extra</TableCell>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Note</TableCell>
                    <TableCell>Total Duration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentContacts.map((contact) => (
                    <TableRow key={contact.id} hover>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>{contact.number}</TableCell>
                      <TableCell>{contact.secondaryNumber}</TableCell>
                      <TableCell>{contact.name}</TableCell>
                      <TableCell>{contact.companyName}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={contact.disposition}
                          size="small"
                          sx={{
                            bgcolor: "#4CAF50",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        />
                      </TableCell>
                      <TableCell>{contact.address}</TableCell>
                      <TableCell>{contact.extra}</TableCell>
                      <TableCell>{contact.remarks}</TableCell>
                      <TableCell>{contact.note}</TableCell>
                      <TableCell>{contact.totalDuration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Rows per page:
                </Typography>
                <Select
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                  size="small"
                  sx={{
                    minWidth: 60,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#CED1D5",
                    },
                  }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                </Select>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2">
                  {page * rowsPerPage + 1}-
                  {Math.min((page + 1) * rowsPerPage, filteredContacts.length)}{" "}
                  of {filteredContacts.length}
                </Typography>
                <IconButton
                  disabled={page === 0}
                  onClick={(e) => handleChangePage(e, page - 1)}
                >
                  <Typography variant="h5">&lt;</Typography>
                </IconButton>
                <IconButton
                  disabled={
                    page >= Math.ceil(filteredContacts.length / rowsPerPage) - 1
                  }
                  onClick={(e) => handleChangePage(e, page + 1)}
                >
                  <Typography variant="h5">&gt;</Typography>
                </IconButton>
              </Box>
            </Box>
          </Paper>
        
        {/* Assignments */}
        <Paper elevation={1} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" component="h2">
            Assignments
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Chip label="Sarath" onDelete={() => {}} sx={{ mr: 1, bgcolor: "#F1F5F9" }} />
          <Button
            variant="contained"
            size="small"
            startIcon={<Add />}
            // onClick={() => setOpenAssignMembers(true)}
            sx={{
              bgcolor: "#0F172A",
              color: "white",
              fontWeight: "medium",
              boxShadow: "0 4px 6px rgba(15, 23, 42, 0.1)",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#1E293B",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 8px rgba(15, 23, 42, 0.2)",
              },
            }}
          >
            Assign
          </Button>
        </Box>
       </Paper>

        </Box>
      </ThemeProvider>
    </div>
  );
}

export default ContactManagement;
