import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Settings, 
  Bell, 
  BarChart3, 
  Users, 
  DollarSign,
  Activity,
  TrendingUp
} from "lucide-react";

/**
 * Dashboard Page Component
 * 
 * A basic dashboard layout featuring:
 * - Welcome message
 * - Key metrics cards
 * - Quick actions
 * - Recent activity placeholder
 * - Navigation to other sections
 * 
 * This is a starting point that can be expanded with:
 * - Real data integration
 * - Charts and analytics
 * - User management
 * - Settings panels
 * 
 * @component
 */
export default function Dashboard() {
  // Mock data - replace with real data from your API/database
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "Revenue",
      value: "$12,345",
      change: "+8%",
      changeType: "positive" as const,
      icon: DollarSign
    },
    {
      title: "Active Sessions",
      value: "456",
      change: "-2%",
      changeType: "negative" as const,
      icon: Activity
    },
    {
      title: "Growth Rate",
      value: "23%",
      change: "+5%",
      changeType: "positive" as const,
      icon: TrendingUp
    }
  ];

  const quickActions = [
    {
      title: "View Analytics",
      description: "Check your performance metrics",
      icon: BarChart3,
      href: "/dashboard/analytics"
    },
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      icon: Users,
      href: "/dashboard/users"
    },
    {
      title: "Settings",
      description: "Configure your application",
      icon: Settings,
      href: "/dashboard/settings"
    },
    {
      title: "Notifications",
      description: "Manage your notifications",
      icon: Bell,
      href: "/dashboard/notifications"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back! Here's what's happening with your app.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Admin</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span className={`flex items-center space-x-1 ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <span>{stat.change}</span>
                    </span>
                    <span>from last month</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Welcome Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Hello World! 🎉</CardTitle>
                <CardDescription>
                  Your dashboard is ready! This is a basic template that you can customize and expand.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">What's Next?</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Connect your database and APIs</li>
                    <li>• Add real data and analytics</li>
                    <li>• Customize the UI to match your brand</li>
                    <li>• Add user authentication and permissions</li>
                    <li>• Implement your business logic</li>
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline">
                    View Documentation
                  </Button>
                  <Button size="sm" variant="outline">
                    Customize Theme
                  </Button>
                  <Button size="sm" variant="outline">
                    Add Components
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start h-auto p-4"
                      asChild
                    >
                      <a href={action.href} className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <div className="text-left">
                          <div className="font-medium">{action.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {action.description}
                          </div>
                        </div>
                      </a>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recent activity to display</p>
                <p className="text-sm mt-2">
                  Connect your data sources to see activity here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
