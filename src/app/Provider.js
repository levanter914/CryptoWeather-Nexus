'use client';
import ReduxProvider from '@/ReduxStore/ReduxProvider';

export default function Providers({ children }) {
  return (
      <ReduxProvider>
        {children}
      </ReduxProvider>
  );
}
