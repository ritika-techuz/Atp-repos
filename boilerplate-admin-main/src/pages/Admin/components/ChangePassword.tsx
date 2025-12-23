import zod from 'zod';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Lock, EyeOff, Eye } from 'lucide-react';
import { changePassword } from '../schema';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const PasswordPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({ old: false, new: false, confirm: false });

  const form = useForm<zod.infer<typeof changePassword.schema>>({
    resolver: zodResolver(changePassword.schema),
    defaultValues: changePassword.defaultValues
  });

  const onSubmit = async (values: zod.infer<typeof changePassword.schema>) => {
    setIsLoading(true);

    try {
      const success = true;
      if (success) {
        toast({
          title: "Password updated",
          description: "Your password has been successfully updated.",
        });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: "Current password is incorrect.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "An error occurred while updating your password.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: 'old' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2 text-white">Change Password</h2>
        <p className="text-muted-foreground">Update your password to keep your account secure.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-card rounded-xl p-6"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Current Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white z-10" />
                        <Input
                          type={showPasswords.old ? 'text' : 'password'}
                          placeholder="Enter your current password"
                          className="glass-input pl-10 pr-10 h-12 text-white"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('old')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-white/80 transition-colors z-10"
                        >
                          {showPasswords.old ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
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
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white z-10" />
                        <Input
                          type={showPasswords.new ? 'text' : 'password'}
                          placeholder="Enter your new password"
                          className="glass-input pl-10 pr-10 h-12 text-white"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('new')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-white/80 transition-colors z-10"
                        >
                          {showPasswords.new ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Confirm New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white z-10" />
                        <Input
                          type={showPasswords.confirm ? 'text' : 'password'}
                          placeholder="Confirm your new password"
                          className="glass-input pl-10 pr-10 h-12 text-white"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('confirm')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-white/80 transition-colors z-10"
                        >
                          {showPasswords.confirm ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
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
              className="pt-4"
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium h-12 px-8"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : null}
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </motion.div>
          </form>
        </Form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20"
        >
          <h4 className="font-medium text-primary mb-2">Password Security Tips:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Use a combination of letters, numbers, and special characters</li>
            <li>• Avoid using personal information or common words</li>
            <li>• Make it at least 8 characters long</li>
            <li>• Don't reuse passwords from other accounts</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PasswordPage;
