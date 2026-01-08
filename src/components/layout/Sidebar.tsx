import {
  LayoutDashboard,
  Building2,
  Users,
  FileQuestion,
  AlertTriangle,
  Calendar,
  Brain,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  label: string;
  id: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: Building2, label: 'Sites', id: 'sites' },
  { icon: Users, label: 'Subjects', id: 'subjects' },
  { icon: FileQuestion, label: 'Queries', id: 'queries', badge: 8 },
  { icon: AlertTriangle, label: 'SAE Dashboard', id: 'sae', badge: 1 },
  { icon: Calendar, label: 'Visit Tracker', id: 'visits' },
  { icon: Brain, label: 'AI Insights', id: 'insights', badge: 3 },
];

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ activeSection, onSectionChange, collapsed, setCollapsed }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 z-50",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-20 flex items-center px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">AA</span>
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-bold text-lg text-sidebar-foreground tracking-tight">Anvaya-AI</h1>
              <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60 font-medium">powered by Team Samuha</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  activeSection === item.id
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium",
                        activeSection === item.id
                          ? "bg-white/20 text-white"
                          : "bg-sidebar-primary/20 text-sidebar-primary"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          {!collapsed && <span className="text-sm">Collapse</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
