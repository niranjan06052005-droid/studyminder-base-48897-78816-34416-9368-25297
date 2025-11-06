import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, LogIn } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Demo login logic
    if (email.includes("student")) {
      toast.success("Welcome back, Student!");
      navigate("/student/dashboard");
    } else if (email.includes("teacher")) {
      toast.success("Welcome back, Teacher!");
      navigate("/teacher/profile");
    } else if (email.includes("admin")) {
      toast.success("Welcome back, Admin!");
      navigate("/admin/dashboard");
    } else {
      toast.error("Invalid credentials. Try student@demo.com, teacher@demo.com, or admin@demo.com");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl text-primary">Welcome Back</CardTitle>
          <CardDescription className="text-base">
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm font-semibold mb-2">Demo Accounts:</p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Student: student@demo.com</li>
              <li>• Teacher: teacher@demo.com</li>
              <li>• Admin: admin@demo.com</li>
              <li className="text-xs mt-2">Password: any value</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
