export const typography = {
  heading: { fontSize: 24, fontWeight: '700' as const, color: '#FFFFFF' },
  subheading: { fontSize: 18, fontWeight: '600' as const, color: '#FFFFFF' },
  body: { fontSize: 16, fontWeight: '400' as const, color: '#FFFFFF' },
  bodySecondary: { fontSize: 14, fontWeight: '400' as const, color: '#7B8BA3' },
  caption: { fontSize: 12, fontWeight: '400' as const, color: '#7B8BA3' },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#7B8BA3',
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
  mono: {
    fontSize: 32,
    fontWeight: '300' as const,
    color: '#FFFFFF',
    fontFamily: 'monospace',
  },
} as const;
