import React from 'react';
import Sidebar from 'components/layout/Sidebar';
import { Doughnut } from 'react-chartjs-2';

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const closeSidebar = () => {
    document.body.classList.remove('modal-open');
    setShowSidebar(false);
  };

  return (
    <div>
      <Sidebar closeSidebar={closeSidebar} showSidebar={showSidebar} />
      <div className="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 mx-auto">
              <Doughnut
                data={{
                  labels: ['Red', 'Green', 'Yellow'],
                  datasets: [
                    {
                      data: [2, 6, 1],
                      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    },
                  ],
                  // datasets: [
                  //   {
                  //     data: [1],
                  //     backgroundColor: ['#000000'],
                  //     hoverBackgroundColor: ['#111111'],
                  //   },
                  // ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  cutoutPercentage: 80,
                  legend: {
                    display: false,
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
