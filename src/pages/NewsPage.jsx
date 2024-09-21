import React, { useState } from 'react';
import { Container, Grid, Paper, Stack, Typography, Pagination, IconButton, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { OpenInNew } from '@mui/icons-material';

const newsData = [
    {
        title: "İstanbul Borsası rekor kırdı; ardında büyük operasyon iddiası",
        link: "https://yetkinreport.com/2023/08/18/istanbul-borsasi-rekor-kirdi-ardinda-buyuk-operasyon-iddiasi/",
        description: "İstanbul Borsası 2023 yılında halka arzları çekme konusunda Londra, Frankfurt ve Milan’ı geride bırakarak Dünya’nın ilk 10 borsası arasına girdi.",
        imageUrl: "https://yetkinreport.com/wp-content/uploads/2023/08/borsaistanbul.jpeg"
    },
    {
        title: "Kazanç Açıklaması: Covalon Geçen Yılın Aynı Dönemine Göre %47 Gelir Artışı Bildirdi",
        link: "https://tr.investing.com/news/stock-market-news/kazanc-aciklamasi-covalon-gecen-yilin-ayni-donemine-gore-47-gelir-artisi-bildirdi-2391074",
        description: "Tıbbi teknolojiler alanında lider olan Covalon Technologies Ltd. (COV), 2024 mali yılının üçüncü çeyreği için güçlü bir finansal performans rapor etti. Şirket, geçen yılın aynı dönemine kıyasla... ",
        imageUrl: "https://i-invdn-com.investing.com/news/LYNXMPEB230DM_L.jpg"
    },
    {
        title: "Estee Lauder'ın önünde birçok olumlu gelişme var - Piper Sandler",
        link: "https://tr.investing.com/news/stock-market-news/estee-lauderin-onunde-bircok-olumlu-gelisme-var-piper-sandler-2391427",
        description: "Piper Sandler analistleri, Perşembe günü yayınladıkları bir notta Estee Lauder'ı (EL) Nötr'den Ağırlık Ver'e yükselttiler. Bu karar, şirketin son mali 4. çeyrek kazanç raporunun...",
        imageUrl: "https://i-invdn-com.investing.com/news/LYNXNPEB7G0KW_S.jpg"
    },
    {
        title: "Küresel piyasalar haftanın son gününde pozitif seyrediyor",
        link: "https://mynet.com/haberler/ekonomi/kuresel-piyasalar-haftanin-son-gununde-pozitif-seyrediyor",
        description: "ABD'de bu hafta açıklanan enflasyon verilerinin fiyat baskılarının hafiflediğine işaret etmesi sonrası dün açıklanan perakende satış verileri de tüketici harcamalarının güçlü kaldığını ortaya koydu...",
        imageUrl: "https://imgrosetta.mynet.com.tr/file/19015347/19015347-728xauto.jpg"
    },
    {
        title: "Çin'in ekonomisi toparlanıyor",
        link: "https://npr.org/sections/business/2023/10/19/china-economy-recovery",
        description: "Çin hükümeti, ekonomik büyümeyi canlandırmak için yeni teşvik paketlerini duyurdu. Bu durum, küresel piyasalarda olumlu bir hava estirdi...",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4X1tA8WpAJdJ7u93Uc7Ek0u-VBp3ULMm-0w&s"
    },
    {
        title: "Apple, iPhone üretimini artırıyor",
        link: "https://theverge.com/2023/10/18/apple-iphone-production-increase",
        description: "Apple, yeni nesil iPhone'ların üretimini artırmayı planlıyor. Bu adım, tedarik zincirine olumlu etkiler yapması bekleniyor...",
        imageUrl: "https://imgrosetta.mynet.com.tr/file/10420537/10420537-728xauto.jpg"
    },
    {
        title: "Altın fiyatları yükselişte",
        link: "https://gold.org/news/gold-prices-rise-amid-global-uncertainties",
        description: "Yatırımcılar, altına yönelmeye devam ediyor. Küresel belirsizlikler, altın fiyatlarını yukarı çekiyor...",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0eYQ_EcqJBz1mFSxX7dKLdoci9z89aNysQA&s"
    },
    {
        title: "Tesla'nın yeni modeli büyük ilgi gördü",
        link: "https://motor1.com/news/2022-tesla-model-s-launch",
        description: "Tesla, yeni elektrikli aracını tanıttı ve piyasaya sürdü. Araç, satışa sunulmadan önce büyük ilgi topladı...",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNJOHURdevruzWcxG4_1iI9Q0N6eHvIBkeSA&s"
    }
];


const NewsCard = ({ data }) => {
    return (
        <Stack>


            <Paper
                elevation={3}
                sx={{
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: 6
                    },
                    bgcolor: 'background.default', // Ensuring consistent background color
                    borderRadius: '8px'
                }}>
                <Stack alignItems="stretch" height={500} direction={{ xs: 'column', sm: 'column' }} p={2} spacing={2}>
                    <img
                        src={data.imageUrl}
                        alt={data.title}
                        width="100%"
                        height={200}
                        style={{ borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <Stack p={1}>
                        <Link
                            component={RouterLink}
                            to={data.link}
                            target='_blank'
                            sx={{
                                color: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none'
                            }}>
                            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                                {data.title}
                            </Typography>
                            <IconButton size="small" sx={{ ml: 1 }}>
                                <OpenInNew />
                            </IconButton>
                        </Link>
                        <Typography variant='body2' color="textSecondary" mt={1}>
                            {data.description}
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    );
}

const NewsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    // Calculate the items to show on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedNews = newsData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Container>
            <Stack mt={2} mb={2}>
                <Typography variant='h4'>Market news</Typography>
                <Divider/>
            </Stack>
            <Grid container spacing={3} >
                {paginatedNews.map((data, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <NewsCard data={data} />
                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={Math.ceil(newsData.length / itemsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
                sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}
            />
        </Container>
    );
}

export default NewsPage;