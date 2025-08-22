import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Car, MapPin, Clock, Star, DollarSign, User, History, Settings, LogOut, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function DriverDashboard() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);
  const [currentRide, setCurrentRide] = useState({
    id: 1,
    rider: 'Sarah Johnson',
    pickup: 'Downtown Mall',
    destination: 'Airport Terminal 1',
    fare: '$25.50',
    distance: '12.5 km',
    status: 'On the way to pickup'
  });

  const todayStats = {
    earnings: '$156.75',
    trips: 8,
    hours: '6.5',
    rating: 4.8
  };

  const recentTrips = [
    {
      id: 1,
      rider: 'John Smith',
      date: '2024-01-15',
      time: '2:30 PM',
      from: 'Downtown',
      to: 'Airport',
      fare: '$25.50',
      rating: 5
    },
    {
      id: 2,
      rider: 'Emily Davis',
      date: '2024-01-15',
      time: '1:15 PM',
      from: 'Mall',
      to: 'Office',
      fare: '$12.00',
      rating: 4
    },
    {
      id: 3,
      rider: 'Mike Wilson',
      date: '2024-01-15',
      time: '11:45 AM',
      from: 'Home',
      to: 'Restaurant',
      fare: '$18.75',
      rating: 5
    }
  ];

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    toast.success(isOnline ? 'You are now offline' : 'You are now online and ready for rides');
  };

  const handleAcceptRide = () => {
    toast.success('Ride accepted! Navigating to pickup location');
  };

  const handleCompleteRide = () => {
    setCurrentRide(null);
    toast.success('Ride completed! Great job!');
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
              <Badge variant="secondary">Driver</Badge>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{isOnline ? 'Online' : 'Offline'}</span>
                <Switch checked={isOnline} onCheckedChange={handleToggleOnline} />
              </div>
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
            {/* Status Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Navigation className="h-5 w-5" />
                    <span>Driver Status</span>
                  </CardTitle>
                  <Badge variant={isOnline ? "default" : "secondary"}>
                    {isOnline ? 'Online' : 'Offline'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {isOnline ? (
                  <div className="space-y-4">
                    <p className="text-gray-600">You're online and ready to accept rides</p>
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" onClick={() => setIsOnline(false)}>
                        Go Offline
                      </Button>
                      <Button variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-600">You're offline. Go online to start receiving ride requests</p>
                    <Button onClick={() => setIsOnline(true)}>
                      Go Online
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Current Ride */}
            {currentRide && (
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
                          <AvatarFallback>{currentRide.rider.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{currentRide.rider}</p>
                          <p className="text-sm text-gray-500">{currentRide.distance}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{currentRide.status}</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-sm">Pickup: {currentRide.pickup}</span>
                      </div>
                      <div className="w-px h-4 bg-gray-300 ml-1"></div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span className="text-sm">Drop-off: {currentRide.destination}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="text-lg font-medium text-green-600">{currentRide.fare}</span>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">
                          Call Rider
                        </Button>
                        <Button size="sm" onClick={handleCompleteRide}>
                          Complete Ride
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Today's Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Performance</CardTitle>
                <CardDescription>Your earnings and activity for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">{todayStats.earnings}</p>
                    <p className="text-sm text-gray-500">Earnings</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Car className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">{todayStats.trips}</p>
                    <p className="text-sm text-gray-500">Trips</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-600">{todayStats.hours}</p>
                    <p className="text-sm text-gray-500">Hours</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-yellow-600">{todayStats.rating}</p>
                    <p className="text-sm text-gray-500">Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Trips */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Trips</CardTitle>
                <CardDescription>Your latest completed rides</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrips.map((trip) => (
                    <div key={trip.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{trip.rider.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{trip.rider}</p>
                          <p className="text-sm text-gray-500">{trip.date} • {trip.time}</p>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <MapPin className="h-3 w-3" />
                            <span>{trip.from} → {trip.to}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">{trip.fare}</p>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-sm">{trip.rating}</span>
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
            {/* Driver Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Driver Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/api/placeholder/48/48" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-gray-500">Driver since 2022</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Rides</span>
                    <span className="text-sm font-medium">1,234</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={() => navigate('/profile')}>
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Vehicle Info */}
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Car className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Toyota Camry 2020</p>
                      <p className="text-sm text-gray-500">ABC-1234</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Update Vehicle
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Summary */}
            <Card>
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Earnings</span>
                    <span className="font-medium text-green-600">$892.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Trips</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Hours Online</span>
                    <span className="font-medium">32.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Acceptance Rate</span>
                    <span className="font-medium">94%</span>
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