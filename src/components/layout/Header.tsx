import { Bell, Search, RefreshCw, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search sites, subjects..." 
            className="w-64 pl-9 bg-muted/50 border-border/50 focus:bg-card"
          />
        </div>

        {/* Refresh */}
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <RefreshCw className="w-4 h-4" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        {/* User */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-foreground">Dr. Sarah Chen</p>
            <p className="text-xs text-muted-foreground">Clinical Data Manager</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
