import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';



const COLORS = ['#a3a3d5', '#a8b3be'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PremiumChart = (
    {
        adminPanelData
    }
) => {
    const data = [
        { name: 'Group A', value: adminPanelData.premium_users },
        { name: 'Group B', value: adminPanelData.non_premium_users },
      
      ];
  return (
<div className='bg-[#F5F5FC] px-3 py-5 w-full md:w-[50%] rounded-md mx-3'>
    <p className='text-center text-xl font-semibold'>Premium Users Chart</p>
    <div className='flex flex-col md:flex-row'>

        <div className='h-full mx-3 mt-4 md:w-[50%]'>
            <p className='font-semibold'>Users List</p>
            <div className='flex justify-between'>
                <p className='mx-2'>Total Users</p>
                <p className='mr-8'>{adminPanelData.total_users}</p>
            </div>
            <div className='flex justify-between'>
                <div className='flex'>
                    <div className='w-4 h-4 bg-[#a3a3d5] mx-2 mt-1 rounded-sm'></div>
                    <p className='mx-2'>Premium Users</p>
                </div>
                <p className='mr-8'>{adminPanelData.premium_users}</p>
            </div>
            <div className='flex justify-between'>
                <div className='flex'>
                    <div className='w-4 h-4 bg-[#a8b3be] mx-2 mt-1 rounded-sm'></div>
                    <p className='mx-2'>Normal Users</p>
                </div>
                <p className='mr-8'>{adminPanelData.non_premium_users}</p>
            </div>
        </div>

        <div className='mx-4 md:mx-0'>
            <PieChart width={250} height={250}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    </div>
</div>

  );
};

export default PremiumChart;
