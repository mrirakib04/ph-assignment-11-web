import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { HeadProvider, Title } from "react-head";

const About = () => {
  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
      <HeadProvider>
        <Title>About || NextRun Tracker</Title>
      </HeadProvider>
      <Typography
        // variant="h4"
        className="md:text-4xl! sm:text-3xl! text-2xl!"
        fontWeight="bold"
        mb={2}
      >
        About Our Platform
      </Typography>

      <Typography variant="body1" mb={3}>
        Our platform is an e-commerce based SaaS solution designed to help
        businesses manage, sell, and scale their products online efficiently. We
        provide a complete system where store owners, managers, and admins can
        operate from a single, centralized dashboard.
      </Typography>

      <Typography variant="h6" fontWeight="bold" mb={1}>
        Core Features
      </Typography>

      <List sx={{ mb: 3 }}>
        <ListItem>
          <ListItemText primary="Multi-role system with Admin, Manager, and User access control." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Product management with category, pricing, quantity, and visibility controls." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Advanced filtering, searching, and price-based sorting for customers." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Centralized dashboard to monitor products, users, and platform activity." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Scalable SaaS architecture suitable for multiple stores and growing businesses." />
        </ListItem>
      </List>

      <Typography variant="h6" fontWeight="bold" mb={1}>
        Business Benefits
      </Typography>

      <List sx={{ mb: 3 }}>
        <ListItem>
          <ListItemText primary="Faster store setup without building a system from scratch." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Reduced operational cost through automation and role-based management." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Better control over product visibility and sales performance." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Improved customer experience with clean UI and efficient navigation." />
        </ListItem>
      </List>

      <Typography variant="body1">
        This SaaS platform is built with modern web technologies to ensure
        performance, security, and future extensibility. It is ideal for
        startups, small businesses, and growing brands looking for a reliable
        e-commerce infrastructure.
      </Typography>
    </Box>
  );
};

export default About;
