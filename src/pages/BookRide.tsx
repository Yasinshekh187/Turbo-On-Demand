import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Clock, Car, DollarSign, Star, ArrowLeft, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function BookRide() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingStep, setBookingStep] = useState('location'); // location, cars, confirmation

  const carOptions = [
    {
      id: 1,
      type: 'UberX',
      description: 'Affordable, everyday rides',
      price: '$12.50',
      eta: '3 min',
      seats: 4,
      icon: '🚗'
    },
    {
      id: 2,
      type: 'UberXL',
      description: 'Extra seats for your group',
      price: '$18.75',
      eta: '5 min',
      seats: 6,
      icon: '🚙'
    },
    {
      id: 3,
      type: 'Uber Black',
      description: 'Premium rides with professional drivers',
      price: '$28.00',
      eta: '8 min',
      seats: 4,
      icon: '🚗'
    },
    {
      id: 4,
      type: 'Uber Pool',
      description: 'Share your ride, split the cost',
      price: '$8.25',
      eta: '7 min',
      seats: 2,
      icon: '🚗'
    }
  ];

  const nearbyDrivers = [
    {
      id: 1,
      name: 'John Smith',
      rating: 4.9,
      vehicle: 'Toyota Camry',
      eta: '3 min',
      distance: '0.5 km away'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      rating: 4.8,
      vehicle: 'Honda Accord',
      eta: '5 min',
      distance: '1.2 km away'
    }
  ];

  const handleLocationSubmit = () => {
    if (!pickup || !destination) {
      toast.error('Please enter both pickup and destination locations');
      return;
    }
    setBookingStep('cars');
  };

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setBookingStep('confirmation');
  };

  const handleBookRide = () => {
    toast.success('Ride booked successfully! Finding your driver...');
    setTimeout(() => {
      navigate('/rider');
    }, 2000);
  };

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
                <span className="text-2xl font-bold text-gray-900">Book a Ride</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center space-x-2 ${bookingStep === 'location' ? 'text-blue-600' : bookingStep === 'cars' || bookingStep === 'confirmation' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${bookingStep === 'location' ? 'bg-blue-600 text-white' : bookingStep === 'cars' || bookingStep === 'confirmation' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="font-medium">Location</span>
            </div>
            <div className={`w-12 h-px ${bookingStep === 'cars' || bookingStep === 'confirmation' ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center space-x-2 ${bookingStep === 'cars' ? 'text-blue-600' : bookingStep === 'confirmation' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${bookingStep === 'cars' ? 'bg-blue-600 text-white' : bookingStep === 'confirmation' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="font-medium">Choose Ride</span>
            </div>
            <div className={`w-12 h-px ${bookingStep === 'confirmation' ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center space-x-2 ${bookingStep === 'confirmation' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${bookingStep === 'confirmation' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="font-medium">Confirm</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {bookingStep === 'location' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Where to?</span>
                  </CardTitle>
                  <CardDescription>Enter your pickup location and destination</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickup">Pickup Location</Label>
                    <Input
                      id="pickup"
                      placeholder="Enter pickup location"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      placeholder="Where are you going?"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                  <Button className="w-full" onClick={handleLocationSubmit}>
                    Continue
                  </Button>
                </CardContent>
              </Card>
            )}

            {bookingStep === 'cars' && (
              <Card>
                <CardHeader>
                  <CardTitle>Choose your ride</CardTitle>
                  <CardDescription>Select the best option for your trip</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {carOptions.map((car) => (
                    <div
                      key={car.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleCarSelect(car)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{car.icon}</div>
                        <div>
                          <p className="font-medium">{car.type}</p>
                          <p className="text-sm text-gray-500">{car.description}</p>
                          <p className="text-sm text-gray-500">{car.seats} seats</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg">{car.price}</p>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{car.eta}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {bookingStep === 'confirmation' && selectedCar && (
              <Card>
                <CardHeader>
                  <CardTitle>Confirm your ride</CardTitle>
                  <CardDescription>Review your trip details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl">{selectedCar.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium">{selectedCar.type}</p>
                        <p className="text-sm text-gray-500">{selectedCar.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg">{selectedCar.price}</p>
                        <p className="text-sm text-gray-500">{selectedCar.eta} away</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        <span className="text-sm font-medium">Pickup</span>
                      </div>
                      <p className="ml-6 text-gray-600">{pickup}</p>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                        <span className="text-sm font-medium">Destination</span>
                      </div>
                      <p className="ml-6 text-gray-600">{destination}</p>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Fare</span>
                        <span className="text-xl font-bold text-green-600">{selectedCar.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" size="lg" onClick={handleBookRide}>
                      Book {selectedCar.type}
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setBookingStep('cars')}>
                      Choose Different Ride
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trip Summary */}
            {(bookingStep === 'cars' || bookingStep === 'confirmation') && (
              <Card>
                <CardHeader>
                  <CardTitle>Trip Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm font-medium">From</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">{pickup}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-sm font-medium">To</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">{destination}</p>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-500">Estimated distance: 12.5 km</p>
                    <p className="text-sm text-gray-500">Estimated time: 18 min</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Nearby Drivers */}
            <Card>
              <CardHeader>
                <CardTitle>Nearby Drivers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {nearbyDrivers.map((driver) => (
                  <div key={driver.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Avatar>
                      <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{driver.name}</p>
                      <p className="text-xs text-gray-500">{driver.vehicle}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{driver.rating}</span>
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <p>{driver.eta}</p>
                      <p>{driver.distance}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <DollarSign className="h-5 w-5" />
                  <div>
                    <p className="font-medium">**** **** **** 1234</p>
                    <p className="text-sm text-gray-500">Visa</p>
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