export const investors = [
    {
        id: 1,
        firstname: "Joe",
        lastname: "Doe",
        email: "joe.doe@example.com",
        password: "123"
    },
    {
        id: 2,
        firstname: "Jane",
        lastname: "Smith",
        email: "jane.smith@example.com",
        password: "123"
    },
    {
        id: 3,
        firstname: "Michael",
        lastname: "Johnson",
        email: "michael.johnson@example.com",
        password: "123"
    },
    {
        id: 4,
        firstname: "Emily",
        lastname: "Davis",
        email: "emily.davis@example.com",
        password: "123"
    },
    {
        id: 5,
        firstname: "Daniel",
        lastname: "Brown",
        email: "daniel.brown@example.com",
        password: "123"
    }
];
[
    {
        "id": 1,
        "name": "Tech Innovators Portfolio",
        "creationPrice": "$1.5M",
        "description": "A portfolio focusing on emerging technologies and innovative companies with high growth potential.",
        "investor": {
            "id": 1,
            "firstname": "Joe",
            "lastname": "Doe",
            "email": "joe.doe@example.com"
        },
        "categories": [
            {
                "id": 0,
                "name": "Expected for this summer",
                "description": "Stocks anticipated to perform well in the upcoming summer months.",
                "stocks": [
                    {
                        "id": 0,
                        "name": "ETHBTC",
                        "currentPrice": 3000,
                        "note": "A significant increase is expected in the 2nd month for this coin.",
                        "type": "Followed Stock",
                        "expectedBuyPrice": "$2,500.00",
                        "historicalPerformance": "Up 20% in the last 6 months",
                        "volatility": "High",
                        "marketCap": "$350B"
                    }
                ]
            },
            {
                "id": 1,
                "name": "Year-end goals",
                "description": "Stocks targeted for significant performance by the end of the year.",
                "stocks": [
                    {
                        "id": 5,
                        "name": "MSFT",
                        "currentPrice": 290,
                        "note": "Microsoft is a strong player in the technology sector.",
                        "type": "Held Stock",
                        "expectedSellPrice": "$320.00",
                        "historicalPerformance": "Strong growth with consistent performance",
                        "volatility": "Medium",
                        "marketCap": "$2.6T"
                    }
                ]
            }
        ]
    }
]



export const portfolioList = [
    {
        id: 1,
        name: 'Tech Innovators Portfolio',
        creationPrice: '$1.5M',
        description: 'A portfolio focusing on emerging technologies and innovative companies with high growth potential.',
        investor: {
            id: 1,
            firstname: "Joe",
            lastname: "Doe",
            email: "joe.doe@example.com",
        },
        categories: [
            {
                id: 0,
                name: "Expected for this summer",
                description: "Stocks anticipated to perform well in the upcoming summer months.",
                stocks: [
                    {
                        id: 0,
                        name: 'ETHBTC',
                        currentPrice: 3000,
                        note: "A significant increase is expected in the 2nd month for this coin.",
                        type: "Followed Stock",
                        expectedBuyPrice: "$2,500.00",
                        historicalPerformance: "Up 20% in the last 6 months",
                        volatility: "High",
                        marketCap: "$350B"
                    },
                    {
                        id: 1,
                        name: 'LTCBTC',
                        currentPrice: 3000,
                        note: "A significant increase is expected in the 2nd month for this coin.",
                        type: "Held Stock",
                        expectedSellPrice: "$1,500.00",
                        historicalPerformance: "Stable with occasional spikes",
                        volatility: "Medium",
                        marketCap: "$200B"
                    }
                ]
            },
            {
                id: 1,
                name: "Year-end goals",
                description: "Stocks targeted for significant performance by the end of the year.",
                stocks: [
                    {
                        id: 2,
                        name: 'TSLA',
                        currentPrice: 700,
                        note: "A significant increase is expected in Tesla stocks by the end of the year.",
                        type: "Followed Stock",
                        expectedBuyPrice: "$650.00",
                        historicalPerformance: "Up 50% in the past year",
                        volatility: "High",
                        marketCap: "$750B"
                    },
                    {
                        id: 3,
                        name: 'AMZN',
                        currentPrice: 3200,
                        note: "A 15% growth is expected in Amazon stocks by the end of the year.",
                        type: "Held Stock",
                        expectedSellPrice: "$3,500.00",
                        historicalPerformance: "Consistent growth over the past 5 years",
                        volatility: "Medium",
                        marketCap: "$1.5T"
                    },
                    {
                        id: 4,
                        name: 'AAPL',
                        currentPrice: 170,
                        note: "Apple stocks have long-term growth potential.",
                        type: "Followed Stock",
                        expectedBuyPrice: "$160.00",
                        historicalPerformance: "Steady growth with occasional highs",
                        volatility: "Medium",
                        marketCap: "$2.7T"
                    },
                    {
                        id: 5,
                        name: 'MSFT',
                        currentPrice: 290,
                        note: "Microsoft is a strong player in the technology sector.",
                        type: "Held Stock",
                        expectedSellPrice: "$320.00",
                        historicalPerformance: "Strong growth with consistent performance",
                        volatility: "Medium",
                        marketCap: "$2.6T"
                    }
                ]
            }
        ]
    },
    {
        id: 1,
        name: 'Tech Innovators Portfolio',
        creationPrice: '$1.5M',
        description: 'A portfolio focusing on emerging technologies and innovative companies with high growth potential.',
        investor: {
            id: 1,
            firstname: "Joe",
            lastname: "Doe",
            email: "joe.doe@example.com",
        },
        categories: [
            {
                id: 0,
                name: "Expected for this summer",
                description: "Stocks anticipated to perform well in the upcoming summer months.",
                stocks: [
                    {
                        id: 0,
                        name: 'ETHBTC',
                        currentPrice: 3000,
                        note: "A significant increase is expected in the 2nd month for this coin.",
                        type: "Followed Stock",
                        expectedBuyPrice: "$2,500.00",
                        historicalPerformance: "Up 20% in the last 6 months",
                        volatility: "High",
                        marketCap: "$350B"
                    },
                    {
                        id: 1,
                        name: 'LTCBTC',
                        currentPrice: 3000,
                        note: "A significant increase is expected in the 2nd month for this coin.",
                        type: "Held Stock",
                        expectedSellPrice: "$1,500.00",
                        historicalPerformance: "Stable with occasional spikes",
                        volatility: "Medium",
                        marketCap: "$200B"
                    }
                ]
            },
            {
                id: 1,
                name: "Year-end goals",
                description: "Stocks targeted for significant performance by the end of the year.",
                stocks: [
                    {
                        id: 2,
                        name: 'TSLA',
                        currentPrice: 700,
                        note: "A significant increase is expected in Tesla stocks by the end of the year.",
                        type: "Followed Stock",
                        expectedBuyPrice: "$650.00",
                        historicalPerformance: "Up 50% in the past year",
                        volatility: "High",
                        marketCap: "$750B"
                    },
                    {
                        id: 3,
                        name: 'AMZN',
                        currentPrice: 3200,
                        note: "A 15% growth is expected in Amazon stocks by the end of the year.",
                        type: "Held Stock",
                        expectedSellPrice: "$3,500.00",
                        historicalPerformance: "Consistent growth over the past 5 years",
                        volatility: "Medium",
                        marketCap: "$1.5T"
                    },
                    {
                        id: 4,
                        name: 'AAPL',
                        currentPrice: 170,
                        note: "Apple stocks have long-term growth potential.",
                        type: "Followed Stock",
                        expectedBuyPrice: "$160.00",
                        historicalPerformance: "Steady growth with occasional highs",
                        volatility: "Medium",
                        marketCap: "$2.7T"
                    },
                    {
                        id: 5,
                        name: 'MSFT',
                        currentPrice: 290,
                        note: "Microsoft is a strong player in the technology sector.",
                        type: "Held Stock",
                        expectedSellPrice: "$320.00",
                        historicalPerformance: "Strong growth with consistent performance",
                        volatility: "Medium",
                        marketCap: "$2.6T"
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'Growth Leaders Portfolio',
        creationPrice: '$2.3M',
        description: 'This portfolio focuses on high-growth companies expected to outperform the market.',
        investor: {
            id: 2,
            firstname: "Jane",
            lastname: "Smith",
            email: "jane.smith@example.com",
        },
        categories: [
            {
                id: 2,
                name: "Long-term investments",
                description: "Stocks with strong potential for long-term growth.",
                stocks: [
                    {
                        id: 6,
                        name: 'AAPL',
                        currentPrice: 150,
                        note: "A 10% growth is expected in Apple stocks by the end of the year.",
                        type: "Held Stock",
                        expectedSellPrice: "$200.00",
                        historicalPerformance: "Consistent growth over the past decade",
                        volatility: "Low",
                        marketCap: "$2.7T"
                    },
                    {
                        id: 7,
                        name: 'GOOGL',
                        currentPrice: 2800,
                        note: "Google stocks have a 20% growth potential in the long term.",
                        type: "Followed Stock",
                        expectedBuyPrice: "$2,700.00",
                        historicalPerformance: "Strong performance with high returns",
                        volatility: "Medium",
                        marketCap: "$1.8T"
                    },
                    {
                        id: 8,
                        name: 'TSLA',
                        currentPrice: 700,
                        note: "Tesla is a leader in the electric vehicle market.",
                        type: "Followed Stock",
                        expectedBuyPrice: "$650.00",
                        historicalPerformance: "High growth but volatile",
                        volatility: "High",
                        marketCap: "$750B"
                    }
                ]
            },
            {
                id: 3,
                name: "Tech giants",
                description: "Investments in major technology companies.",
                stocks: [
                    {
                        id: 9,
                        name: 'MSFT',
                        currentPrice: 290,
                        note: "Microsoft stocks have long-term growth potential.",
                        type: "Held Stock",
                        expectedSellPrice: "$350.00",
                        historicalPerformance: "Steady growth with strong fundamentals",
                        volatility: "Medium",
                        marketCap: "$2.6T"
                    },
                    {
                        id: 10,
                        name: 'FB',
                        currentPrice: 340,
                        note: "A significant jump is expected in Facebook stocks.",
                        type: "Followed Stock",
                        expectedBuyPrice: "$320.00",
                        historicalPerformance: "Growth driven by user base expansion",
                        volatility: "Medium",
                        marketCap: "$900B"
                    },
                    {
                        id: 11,
                        name: 'AMZN',
                        currentPrice: 3200,
                        note: "Amazon is a major player in e-commerce.",
                        type: "Followed Stock",
                        expectedBuyPrice: "$3,000.00",
                        historicalPerformance: "Consistent growth with high returns",
                        volatility: "Medium",
                        marketCap: "$1.5T"
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        name: 'Crypto Pioneers Portfolio',
        creationPrice: '$1.2M',
        description: 'A portfolio dedicated to high-potential cryptocurrencies and DeFi projects.',
        investor: {
            id: 3,
            firstname: "Michael",
            lastname: "Johnson",
            email: "michael.johnson@example.com",
        },
        categories: [
            {
                id: 4,
                name: "Cryptocurrencies",
                description: "Investments in major and emerging cryptocurrencies.",
                stocks: [
                    {
                        id: 12,
                        name: 'BTCUSD',
                        currentPrice: 45000,
                        note: "Bitcoin might experience a significant rise by the end of the year.",
                        type: "Held Stock",
                        expectedSellPrice: "$50,000.00",
                        historicalPerformance: "High growth with high volatility",
                        volatility: "High",
                        marketCap: "$850B"
                    },
                    {
                        id: 13,
                        name: 'ETHUSD',
                        currentPrice: 3000,
                        note: "Ethereum might experience a significant jump in the next quarter.",
                        type: "Followed Stock",
                        expectedBuyPrice: "$2,800.00",
                        historicalPerformance: "Strong growth with high innovation potential",
                        volatility: "High",
                        marketCap: "$350B"
                    },
                    {
                        id: 14,
                        name: 'ADAUSD',
                        currentPrice: 1.2,
                        note: "Cardano has long-term potential.",
                        type: "Followed Stock",
                        expectedBuyPrice: "$1.00",
                        historicalPerformance: "Emerging technology with growth potential",
                        volatility: "Medium",
                        marketCap: "$40B"
                    }
                ]
            },
            {
                id: 5,
                name: "DeFi investments",
                description: "Investments in decentralized finance projects.",
                stocks: [
                    {
                        id: 15,
                        name: 'LINKUSD',
                        currentPrice: 25,
                        note: "Chainlink has significant potential in the DeFi space.",
                        type: "Held Stock",
                        expectedSellPrice: "$40.00",
                        historicalPerformance: "Strong growth in the DeFi sector",
                        volatility: "High",
                        marketCap: "$10B"
                    },
                    {
                        id: 16,
                        name: 'AAVEUSD',
                        currentPrice: 300,
                        note: "Aave is expected to be a leader in the DeFi market.",
                        type: "Followed Stock",
                        expectedBuyPrice: "$280.00",
                        historicalPerformance: "Growth driven by DeFi adoption",
                        volatility: "High",
                        marketCap: "$5B"
                    },
                    {
                        id: 17,
                        name: 'UNIUSD',
                        currentPrice: 25,
                        note: "Uniswap is a major player in decentralized exchanges.",
                        type: "Followed Stock",
                        expectedBuyPrice: "$22.00",
                        historicalPerformance: "High growth with DeFi sector expansion",
                        volatility: "High",
                        marketCap: "$10B"
                    }
                ]
            }
        ]
    }
];
