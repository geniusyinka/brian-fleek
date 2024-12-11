import { Providers } from '../providers';
import '@rainbow-me/rainbowkit/styles.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* Your other providers and components */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
