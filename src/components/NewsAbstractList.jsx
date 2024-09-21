import { Box, Button, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import CryptoCardList from '../components/CryptoCardList';
import '../styles/HomePage.css';
import { Link } from 'react-router-dom';
import { More } from '@mui/icons-material';

const newsData = [
    {
        title: "İstanbul Borsası rekor kırdı; ardında büyük operasyon iddiası",
        description: "İstanbul Borsası 2023 yılında halka arzları çekme konusunda Londra, Frankfurt ve Milan’ı geride bırakarak Dünya’nın ilk 10 borsası arasına girdi.",
        imageUrl: "https://yetkinreport.com/wp-content/uploads/2023/08/borsaistanbul.jpeg"
    },
    {
        title: "Kazanç Açıklaması: Covalon Geçen Yılın Aynı Dönemine Göre %47 Gelir Artışı Bildirdi",
        description: "Tıbbi teknolojiler alanında lider olan Covalon Technologies Ltd. (COV), 2024 mali yılının üçüncü çeyreği için güçlü bir finansal performans rapor etti. Şirket, geçen yılın aynı dönemine kıyasla... ",
        imageUrl: "https://i-invdn-com.investing.com/news/LYNXMPEB230DM_L.jpg"
    },
    {
        title: "Estee Lauder'ın" + "önünde birçok olumlu gelişme var" + "- Piper Sandler",
        description: "Piper Sandler analistleri, Perşembe günü yayınladıkları bir notta Estee Lauder'ı (EL) Nötr'den Ağırlık Ver'e yükselttiler. Bu karar, şirketin son mali 4. çeyrek kazanç raporunun...",
        imageUrl: "https://i-invdn-com.investing.com/news/LYNXNPEB7G0KW_S.jpg"
    },
    {
        title: "Küresel piyasalar haftanın son gününde pozitif seyrediyor",
        description: "ABD'de bu hafta açıklanan enflasyon verilerinin fiyat baskılarının hafiflediğine işaret etmesi sonrası dün açıklanan perakende satış verileri de tüketici harcamalarının güçlü kaldığını ortaya koydu...",
        imageUrl: "https://imgrosetta.mynet.com.tr/file/19015347/19015347-728xauto.jpg"
    },
    // Add more news items with images here
];
const NewsAbstractList = () => {

    return (
        <Grid item xs={12}>
            <Stack mb={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant='h4'>Market news</Typography>
                    <Link to="/news">
                        <Button startIcon={<More />}>

                            <Typography>More news</Typography>
                        </Button>
                    </Link>
                </Stack>

                <Divider />
            </Stack>
            <Grid container spacing={2}>
                {newsData.map((news, index) => (
                    <Grid item xs={3}>

                        <Paper

                            key={index}
                        >
                            <Stack p={1} height={450} alignItems="stretch">

                                <img
                                    src={news.imageUrl}
                                    alt={news.title}
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover',
                                        borderRadius: '4px'
                                    }}
                                />
                                <Box sx={{ paddingTop: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        <b>
                                            {news.title}
                                        </b>
                                    </Typography>
                                    <Typography variant="body2">
                                        {news.description}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}

export default NewsAbstractList