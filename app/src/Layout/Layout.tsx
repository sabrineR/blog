import React from "react";
import PageContainer from "./PageContainer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <PageContainer />
      </main>
      <footer className="bg-gray-200 py-4 mt-auto">
        <div className="container mx-auto text-center">
          Primaa Blog ©{new Date().getFullYear()} Créé par Sabrine BEN SASSI
        </div>
      </footer>
    </div>
  );
};

export default Layout;
