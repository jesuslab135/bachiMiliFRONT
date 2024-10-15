import './globals.css';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard with FontAwesome icons',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* CDN de FontAwesome */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
