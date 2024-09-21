import React, { useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, Divider, ListItemIcon, Grid, Pagination } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const NotificationPage = () => {
  // Sayfa başına gösterilecek bildirim sayısı
  const itemsPerPage = 5;

  // Pagination state'leri
  const [page, setPage] = useState(1);

  // Sayfa değişikliği işlemi
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const notifications = [
    { type: 'follow', message: 'John Doe started following you.', time: '2 minutes ago' },
    { type: 'comment', message: 'Jane Smith commented on your post.', time: '10 minutes ago' },
    { type: 'like', message: 'David Johnson liked your photo.', time: '30 minutes ago' },
    { type: 'follow', message: 'Emily White started following you.', time: '1 hour ago' },
    { type: 'comment', message: 'Michael Brown commented on your post.', time: '2 hours ago' },
    { type: 'like', message: 'Anna Lee liked your status update.', time: '3 hours ago' },
    { type: 'follow', message: 'James Williams started following you.', time: '5 hours ago' },
    { type: 'comment', message: 'Olivia Harris commented on your photo.', time: '7 hours ago' },
    { type: 'like', message: 'Chris Martinez liked your post.', time: '10 hours ago' },
    { type: 'follow', message: 'Sophia Davis started following you.', time: '1 day ago' },
  ];


  // Aktif sayfaya göre bildirimleri dilimleme
  const paginatedNotifications = notifications.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Bildirim türüne göre ikon getirme fonksiyonu
  const getIcon = (type) => {
    switch (type) {
      case 'follow':
        return <PersonAddIcon />;
      case 'comment':
        return <CommentIcon />;
      case 'like':
        return <ThumbUpIcon />;
      default:
        return null;
    }
  };


  return (
    <Grid item xs={12} sm={8} md={9} lg={10}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>Notifications</Typography>
        <List>
          {paginatedNotifications.map((notification, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemIcon>
                  {getIcon(notification.type)}
                </ListItemIcon>
                <ListItemText
                  primary={notification.message}
                  secondary={notification.time}
                />
              </ListItem>
              {index < paginatedNotifications.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        {/* Pagination Bileşeni */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Pagination
            count={Math.ceil(notifications.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default NotificationPage;
