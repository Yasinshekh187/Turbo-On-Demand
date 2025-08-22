import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, MapPin, Clock, Star, ArrowLeft, Search, Filter, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TripHistory() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const trips = [
    {
      id: 1,
      driver: 'John Smith',
      rating: 4.8,
      date: '2024-01-15',
      time: '2:30 PM',
      from: 'Downtown Mall',
      to: 'Airport Terminal 1',
      fare: '$25.50',
      status: 'Completed',
      duration: '25 min',
      distance: '12.5 km',
      carType: 'UberX'
    },
    {
      id: 2,
      driver: 'Sarah Johnson',
      rating: 4.9,
      date: '2024-01-14',
      time: '10:15 AM',
      from: 'Home - 123 Oak Street',
      to: 'Office - Tech Plaza',
      fare: '$12.00',
      status: 'Completed',
      duration: '18 min',
      distance: '8.2 km',
      carType: 'UberX'
    },
    {
      id: 3,
      driver: 'Mike Davis',
      rating: 4.7,
      date: '2024-01-13',
      time: '6:45 PM',
      from: 'Restaurant - Mario\'s Pizza',
      to: 'Home - 123 Oak Street',
      fare: '$18.75',
      status: 'Completed',
      duration: '22 min',
      distance: '11.3 km',
      carType: 'UberXL'
    },
    {
      id: 4,
      driver: 'Emily Wilson',
      rating: 5.0,
      date: '2024-01-12',
      time: '9:00 AM',
      from: 'Home - 123 Oak Street',
      to: 'Shopping Center',
      fare: '$15.25',
      status: 'Completed',
      duration: '20 min',
      distance: '9.8 km',
      carType: 'UberX'
    },
    {
      id: 5,
      driver: 'David Brown',
      rating: 4.6,
      date: '2024-01-11',
      time: '7:30 PM',
      from: 'Cinema Complex',
      to: 'Home - 123 Oak Street',
      fare: '$22.00',
      status: 'Completed',
      duration: '28 min',
      distance: '14.1 km',
      carType: 'Uber Black'
    },
    {
      id: 6,
      driver: 'Lisa Anderson',
      rating: 4.8,
      date: '2024-01-10',
      time: '3:15 PM',
      from: 'Doctor\'s Office',
      to: 'Pharmacy',
      fare: '$8.50',
      status: 'Completed',
      duration: '12 min',
      distance: '4.2 km',
      carType: 'UberX'
    }
  ];

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || trip.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalSpent = trips.reduce((sum, trip) => sum + parseFloat(trip.fare.replace('$', '')), 0);
  const totalTrips = trips.length;
  const averageRating = trips.reduce((sum, trip) => sum + trip.rating, 0) / trips.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/rider')}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <Car className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">Trip History</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{totalTrips}</p>
                <p className="text-sm text-gray-500">Total Trips</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">${totalSpent.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Total Spent</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-600">{averageRating.toFixed(1)}</p>
                <p className="text-sm text-gray-500">Average Rating</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search trips by location or driver..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Trips</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Trip List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Trips</CardTitle>
            <CardDescription>Complete history of your rides</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTrips.map((trip) => (
                <div key={trip.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar>
                        <AvatarFallback>{trip.driver.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium">{trip.driver}</p>
                          <Badge variant="secondary">{trip.carType}</Badge>
                          <Badge variant={trip.status === 'Completed' ? 'default' : 'secondary'}>
                            {trip.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{trip.date} • {trip.time}</p>
                        
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">From</p>
                              <p className="text-sm text-gray-600">{trip.from}</p>
                            </div>
                          </div>
                          <div className="w-px h-4 bg-gray-300 ml-1"></div>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">To</p>
                              <p className="text-sm text-gray-600">{trip.to}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{trip.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{trip.distance}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span>{trip.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right ml-4">
                      <p className="text-lg font-bold text-green-600">{trip.fare}</p>
                      <div className="space-y-1 mt-2">
                        <Button size="sm" variant="outline">
                          Receipt
                        </Button>
                        <Button size="sm" variant="outline">
                          Rebook
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTrips.length === 0 && (
              <div className="text-center py-12">
                <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No trips found matching your search criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}