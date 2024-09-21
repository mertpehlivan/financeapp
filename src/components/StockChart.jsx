import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

/**
 * StockChart Component
 * @param {Object} props
 * @param {Array} props.data - Portfolio data including categories and stocks.
 * @param {number} props.width - Width of the chart.
 * @param {number} props.height - Height of the chart.
 * @param {Object} props.lineColors - Object mapping stock names to line colors.
 */
const StockChart = ({ data, width = 600, height = 300, lineColors = {} }) => {
    // Simulate historical price data for demonstration purposes
    const simulateHistoricalData = (stock) => {
        const today = new Date();
        const dataPoints = Array.from({ length: 30 }, (_, index) => {
            const date = new Date(today);
            date.setDate(date.getDate() - index);
            return {
                date: date.toLocaleDateString(),
                [stock.name]: stock.currentPrice + Math.random() * 100 - 50 // Simulate price fluctuation
            };
        }).reverse(); // Reverse to show the most recent dates on the right
        return dataPoints;
    };

    // Prepare chart data
    const chartData = data.categories.flatMap(category => 
        category.stocks.flatMap(stock => simulateHistoricalData(stock))
    );

    // Get unique stock names for legend and lines
    const stockNames = Array.from(new Set(data.categories.flatMap(category => 
        category.stocks.map(stock => stock.name)
    )));

    return (
        <ResponsiveContainer width={width} height={height}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
                <YAxis />
                <Tooltip formatter={(value, name) => [`$${value.toFixed(2)}`, name]} />
                <Legend />
                {stockNames.map((stockName) => (
                    <Line
                        key={stockName}
                        type="monotone"
                        dataKey={stockName}
                        stroke={lineColors[stockName] || '#8884d8'}
                        name={stockName}
                        dot={false}
                        activeDot={{ r: 8 }}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

StockChart.propTypes = {
    data: PropTypes.shape({
        categories: PropTypes.arrayOf(
            PropTypes.shape({
                stocks: PropTypes.arrayOf(
                    PropTypes.shape({
                        name: PropTypes.string.isRequired,
                        currentPrice: PropTypes.number.isRequired
                    })
                ).isRequired
            })
        ).isRequired
    }).isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    lineColors: PropTypes.object
};

export default StockChart;
