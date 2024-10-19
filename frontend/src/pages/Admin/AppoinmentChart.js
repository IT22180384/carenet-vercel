import React from 'react';
import AppointmentChartCmp from '../../components/Vinuk/AppoinmentChartCmp';

function AppoinmentChart() {
  return (
    <div className="space-y-10">
         {/* User Flow Chart */}
         <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="w-full max-w-4xl mx-auto">
                <AppointmentChartCmp />
            </div>
        </div>      
    </div>
  );
}

export default AppoinmentChart;
