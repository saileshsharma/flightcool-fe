import { Link } from 'react-router-dom';

interface SiteNode {
  name: string;
  path: string;
  icon: React.ReactNode;
  description: string;
  children?: SiteNode[];
}

const siteStructure: SiteNode[] = [
  {
    name: 'Authentication',
    path: '/login',
    icon: <LockIcon />,
    description: 'User authentication and access control',
    children: [
      {
        name: 'Login',
        path: '/login',
        icon: <LoginIcon />,
        description: 'Sign in to your account',
      },
      {
        name: 'Logout',
        path: '/logout',
        icon: <LogoutIcon />,
        description: 'Sign out of your account',
      },
    ],
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
    description: 'Main user dashboard and overview',
    children: [
      {
        name: 'Flight Tracker',
        path: '/dashboard/flights',
        icon: <PlaneIcon />,
        description: 'Track your flights in real-time',
      },
    ],
  },
  {
    name: 'Insurance',
    path: '/insurance',
    icon: <ShieldIcon />,
    description: 'Flight insurance management',
    children: [
      {
        name: 'Quote Calculator',
        path: '/insurance/quote',
        icon: <CalculatorIcon />,
        description: 'Get instant insurance quotes',
      },
      {
        name: 'Policy Holders',
        path: '/insurance/policies',
        icon: <UsersIcon />,
        description: 'Manage policy holders',
      },
    ],
  },
];

export function SiteMapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">FlightCool</span>
            </Link>
            <Link
              to="/dashboard"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <ArrowLeftIcon />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <SitemapIcon />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Site Map</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Navigate through all pages and features of FlightCool. Click any section to explore.
          </p>
        </div>

        {/* Site Map Tree */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {siteStructure.map((section, index) => (
            <SectionCard key={section.path} section={section} index={index} />
          ))}
        </div>

        {/* Visual Hierarchy Tree */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Visual Hierarchy
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 overflow-x-auto">
            <div className="min-w-[600px]">
              <TreeView />
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quick Navigation
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {siteStructure.flatMap(section => [section, ...(section.children || [])]).map(node => (
              <QuickNavLink key={node.path + node.name} node={node} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2024 FlightCool. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionCard({ section, index }: { section: SiteNode; index: number }) {
  const colors = [
    { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-100 text-blue-600', hover: 'hover:border-blue-400' },
    { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'bg-emerald-100 text-emerald-600', hover: 'hover:border-emerald-400' },
    { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-100 text-purple-600', hover: 'hover:border-purple-400' },
  ];
  const color = colors[index % colors.length];

  return (
    <div className={`${color.bg} rounded-2xl border-2 ${color.border} ${color.hover} transition-all duration-200`}>
      {/* Section Header */}
      <Link
        to={section.path}
        className="block p-6 border-b border-gray-200/50"
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color.icon}`}>
            {section.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{section.name}</h3>
            <p className="text-sm text-gray-600">{section.description}</p>
          </div>
        </div>
      </Link>

      {/* Children */}
      {section.children && section.children.length > 0 && (
        <div className="p-4 space-y-2">
          {section.children.map((child) => (
            <Link
              key={child.path + child.name}
              to={child.path}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/70 hover:bg-white transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 group-hover:text-gray-700">
                {child.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {child.name}
                </p>
                <p className="text-xs text-gray-500">{child.description}</p>
              </div>
              <ChevronRightIcon />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function TreeView() {
  return (
    <div className="flex flex-col items-center">
      {/* Root */}
      <div className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg">
        🏠 FlightCool Home
      </div>
      
      {/* Connector */}
      <div className="w-0.5 h-8 bg-gray-300" />
      
      {/* Branches Container */}
      <div className="relative">
        {/* Horizontal Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-0.5 bg-gray-300" />
        
        {/* Three Branches */}
        <div className="flex gap-8 pt-0">
          {siteStructure.map((section, sectionIndex) => (
            <div key={section.path} className="flex flex-col items-center">
              {/* Vertical connector */}
              <div className="w-0.5 h-8 bg-gray-300" />
              
              {/* Section Box */}
              <Link
                to={section.path}
                className={`px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all ${
                  sectionIndex === 0
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : sectionIndex === 1
                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                {section.name}
              </Link>
              
              {/* Children */}
              {section.children && section.children.length > 0 && (
                <>
                  <div className="w-0.5 h-6 bg-gray-300" />
                  <div className="relative">
                    {section.children.length > 1 && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-0.5 bg-gray-200" />
                    )}
                    <div className="flex gap-4 pt-0">
                      {section.children.map((child) => (
                        <div key={child.path + child.name} className="flex flex-col items-center">
                          <div className="w-0.5 h-6 bg-gray-200" />
                          <Link
                            to={child.path}
                            className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-all whitespace-nowrap"
                          >
                            {child.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickNavLink({ node }: { node: SiteNode }) {
  return (
    <Link
      to={node.path}
      className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group"
    >
      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 group-hover:text-blue-600 transition-colors">
        {node.icon}
      </div>
      <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 text-center">
        {node.name}
      </span>
    </Link>
  );
}

// Icons
function LockIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function LoginIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function CalculatorIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function SitemapIcon() {
  return (
    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
