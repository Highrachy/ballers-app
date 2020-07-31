import React from 'react';
import Sidebar from 'components/layout/Sidebar';
import TopBar from 'components/layout/TopBar';

const BackendPage = ({ children }) => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const closeSidebar = () => {
    document.body.classList.remove('modal-open');
    setShowSidebar(false);
  };

  return (
    <div>
      <Sidebar closeSidebar={closeSidebar} showSidebar={showSidebar} />

      {/* Content Page */}
      <div className="content-page">
        <TopBar />
        {children}
      </div>
    </div>
  );
};

export default BackendPage;
