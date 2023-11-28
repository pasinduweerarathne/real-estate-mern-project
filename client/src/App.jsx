import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About, Home, Profile, SignIn, SignUp } from "./pages";
import ProtectedLayout from "./components/ProtectedLayout";
import axios from "axios";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import ListingForm from "./pages/Listing/ListingForm";
import Listing from "./pages/Listing/Listing";
import SearchListings from "./pages/searchListings/SearchListings";

function App() {
  axios.defaults.baseURL = "https://real-estate-app.cyclic.app";
  // axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.withCredentials = true;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/listings/:id" element={<Listing />} />
            <Route path="/search" element={<SearchListings />} />

            <Route element={<ProtectedLayout />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-listing" element={<ListingForm />} />
              <Route path="/create-listing/:id" element={<ListingForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
