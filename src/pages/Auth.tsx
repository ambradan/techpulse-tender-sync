import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/backend/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Activity } from "lucide-react";
import { z } from "zod";

// Validation schemas
const emailSchema = z.string()
  .trim()
  .email("Inserisci un indirizzo email valido")
  .max(255, "Email troppo lunga");

const passwordSchema = z.string()
  .min(10, "La password deve avere almeno 10 caratteri")
  .max(72, "Password troppo lunga")
  .regex(/[a-zA-Z]/, "La password deve contenere almeno una lettera")
  .regex(/[0-9]/, "La password deve contenere almeno un numero");

const fullNameSchema = z.string()
  .trim()
  .min(2, "Il nome deve avere almeno 2 caratteri")
  .max(100, "Nome troppo lungo")
  .regex(/^[a-zA-ZàèéìòùÀÈÉÌÒÙ\s'-]+$/, "Il nome contiene caratteri non validi");

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Inserisci la password"),
});

const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  fullName: fullNameSchema,
});

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [connectTenderMatch, setConnectTenderMatch] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, authLoading, navigate]);

  // Show nothing while checking auth to prevent flash
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Caricamento...</div>
      </div>
    );
  }

  // If user is logged in, don't render auth form (redirect will happen)
  if (user) {
    return null;
  }

  const validateLogin = () => {
    const result = loginSchema.safeParse({
      email: loginEmail,
      password: loginPassword,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[`login-${err.path[0]}`] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const validateSignup = () => {
    const result = signupSchema.safeParse({
      email: signupEmail,
      password: signupPassword,
      fullName: fullName,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[`signup-${err.path[0]}`] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLogin()) {
      toast({
        variant: "destructive",
        title: "Dati non validi",
        description: "Controlla i campi evidenziati",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail.trim(),
      password: loginPassword,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Errore di accesso",
        description: error.message === "Invalid login credentials" 
          ? "Email o password non corretti" 
          : error.message,
      });
    } else {
      navigate("/dashboard");
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignup()) {
      toast({
        variant: "destructive",
        title: "Dati non validi",
        description: "Controlla i campi evidenziati",
      });
      return;
    }

    setLoading(true);

    const redirectUrl = `${window.location.origin}/dashboard`;

    const { error } = await supabase.auth.signUp({
      email: signupEmail.trim(),
      password: signupPassword,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName.trim(),
          connect_tendermatch: connectTenderMatch,
        },
      },
    });

    if (error) {
      let errorMessage = error.message;
      if (error.message.includes("already registered")) {
        errorMessage = "Questo indirizzo email è già registrato";
      } else if (error.message.includes("Password should be")) {
        errorMessage = "La password non soddisfa i requisiti di sicurezza";
      }
      
      toast({
        variant: "destructive",
        title: "Errore di registrazione",
        description: errorMessage,
      });
    } else {
      toast({
        title: "Registrazione completata",
        description: "Accesso effettuato con successo.",
      });
      navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Activity className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold text-foreground">TechPulse</span>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="font-display">Accedi a TechPulse</CardTitle>
            <CardDescription>Dashboard intelligente per aziende tech</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full" onValueChange={() => setErrors({})}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Accedi</TabsTrigger>
                <TabsTrigger value="signup">Registrati</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="nome@azienda.it"
                      required
                      className={errors["login-email"] ? "border-destructive" : ""}
                    />
                    {errors["login-email"] && (
                      <p className="text-xs text-destructive">{errors["login-email"]}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className={errors["login-password"] ? "border-destructive" : ""}
                    />
                    {errors["login-password"] && (
                      <p className="text-xs text-destructive">{errors["login-password"]}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Accesso in corso..." : "Accedi"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Nome completo</Label>
                    <Input
                      id="full-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Mario Rossi"
                      required
                      className={errors["signup-fullName"] ? "border-destructive" : ""}
                    />
                    {errors["signup-fullName"] && (
                      <p className="text-xs text-destructive">{errors["signup-fullName"]}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email aziendale</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="nome@azienda.it"
                      required
                      className={errors["signup-email"] ? "border-destructive" : ""}
                    />
                    {errors["signup-email"] && (
                      <p className="text-xs text-destructive">{errors["signup-email"]}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className={errors["signup-password"] ? "border-destructive" : ""}
                    />
                    {errors["signup-password"] && (
                      <p className="text-xs text-destructive">{errors["signup-password"]}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Min. 10 caratteri, almeno una lettera e un numero
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-secondary/50">
                    <Checkbox 
                      id="tendermatch" 
                      checked={connectTenderMatch}
                      onCheckedChange={(checked) => setConnectTenderMatch(checked as boolean)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="tendermatch" className="text-sm font-medium cursor-pointer">
                        Collega il mio profilo a TenderMatch
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Ricevi suggerimenti automatici sulle gare compatibili. Puoi disattivare in qualsiasi momento.
                      </p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Registrazione in corso..." : "Crea account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;