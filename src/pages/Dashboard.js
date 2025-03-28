import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import MainLayout from "./MainLayout"; // Import MainLayout

const data = [
  { date: "24/03", tickets: 120 },
  { date: "25/03", tickets: 150 },
  { date: "26/03", tickets: 180 },
  { date: "27/03", tickets: 200 },
];

const Dashboard = () => {
  return (
    <MainLayout>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          🎬 Tổng Quan Rạp Chiếu
        </Typography>

        <Grid container spacing={3}>
          {/* Thống kê tổng */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Phim đang chiếu</Typography>
                <Typography variant="h4">12</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Suất chiếu hôm nay</Typography>
                <Typography variant="h4">24</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Vé đã bán</Typography>
                <Typography variant="h4">350</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Doanh thu</Typography>
                <Typography variant="h4">75,000,000đ</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Biểu đồ vé bán */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Thống kê vé bán</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tickets" fill="#3f51b5" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default Dashboard;