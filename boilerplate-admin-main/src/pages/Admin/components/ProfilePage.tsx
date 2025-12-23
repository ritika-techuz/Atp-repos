import * as z from 'zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { User, Mail, Phone, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/shared/contexts/authContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional()
});
const ProfilePage = () => {
  const {
    user,
    updateProfile
  } = useAuth();
  const {
    toast
  } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    }
  });
  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateProfile(values);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "An error occurred while updating your profile."
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        updateProfile({
          avatar: e.target?.result as string
        });
        toast({
          title: "Avatar updated",
          description: "Your profile picture has been updated."
        });
      };
      reader.readAsDataURL(file);
    }
  };
  return <div className="max-w-2xl mx-auto space-y-8">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
        <h2 className="text-3xl mb-2 font-medium">Profile Settings</h2>
        <p className="font-normal text-gray-600">Manage your account settings and preferences.</p>
      </motion.div>

      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 0.1
    }} className="glass-card rounded-xl p-6">
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-gray-200 text-gray-700 text-xl">
                {user?.name?.charAt(0) || 'A'}
              </AvatarFallback>
            </Avatar>
            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/80 transition-colors">
              <Camera className="w-4 h-4 text-white" />
            </label>
            <input id="avatar-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{user?.name}</h3>
            <p className="text-muted-foreground">{user?.role}</p>
            <p className="text-sm text-primary mt-1">Click the camera icon to update your photo</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.3,
            delay: 0.2
          }}>
              <FormField control={form.control} name="name" render={({
              field
            }) => <FormItem>
                    <FormLabel className="text-sm font-medium">Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                        <Input type="text" placeholder="Enter your full name" className="glass-input pl-10 h-12" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.3,
            delay: 0.3
          }}>
              <FormField control={form.control} name="email" render={({
              field
            }) => <FormItem>
                    <FormLabel className="text-sm font-medium">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                        <Input type="email" placeholder="Enter your email" className="glass-input pl-10 h-12" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.3,
            delay: 0.4
          }}>
              <FormField control={form.control} name="phone" render={({
              field
            }) => <FormItem>
                    <FormLabel className="text-sm font-medium">Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                        <Input type="tel" placeholder="Enter your phone number" className="glass-input pl-10 h-12" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3,
            delay: 0.5
          }} className="pt-4">
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-medium h-12 px-8">
                {isLoading ? <motion.div animate={{
                rotate: 360
              }} transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" /> : null}
                {isLoading ? 'Updating...' : 'Update Profile'}
              </Button>
            </motion.div>
          </form>
        </Form>
      </motion.div>
    </div>;
};
export default ProfilePage;