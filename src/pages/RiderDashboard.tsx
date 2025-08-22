import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Car, MapPin, Clock, Star, Menu, User, History, CreditCard, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function RiderDashboard() {
  const navigate = useNavigate();
  const [currentRide, setCurrentRide] = useState(null);
  
  const recentRides = [
    {
      id: 1,
      driver: 'John Smith',
      rating: 4.8,
      date: '2024-01-15',
      time: '2:30 PM',
      from: 'Downtown Mall',
      to: 'Airport',
      fare: '$25.50',
      status: 'Completed'
    },
    {
      id: 2,
      driver: 'Sarah Johnson',
      rating: 4.9,
      date: '2024-01-14',
      time: '10:15 AM',
      from: 'Home',
      to: 'Office',
      fare: '$12.00',
      status: 'Completed'
    },
    {
      id: 3,
      driver: 'Mike Davis',
      rating: 4.7,
      date: '2024-01-13',
      time: '6:45 PM',
      from: 'Restaurant',
      to: 'Home',
      fare: '$18.75',
      status: 'Completed'
    }
  ];

  const handleBookRide = () => {
    navigate('/book-ride');
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">UberX</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">Rider</Badge>
              <Avatar>
                <AvatarImage src="/api/placeholder/32/32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Welcome back, John!</span>
                </CardTitle>
                <CardDescription>Ready for your next ride?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="flex-1"
                    onClick={handleBookRide}
                  >
                    <Car className="mr-2 h-5 w-5" />
                    Book a Ride
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => navigate('/trips')}
                  >
                    <History className="mr-2 h-5 w-5" />
                    Trip History
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Current Ride Status */}
            {currentRide ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <span>Current Ride</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src="/api/placeholder/40/40" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">John Smith</p>
                          <p className="text-sm text-gray-500">Toyota Camry • ABC-1234</p>
                        </div>
                      </div>
                      <Badge variant="secondary">On the way</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm">Downtown Mall</span>
                      </div>
                      <div className="w-px h-4 bg-gray-300 ml-1"></div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span className="text-sm">Airport Terminal 1</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm text-gray-500">ETA: 3 minutes</span>
                      <Button size="sm" variant="outline">
                        Call Driver
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <MapPin className="h-6 w-6" />
                      <span>Saved Places</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <Clock className="h-6 w-6" />
                      <span>Schedule Ride</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <CreditCard className="h-6 w-6" />
                      <span>Payment</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <Settings className="h-6 w-6" />
                      <span>Settings</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Rides */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Rides</CardTitle>
                <CardDescription>Your latest trip history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRides.map((ride) => (
                    <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{ride.driver.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{ride.driver}</p>
                          <p className="text-sm text-gray-500">{ride.date} • {ride.time}</p>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <MapPin className="h-3 w-3" />
                            <span>{ride.from} → {ride.to}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{ride.fare}</p>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-sm">{ride.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full" onClick={() => navigate('/trips')}>
                    View All Trips
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/api/placeholder/48/48" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={() => navigate('/profile')}>
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <p className="font-medium">**** **** **** 1234</p>
                      <p className="text-sm text-gray-500">Visa</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Manage Payment
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Ride Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Rides</span>
                    <span className="font-medium">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">This Month</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Saved</span>
                    <span className="font-medium">$2,340</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}