import React, { useContext } from 'react'
import { authcontext } from '../Context/Context'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts"

const Charts = () => {
    const { chart } = useContext(authcontext)
    console.log(chart)

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"]

    return (
        <div className='w-full h-[350px] bg-white rounded-xl shadow-sm border border-gray-200 p-4'>
            <h2 className='text-lg font-semibold mb-2'>Spending Breakdown</h2>
            <div className='h-[300px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chart || []}
                            dataKey="totalamount"
                            nameKey="paymentfor"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {chart?.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Charts