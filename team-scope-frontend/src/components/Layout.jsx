import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { ApolloProvider } from '@apollo/client';
import { client } from "../graphql/ApolloClient";

const Layout = ({ setToken, currentEmployee }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        setToken={setToken}
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <Sidebar
        setToken={setToken}
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={closeSidebar}
      />
      <ApolloProvider client={client}>

        <main className={`transition-all duration-300 p-6 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-0'
          }`}>
          <div className="max-w-7xl mx-auto">
            <MainContent currentEmployee={currentEmployee}/>
          </div>
        </main>
      </ApolloProvider>
    </div>
  );
};
export default Layout;