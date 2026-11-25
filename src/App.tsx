import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { ScrollManager } from "./components/layout/ScrollManager";
import Home from "./pages/Home";

// Home is eager (first paint). Everything else is code-split.
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Fallback() {
  return (
    <div
      className="grid min-h-[50vh] place-items-center"
      role="status"
      aria-label="Loading"
    >
      <span className="size-8 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Auth pages use their own full-screen layout */}
        <Route
          path="signin"
          element={
            <>
              <ScrollManager />
              <SignIn />
            </>
          }
        />
        <Route
          path="signup"
          element={
            <>
              <ScrollManager />
              <SignUp />
            </>
          }
        />
      </Routes>
    </Suspense>
  );
}
