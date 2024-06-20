import React from "react";
import PageContainer from "./PageContainer";

const Layout: React.FC = () => {
  return (
    <>
      <div data-testid="layout-component">
        <main>
          <PageContainer />
        </main>
      </div>
    </>
  );
};

export default Layout;
