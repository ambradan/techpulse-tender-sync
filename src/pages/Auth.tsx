import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Activity } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [connectTenderMatch, setConnectTenderMatch] = useState(true);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Errore di accesso",
        description: error.message,
      });
    } else {
      navigate("/dashboard");
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const redirectUrl = `${window.location.origin}/dashboard`;

    const { error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          connect_tendermatch: connectTenderMatch,
        },
      },
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Errore di registrazione",
        description: error.message,
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
            <Tabs defaultValue="login" className="w-full">
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
                    />
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
                    />
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
                    />
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
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="••••••••"
                      minLength={6}
                      required
                    />
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
                        Ricevi suggerimenti automatici sui bandi compatibili. Puoi disattivare in qualsiasi momento.
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
