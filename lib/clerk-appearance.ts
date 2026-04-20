// NOTE: Centralized Clerk UI appearance/theme configuration.
export const clerkAppearance = {
  variables: {
    colorPrimary: 'hsl(221 83% 53%)',
    colorBackground: 'hsl(0 0% 100%)',
    colorText: 'hsl(222 47% 11%)',
    colorTextSecondary: 'hsl(215 16% 47%)',
    colorInputBackground: 'hsl(210 40% 98%)',
    colorInputText: 'hsl(222 47% 11%)',
    colorDanger: 'hsl(0 72% 51%)',
    borderRadius: '0.9rem',
  },
  elements: {
    rootBox: 'w-full',
    cardBox: 'w-full',
    card: 'w-full border border-border/80 bg-white shadow-sm',
    headerTitle: 'text-2xl font-semibold tracking-tight text-foreground',
    headerSubtitle: 'text-sm text-muted-foreground',
    socialButtonsBlockButton:
      'h-10 rounded-lg border-border bg-background text-foreground hover:bg-muted transition-colors',
    socialButtonsBlockButtonText: 'font-medium',
    dividerLine: 'bg-border',
    dividerText: 'text-muted-foreground',
    formFieldLabel: 'text-sm font-medium text-foreground',
    formFieldInput:
      'h-11 rounded-lg border-border bg-slate-50/80 text-foreground focus:border-primary focus:ring-1 focus:ring-primary',
    formButtonPrimary:
      'h-11 rounded-lg bg-primary text-primary-foreground shadow-none hover:bg-primary/90 transition-colors',
    footerActionText: 'text-muted-foreground',
    footerActionLink: 'font-medium text-primary hover:text-primary/90',
    identityPreviewEditButton: 'text-primary hover:text-primary/90',
    formResendCodeLink: 'text-primary hover:text-primary/90',
    otpCodeFieldInput:
      'h-11 w-11 rounded-lg border-border bg-slate-50/80 text-foreground focus:border-primary focus:ring-1 focus:ring-primary',
    alertText: 'text-sm',
  },
} as const

