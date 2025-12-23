
import * as z from 'zod';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { EyeOff, Eye, Lock, Mail } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { ROUTES } from '@/shared/utils/routes';
import { Button } from '@/components/ui/button';
import { setData } from '@/shared/utils/helper';
import { CONSTANT } from '@/shared/utils/constant';
import { useAuth } from '@/shared/contexts/authContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const Login = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);

    try {
      const data = await login(values.email, values.password);
      if (data) {
        toast({ title: "Welcome back!", description: "You have successfully logged in." });
        setData(CONSTANT.ACCESS_TOKEN, data?.token);
        setData(CONSTANT.USER_DETAILS, data?.loginDetails);
        navigate(ROUTES.userList);
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Login failed", description: "An error occurred during login." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      
      {/* Animated geometric shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-200/25 to-blue-200/25 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-r from-indigo-200/20 to-pink-200/20 rounded-full blur-xl"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              bottom: '10%',
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-2xl p-8 w-full max-w-md premium-shadow relative z-10 backdrop-blur-lg"
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center relative"
            style={{ 
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
            }}
          >
            <Lock className="w-8 h-8 text-white" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
              }}
            />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-muted-foreground mt-2">Sign in to your admin account</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                        <Input
                          type="email"
                          placeholder="admin@example.com"
                          className="glass-input pl-10 h-12 text-foreground placeholder:text-muted-foreground"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          className="glass-input pl-10 pr-10 h-12 text-foreground placeholder:text-muted-foreground"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                        >
                          {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] relative overflow-hidden"
                style={{ 
                  background: `linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)`,
                  border: 'none',
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
                }}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  'Sign In'
                )}
                <motion.div
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    repeatDelay: 1.5
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{ 
                    width: '50%',
                    transform: 'skewX(-15deg)'
                  }}
                />
              </Button>
            </motion.div>
          </form>
        </Form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-muted-foreground">
            Demo credentials: admin@example.com / password
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
