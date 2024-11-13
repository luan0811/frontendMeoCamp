import { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Select } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getOrdersWithCustomerInfo, getRevenueByMonths, getTotalRevenue, getOrdersByStatus } from '../../services/OrderServices';

const { Option } = Select;

const DashBoard = () => {
    const [revenueData, setRevenueData] = useState<any[]>([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [orderStats, setOrderStats] = useState({ pending: 0, approved: 0, rejected: 0, delivered: 0 });
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [monthlyData, setMonthlyData] = useState<any[]>([]);

    useEffect(() => {
        fetchDashboardData();
    }, [selectedYear]);

    const fetchDashboardData = async () => {
        try {
            const orders = await getOrdersWithCustomerInfo();
            const yearlyData = getRevenueByMonths(orders, selectedYear);
            setMonthlyData(yearlyData);
            
            // Cập nhật dữ liệu cho tháng được chọn
            updateMonthData(selectedMonth - 1, yearlyData);

            // Tính tổng doanh thu
            setTotalRevenue(getTotalRevenue(orders));

            // Thống kê đơn hàng theo trạng thái
            setOrderStats(getOrdersByStatus(orders));
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    const updateMonthData = (monthIndex: number, data: any[]) => {
        const monthData = data[monthIndex].data.map((amount: number, index: number) => ({
            day: index + 1,
            revenue: amount
        }));
        setRevenueData(monthData);
    };

    const handleMonthChange = (month: number) => {
        setSelectedMonth(month);
        updateMonthData(month - 1, monthlyData);
    };

    const handleYearChange = (year: number) => {
        setSelectedYear(year);
    };

    return (
        <div style={{ padding: '70px' }}>
            <h1>Thống kê doanh thu</h1>
            
            {/* Bộ lọc thời gian */}
            <Row gutter={16} style={{ marginBottom: '20px' }}>
                <Col span={4}>
                    <Select
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        style={{ width: '100%' }}
                    >
                        {Array.from({ length: 12 }, (_, i) => (
                            <Option key={i + 1} value={i + 1}>Tháng {i + 1}</Option>
                        ))}
                    </Select>
                </Col>
                <Col span={4}>
                    <Select
                        value={selectedYear}
                        onChange={handleYearChange}
                        style={{ width: '100%' }}
                    >
                        {Array.from({ length: 5 }, (_, i) => {
                            const year = new Date().getFullYear() - 2 + i;
                            return <Option key={year} value={year}>{year}</Option>;
                        })}
                    </Select>
                </Col>
            </Row>

            {/* Thống kê tổng quan */}
            <Row gutter={16} style={{ marginBottom: '20px' }}>
                <Col span={6}>
                    <Card>
                        <Statistic 
                            title="Tổng doanh thu" 
                            value={totalRevenue} 
                            suffix="VND"
                            precision={0}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Đơn chờ duyệt" value={orderStats.pending} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Đơn đã duyệt" value={orderStats.approved + orderStats.delivered} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Đơn từ chối" value={orderStats.rejected} />
                    </Card>
                </Col>
            </Row>

            {/* Biểu đồ doanh thu */}
            <Card>
                <h2>Biểu đồ doanh thu tháng {selectedMonth}/{selectedYear}</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={revenueData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" label={{ value: 'Ngày', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Doanh thu (VND)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => `${value.toLocaleString()} VND`} />
                        <Legend />
                        <Line 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke="#8884d8" 
                            name="Doanh thu"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default DashBoard;

