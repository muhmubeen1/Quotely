// src/App.tsx  (or wherever your routes are defined)

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MainLayout } from '@/components/layout/MainLayout';
import { BookDetailPage } from '@/pages/BookDetailPage';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Pages
import AddBookPage from '@/pages/AddBookPage'; // ← Default import
import { AudioPage } from '@/pages/AudioPage';
import { BooksPage } from '@/pages/BooksPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ExportPage } from '@/pages/ExportPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { PricingPage } from '@/pages/PricingPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { PublicQuotePage } from '@/pages/PublicQuotePage';
import { QuotesPage } from '@/pages/QuotesPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ScanPage } from '@/pages/ScanPage';
import { SearchPage } from '@/pages/SearchPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { SingleBookPage } from '@/pages/SingleBookPage';
import { SubscriptionPage } from '@/pages/SubscriptionPage';

import { TagsPage } from '@/pages/TagsPage';

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/quote/:id" element={<PublicQuotePage />} />
          </Route>

          {/* Dashboard Routes - ADD THE NEW ROUTE HERE */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/new" element={<AddBookPage />} />     {/* ← This was missing */}
            <Route path="/books/:id" element={<SingleBookPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            <Route path="/quotes" element={<QuotesPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/tags" element={<TagsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/export" element={<ExportPage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/audio" element={<AudioPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
          </Route>

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;