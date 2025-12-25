import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Boost Barn Motorsports Home Page',
  description: 'Check out our past builds, and find the parts you\'re looking for, for your build. Contact us if you need any help.',
  viewport: 'width=device-width, initial-scale=1, shrink-to-fit=yes',
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
