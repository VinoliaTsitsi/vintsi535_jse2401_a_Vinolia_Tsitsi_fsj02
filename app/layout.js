import "./globals.css";

/**
 * RootLayout component provides a consistent layout structure for the application.
 *
 * This component sets up global HTML and body attributes, such as language and font styling.
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
        {/* Render the children */}
        {children}
      </body>
    </html>
  );
}
