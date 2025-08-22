import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car, User, Phone, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleLogin = (userType: 'rider' | 'driver') => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Simulate login
    toast.success(`Welcome back! Logging in as ${userType}`);
    
    setTimeout(() => {
      if (userType === 'rider') {
        navigate('/rider');
      } else {
        navigate('/driver');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">UberX</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <Tabs defaultValue="rider" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rider" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Rider</span>
            </TabsTrigger>
            <TabsTrigger value="driver" className="flex items-center space-x-2">
              <Car className="h-4 w-4" />
              <span>Driver</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rider">
            <Card>
              <CardHeader>
                <CardTitle>Rider Login</CardTitle>
                <CardDescription>
                  Sign in to book your next ride
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rider-email">Email</Label>
                  <Input
                    id="rider-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rider-password">Password</Label>
                  <Input
                    id="rider-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleLogin('rider')}
                >
                  Sign In as Rider
                </Button>
                <div className="text-center">
                  <Button variant="link" onClick={() => navigate('/register')}>
                    Don't have an account? Sign up
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="driver">
            <Card>
              <CardHeader>
                <CardTitle>Driver Login</CardTitle>
                <CardDescription>
                  Sign in to start earning with UberX
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="driver-email">Email</Label>
                  <Input
                    id="driver-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver-password">Password</Label>
                  <Input
                    id="driver-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleLogin('driver')}
                >
                  Sign In as Driver
                </Button>
                <div className="text-center">
                  <Button variant="link" onClick={() => navigate('/register')}>
                    Don't have an account? Sign up
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Alternative Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Button variant="outline" className="w-full">
              <Phone className="mr-2 h-4 w-4" />
              Continue with Phone
            </Button>
          </div>
        </div>

        <div className="text-center mt-6">
          <Button variant="link" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}