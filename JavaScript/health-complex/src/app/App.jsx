import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../pages/layouts/ui/AppLayout";
import AdminLayout from "pages/layouts/ui/AdminLayout";
import Test from "pages/test/Test";
import MainPage from "pages/main/ui/MainPage";
import { ArticlesPage } from "pages/articles";
import { CreateArticlePage } from "pages/create-article";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EditArticlePage } from "pages/edit-article";
import { HeritageToaster } from "widgets/toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AdminAuthPage from "pages/authentication/ui/AdminAuthPage";
import ProtectedRoute from "pages/authentication/ui/ProtectedRoute";
import IndexAdminNavigate from "./react-router/IndexAdminNavigate";
import AdminRoomsPage from "pages/admin-rooms/ui/AdminRoomsPage";
import { CreateRoomPage } from "pages/create-room";
import { EditRoomPage } from "pages/edit-room";
import OrderContextProvider from "./context/OrderContextProvider";
import { OrderDateTimePage } from "pages/order-date-time";
import { OrderRoomPage } from "pages/order-room";
import AuthContextProvider from "./context/AuthContextProvider";
import AdminAuthContextProvider from "./context/AdminAuthContextProvider";
import AdminOrdersPage from "pages/admin-orders/ui/AdminOrdersPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route
            element={
              <AuthContextProvider>
                <AppLayout />
              </AuthContextProvider>
            }
          >
            <Route index element={<MainPage />} />
            <Route path="order" element={<OrderContextProvider />}>
              <Route path="date" element={<OrderDateTimePage />} />
              <Route path="room" element={<OrderRoomPage />} />
            </Route>
            <Route path="test" element={<Test />} />
          </Route>
          <Route path="admin" element={<AdminAuthContextProvider />}>
            <Route index element={<IndexAdminNavigate />} />
            <Route path="auth" element={<AdminAuthPage />} />
            <Route
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="articles" element={<ArticlesPage />} />
              <Route path="articles/edit" element={<CreateArticlePage />} />
              <Route path="articles/edit/:id" element={<EditArticlePage />} />
              <Route path="rooms" element={<AdminRoomsPage />} />
              <Route path="rooms/edit" element={<CreateRoomPage />} />
              <Route path="rooms/edit/:id" element={<EditRoomPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <HeritageToaster />
    </QueryClientProvider>
  );
}

export default App;
