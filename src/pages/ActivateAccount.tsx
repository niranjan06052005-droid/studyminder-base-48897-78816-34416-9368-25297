import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Demo token storage (simulates backend)
const DEMO_TOKENS_KEY = "educoach_activation_tokens";
const DEMO_USERS_KEY = "educoach_users";

interface ActivationToken {
  token: string;
  userId: string;
  userEmail: string;
  expiresAt: number;
  isUsed: boolean;
}

interface DemoUser {
  id: string;
  email: string;
  passwordHash: string | null;
  isActive: boolean;
  role: "student" | "teacher" | "admin";
}

// Initialize demo data
const initializeDemoData = () => {
  const existingTokens = localStorage.getItem(DEMO_TOKENS_KEY);
  const existingUsers = localStorage.getItem(DEMO_USERS_KEY);
  
  if (!existingUsers) {
    const demoUsers: DemoUser[] = [
      { id: "user-1", email: "newstudent@demo.com", passwordHash: null, isActive: false, role: "student" },
      { id: "user-2", email: "newteacher@demo.com", passwordHash: null, isActive: false, role: "teacher" },
    ];
    localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(demoUsers));
  }
  
  if (!existingTokens) {
    const demoTokens: ActivationToken[] = [
      { 
        token: "demo-token-student-123", 
        userId: "user-1", 
        userEmail: "newstudent@demo.com",
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        isUsed: false 
      },
      { 
        token: "demo-token-teacher-456", 
        userId: "user-2", 
        userEmail: "newteacher@demo.com",
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        isUsed: false 
      },
    ];
    localStorage.setItem(DEMO_TOKENS_KEY, JSON.stringify(demoTokens));
  }
};

const ActivateAccount = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tokenStatus, setTokenStatus] = useState<"validating" | "valid" | "invalid" | "expired" | "used">("validating");
  const [userEmail, setUserEmail] = useState("");
  const [activationSuccess, setActivationSuccess] = useState(false);

  // Password validation
  const passwordErrors = [];
  if (password.length > 0 && password.length < 8) {
    passwordErrors.push("Password must be at least 8 characters");
  }
  if (confirmPassword.length > 0 && password !== confirmPassword) {
    passwordErrors.push("Passwords do not match");
  }
  
  const isFormValid = password.length >= 8 && password === confirmPassword;

  useEffect(() => {
    initializeDemoData();
    validateToken();
  }, [token]);

  const validateToken = () => {
    if (!token) {
      setTokenStatus("invalid");
      return;
    }

    const tokensJson = localStorage.getItem(DEMO_TOKENS_KEY);
    if (!tokensJson) {
      setTokenStatus("invalid");
      return;
    }

    const tokens: ActivationToken[] = JSON.parse(tokensJson);
    const activationToken = tokens.find(t => t.token === token);

    if (!activationToken) {
      setTokenStatus("invalid");
      return;
    }

    if (activationToken.isUsed) {
      setTokenStatus("used");
      return;
    }

    if (activationToken.expiresAt < Date.now()) {
      setTokenStatus("expired");
      return;
    }

    // Check if user is already active
    const usersJson = localStorage.getItem(DEMO_USERS_KEY);
    if (usersJson) {
      const users: DemoUser[] = JSON.parse(usersJson);
      const user = users.find(u => u.id === activationToken.userId);
      if (user?.isActive) {
        setTokenStatus("used");
        return;
      }
    }

    setUserEmail(activationToken.userEmail);
    setTokenStatus("valid");
  };

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid || !token) return;
    
    setIsProcessing(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const tokensJson = localStorage.getItem(DEMO_TOKENS_KEY);
      const usersJson = localStorage.getItem(DEMO_USERS_KEY);
      
      if (!tokensJson || !usersJson) {
        throw new Error("System error");
      }

      const tokens: ActivationToken[] = JSON.parse(tokensJson);
      const users: DemoUser[] = JSON.parse(usersJson);
      
      const tokenIndex = tokens.findIndex(t => t.token === token);
      const activationToken = tokens[tokenIndex];
      
      if (!activationToken || activationToken.isUsed || activationToken.expiresAt < Date.now()) {
        throw new Error("Token is no longer valid");
      }

      const userIndex = users.findIndex(u => u.id === activationToken.userId);
      
      if (userIndex === -1) {
        throw new Error("User not found");
      }

      if (users[userIndex].isActive) {
        throw new Error("Account is already activated");
      }

      // Simulate password hashing (in real app, this happens on backend)
      const hashedPassword = btoa(password); // NOT secure - demo only!
      
      // Update user
      users[userIndex].passwordHash = hashedPassword;
      users[userIndex].isActive = true;
      
      // Mark token as used
      tokens[tokenIndex].isUsed = true;
      
      // Save changes
      localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
      localStorage.setItem(DEMO_TOKENS_KEY, JSON.stringify(tokens));
      
      setActivationSuccess(true);
      toast.success("Account activated successfully!");
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Activation failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderContent = () => {
    if (tokenStatus === "validating") {
      return (
        <div className="text-center py-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Validating your activation link...</p>
        </div>
      );
    }

    if (tokenStatus === "invalid") {
      return (
        <Alert variant="destructive" className="border-destructive/50">
          <AlertCircle className="h-5 w-5" />
          <AlertDescription className="ml-2">
            <strong>Invalid Activation Link</strong>
            <p className="mt-1 text-sm">This activation link is invalid or malformed. Please contact your administrator for a new activation link.</p>
          </AlertDescription>
        </Alert>
      );
    }

    if (tokenStatus === "expired") {
      return (
        <Alert variant="destructive" className="border-destructive/50">
          <AlertCircle className="h-5 w-5" />
          <AlertDescription className="ml-2">
            <strong>Link Expired</strong>
            <p className="mt-1 text-sm">This activation link has expired. Activation links are valid for 24 hours. Please contact your administrator for a new link.</p>
          </AlertDescription>
        </Alert>
      );
    }

    if (tokenStatus === "used") {
      return (
        <Alert className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          <AlertDescription className="ml-2 text-amber-800 dark:text-amber-200">
            <strong>Already Activated</strong>
            <p className="mt-1 text-sm">This account has already been activated. You can proceed to login.</p>
            <Button 
              variant="outline" 
              className="mt-3"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </Button>
          </AlertDescription>
        </Alert>
      );
    }

    if (activationSuccess) {
      return (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Account Activated!</h3>
          <p className="text-muted-foreground mb-4">Your account has been successfully activated. You can now log in with your new password.</p>
          <p className="text-sm text-muted-foreground">Redirecting to login page...</p>
        </div>
      );
    }

    return (
      <form onSubmit={handleActivate} className="space-y-5">
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">Activating account for:</p>
          <p className="font-medium text-foreground">{userEmail}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {passwordErrors.length > 0 && (
          <div className="space-y-1">
            {passwordErrors.map((error, index) => (
              <p key={index} className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {error}
              </p>
            ))}
          </div>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p className="flex items-center gap-2">
            <span className={password.length >= 8 ? "text-green-600" : ""}>
              {password.length >= 8 ? "✓" : "○"}
            </span>
            At least 8 characters
          </p>
          <p className="flex items-center gap-2">
            <span className={password === confirmPassword && confirmPassword.length > 0 ? "text-green-600" : ""}>
              {password === confirmPassword && confirmPassword.length > 0 ? "✓" : "○"}
            </span>
            Passwords match
          </p>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={!isFormValid || isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Activating Account...
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Activate Account
            </>
          )}
        </Button>
      </form>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4 py-8">
      <Card className="w-full max-w-md shadow-xl border-border/50">
        <CardHeader className="text-center space-y-4 pb-2">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl text-primary">Account Activation</CardTitle>
            <CardDescription className="text-base mt-1">
              Set your password to activate your EduCoach account
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {renderContent()}
        </CardContent>
      </Card>

      {/* Demo Info */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80">
        <Card className="bg-muted/90 backdrop-blur border-border/50 shadow-lg">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-foreground mb-2">🧪 Demo Mode</p>
            <p className="text-xs text-muted-foreground mb-2">Test with these activation links:</p>
            <div className="space-y-1 text-xs">
              <p className="font-mono bg-background/50 p-1 rounded truncate">
                ?token=demo-token-student-123
              </p>
              <p className="font-mono bg-background/50 p-1 rounded truncate">
                ?token=demo-token-teacher-456
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivateAccount;
