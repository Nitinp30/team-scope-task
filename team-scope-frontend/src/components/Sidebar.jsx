import { Home, LogOut, Settings, UserCircle, X } from "lucide-react";

const Sidebar = ({ isSidebarOpen, onCloseSidebar, setToken }) => {
  const sidebarItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: UserCircle, label: 'Employees' },
    { icon: Settings, label: 'Settings' },
    { icon: LogOut, label: 'Logout', isLogout: true },
  ];

  const SidebarContent = ({ isMobile = false }) => (
    <nav className="p-4">
      {isMobile && (
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button
            onClick={isMobile ? onCloseSidebar : undefined}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-gray-600 curser-pointer" />
          </button>
        </div>
      )}

      <ul className="space-y-2">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <li key={index}>
              <a
                onClick={() => {
                  if (item.label === 'Logout') {
                    localStorage.removeItem('token')
                    setToken(null)
                  }
                }}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${item.isLogout
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      <aside
        className={`hidden md:block fixed left-0 top-0 h-full bg-white shadow-lg z-30 pt-20 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'
          }`}
      >
        <div className={`overflow-hidden ${isSidebarOpen ? 'w-64' : 'w-0'}`}>
          <SidebarContent />
        </div>
      </aside>

      <aside
        className={`fixed z-50 inset-y-0 left-0 transform transition-transform duration-300 ease-in-out md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } w-64 bg-white shadow-lg`}
      >
        <SidebarContent isMobile={true} />
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onCloseSidebar}
        />
      )}
    </>
  );
};

export default Sidebar