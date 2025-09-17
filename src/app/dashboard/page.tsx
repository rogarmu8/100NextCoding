import Navbar from "@/components/layout/navbar";

/**
 * Dashboard Page Component
 * 
 * A simple dashboard that shows a private area message.
 * 
 * Note: Authentication and premium checks are handled by the dashboard layout
 * 
 * @component
 */
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="dashboard" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Here goes your private area
          </h1>
          <p className="text-lg text-gray-600">
            This is your dashboard content.
          </p>
        </div>
      </div>
    </div>
  );
}
