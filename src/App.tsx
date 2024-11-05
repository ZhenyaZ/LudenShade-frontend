import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomeLayout from './components/Layouts/HomeLayout';
import Home from './components/Page/Home/Home';
import Chat from './components/Page/Chat/Chat';
import AuthLayout from './components/Layouts/AuthLayout/AuthLayout';
import SignIn from './components/Page/Auth/SignIn/SignIn';
import SignUp from './components/Page/Auth/SignUp/SignUp';
import { Theme } from '@radix-ui/themes';
import { useSettingsStore } from './utils/stores/Settings/store';
import ErrorPage from './components/UI/ErrorPage/ErrorPage';
import ProtectedRouter from './utils/Routes/ProtectedRouter';
import PublicRouter from './utils/Routes/PublicRouter';
import SocketProvider from './utils/SocketProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from "@vercel/analytics/react"

const queryClient = new QueryClient();

function App() {
  const theme = useSettingsStore((state) => state.theme);
  const accentColor = useSettingsStore((state) => state.accentColor);

  return (
    <QueryClientProvider client={queryClient}>
      <Analytics />
      <SocketProvider>
        {/* @ts-expect-error @ts-ignore */}
        <Theme accentColor={accentColor} appearance={theme} panelBackground="translucent" radius="full">
          <Router>
            <Routes>
              <Route element={<PublicRouter />}>
                <Route element={<AuthLayout />}>
                  <Route path="/auth/signin" element={<SignIn />} />
                  <Route path="/auth/signup" element={<SignUp />} />
                </Route>
              </Route>
              <Route path="/" element={<Navigate to={'/auth/signin'} replace />} />

              <Route path="/error" element={<ErrorPage />} />
              <Route element={<ProtectedRouter />}>
                <Route element={<HomeLayout />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/chat/:id" element={<Chat />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </Theme>
      </SocketProvider>
    </QueryClientProvider>
  );
}

export default App;
