import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  message?: string;
};

export default class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    const message = error instanceof Error ? error.message : String(error);
    return { hasError: true, message };
  }

  componentDidCatch(error: unknown) {
    // Surface in console for debugging
    // eslint-disable-next-line no-console
    console.error("App crashed:", error);
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <div className="tp-card max-w-xl w-full space-y-4">
          <header className="space-y-1">
            <h1 className="tp-page-title">Qualcosa è andato storto</h1>
            <p className="tp-page-subtitle">
              L’app si è bloccata durante il caricamento.
            </p>
          </header>

          {this.state.message ? (
            <pre className="bg-muted text-foreground rounded-lg p-4 overflow-auto text-sm border border-border">
              {this.state.message}
            </pre>
          ) : null}

          <div className="flex items-center gap-3">
            <Button onClick={this.handleReload}>Ricarica</Button>
            <Button
              variant="secondary"
              onClick={() => (window.location.href = "/")}
            >
              Torna alla home
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
