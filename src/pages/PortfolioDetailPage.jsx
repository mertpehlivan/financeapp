import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Card, CardContent, Grid, Paper, List, ListItem, ListItemText, Divider, Stack, Avatar, TextField, Button, IconButton } from '@mui/material';
import { AttachMoney, TrendingUp, ShowChart, PieChart, Info, ThumbUp } from '@mui/icons-material';
import { portfolioList } from '../service/portfolioList';
import StockChart from '../components/StockChart';

const PortfolioDetailPage = () => {
    const { id } = useParams();
    const portfolio = portfolioList.find(port => port.id === parseInt(id));
    const [comments, setComments] = useState([]);  // Yorumları yönetmek için state
    const [likeCount, setLikeCount] = useState(0); // Beğeni sayısını yönetmek için state
    const [newComment, setNewComment] = useState(""); // Yeni yorum girişi için state
    const [user, setUser] = useState({}); // Kullanıcı bilgileri için state

    // Kullanıcı bilgilerini localStorage'den alıyoruz
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    if (!portfolio) {
        return <Typography variant="h6">Portfolio not found with id: {id}</Typography>;
    }

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            const comment = {
                text: newComment,
                user: user,
            };
            setComments([...comments, comment]); // Yorumları güncelle
            setNewComment(""); // Yorum alanını sıfırla
        }
    };

    const handleLike = () => {
        setLikeCount(likeCount + 1); // Beğeni sayısını arttır
    };

    return (
        <Grid item xs={12} sm={8} md={9} lg={10}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper>
                        <Stack p={3}>
                            <Typography variant="h4" gutterBottom>
                                {portfolio.name}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                <AttachMoney /> Creation Price: {portfolio.creationPrice}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {portfolio.description}
                            </Typography>
                            <Link to={`/home/investors/${portfolio.investor.id}`}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Avatar />

                                    <Typography>{portfolio.investor.firstname} {portfolio.investor.lastname}</Typography>

                                </Stack>
                            </Link>
                            {/* Beğeni düğmesi */}

                        </Stack>
                    </Paper>
                </Grid>

                {portfolio.categories.map((category) => (
                    <Grid item xs={12} key={category.id}>
                        <Card style={{ marginBottom: 20 }}>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    <PieChart /> {category.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" paragraph>
                                    {category.description}
                                </Typography>

                                <StockChart data={portfolio} />

                                <Divider style={{ margin: '20px 0' }} />

                                <Grid container spacing={2}>
                                    {category.stocks.map((stock) => (
                                        <Grid item xs={12} sm={6} md={4} key={stock.id}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6"><ShowChart /> {stock.name}</Typography>
                                                    <Typography variant="body2"><AttachMoney /> Current Price: ${stock.currentPrice}</Typography>
                                                    <Typography variant="body2"><TrendingUp /> Type: {stock.type}</Typography>
                                                    {stock.type === 'Followed Stock' ? (
                                                        <Typography variant="body2"><AttachMoney /> Expected Buy Price: {stock.expectedBuyPrice}</Typography>
                                                    ) : (
                                                        <Typography variant="body2"><AttachMoney /> Expected Sell Price: {stock.expectedSellPrice}</Typography>
                                                    )}
                                                    <Typography variant="body2"><TrendingUp /> Historical Performance: {stock.historicalPerformance}</Typography>
                                                    <Typography variant="body2"><Info /> Volatility: {stock.volatility}</Typography>
                                                    <Typography variant="body2"><Info /> Market Cap: {stock.marketCap}</Typography>
                                                    <Typography variant="body2" style={{ fontStyle: 'italic' }}>{stock.note}</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>

                                {/* Yorum bölümü */}

                            </CardContent>
                            <Stack alignItems="end">
                                <IconButton onClick={handleLike} color="primary">
                                    <ThumbUp /> {likeCount}
                                </IconButton>
                            </Stack>
                        </Card>
                    </Grid>
                ))}
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="h6" gutterBottom>Comments</Typography>
                <List>
                    {comments.map((comment, index) => (
                        <ListItem key={index} alignItems="flex-start">
                            <Avatar />
                            <ListItemText
                                primary={`${comment.user.firstname} ${comment.user.lastname}`}
                                secondary={comment.text}
                            />
                        </ListItem>
                    ))}
                </List>
                <TextField
                    label="Add a comment"
                    variant="outlined"
                    fullWidth
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCommentSubmit}
                    style={{ marginTop: '10px' }}
                >
                    Submit Comment
                </Button>
            </Grid>
        </Grid>
    );
};

export default PortfolioDetailPage;
