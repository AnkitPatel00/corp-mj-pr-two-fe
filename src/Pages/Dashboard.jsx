import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../features/leads/leadsSlice";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "../Component/Loading";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Paper,
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { leads, leadStatus, leadError } = useSelector(
    (state) => state.leadState
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const queryArray = searchParams.getAll("status");
  const [statusFilter, setStatusFilter] = useState(queryArray);

  useEffect(() => {
    const query = new URLSearchParams();
    statusFilter.forEach((status) => query.append("status", status));
    setSearchParams(query);
  }, [statusFilter]);

  useEffect(() => {
    dispatch(fetchLeads(searchParams.toString()));
  }, [searchParams, dispatch]);

  const handleFilter = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setStatusFilter((prev) => [...prev, value]);
    } else {
      setStatusFilter((prev) => prev.filter((status) => status !== value));
    }
  };

  // Grouping leads by status
  const leadsStatus = leads?.map((lead) => lead.status);
  const leadsStatusCount =
    leadsStatus.length > 0 &&
    leadsStatus.reduce((acc, status) => {
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

  const leadsArrayWithCount = Object.entries(leadsStatusCount || {}).map(
    ([leadStatus, count]) => ({ status: leadStatus, count })
  );

  const COLORS = ["#1976d2", "#9c27b0", "#f57c00", "#2e7d32", "#d32f2f"];

  // ---------- Components ----------

  const Filters = () => (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 3,
        background: "linear-gradient(135deg, #f5f7fa, #e6ecf5)",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Quick Filters
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={statusFilter.includes("New")}
            value="New"
            onChange={handleFilter}
          />
        }
        label="New"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={statusFilter.includes("Contacted")}
            value="Contacted"
            onChange={handleFilter}
          />
        }
        label="Contacted"
      />
    </Paper>
  );

  const LeadsList = () => (
    <Grid container spacing={3} mb={4}>
      {leads.map((lead) => (
        <Grid item xs={12} md={6} lg={3} key={lead._id}>
          <Link
            to={`/leads/${lead._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card
              elevation={4}
              sx={{
                height: "100%",
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {lead.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: "inline-block",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  {lead.status}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  👤 {lead.salesAgent.name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );

  const LeadStatusChart = () => (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        background: "linear-gradient(135deg, #fefefe, #f5f5f5)",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Lead Status Overview
      </Typography>
      {leadsArrayWithCount.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={leadsArrayWithCount}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {leadsArrayWithCount.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No data available
        </Typography>
      )}
    </Paper>
  );

  // ---------- UI ----------

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Dashboard
      </Typography>

      {leadError && (
        <Typography color="error" gutterBottom>
          {leadError}
        </Typography>
      )}

      <Filters />

      {leadStatus === "loading" ? (
        <Loading />
      ) : (
        <>
          <LeadsList />
          <LeadStatusChart />
        </>
      )}

      {leads.length < 1 && (
        <Typography variant="h6" mt={2}>
          No Lead Found
        </Typography>
      )}

      <Button
        component={Link}
        to="/leads/add"
        variant="contained"
        size="large"
        sx={{
          mt: 3,
          borderRadius: 3,
          px: 4,
          textTransform: "none",
          fontWeight: "bold",
          backgroundColor: "#000",
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
      >
        ➕ Add New Lead
      </Button>
    </Box>
  );
};

export default Dashboard;
