import "./globals.css";
import Header from './components/header'; // Import the Header component

/**
 * RootLayout component provides a consistent layout structure for the application.
 *
 * This component includes the Header component at the top and renders the children components
 * passed to it. It also sets up global HTML and body attributes, such as language and font styling.
 * 
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The content to be rendered within the layout.
 * 
 * @returns {JSX.Element} The RootLayout component.
 * 
 * @example
 * return (
 *   <RootLayout>
 *     <YourComponent />
 *   </RootLayout>
 * );
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Add the Header component here */}
        <Header />
        
        {/* Render the children */}
        {children}
      </body>
    </html>
  );
}
