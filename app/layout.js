import Header from './header'
import '../styles/app.scss';
import { ContextProvider } from '../components/Clients';


export const metadata = {
  title: 'Todo App',
  description: 'This is a todo app project made for Next JS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <>
            <Header />
            {children}
          </>
        </ContextProvider>
      </body>
    </html>
  )
}
