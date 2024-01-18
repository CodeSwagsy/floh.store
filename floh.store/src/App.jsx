import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { IndexContainer } from "./routes/Index/index.container.jsx";
import { ProfileContainer } from "./routes/Profile/profile.container.jsx";
import { SettingsContainer } from "./routes/ProfileSettings/settings.container.jsx";
import { GalleryContainer } from "./routes/Gallery/gallery.container.jsx";
import { SignInContainer } from "./routes/SignIn/signin.container.jsx";
import { RegisterContainer } from "./routes/Register/register.container.jsx";
import { OwnProductsContainer } from "./routes/OwnProducts/ownproducts.container.jsx";
import { FavoriteProductsContainer } from "./routes/FavoriteProducts/favoriteproducts.container.jsx";
import { AddProductContainer } from "./routes/AddProduct/addproducts.container.jsx";
import { AboutContainer } from "./routes/About/about.container.jsx";
import { RandomProductContainer } from "./routes/RandomProduct/randomproduct.container.jsx";
import { KontaktContainer } from "./routes/Kontakt/kontakt.container.jsx";
import { DatenschutzContainer } from "./routes/Datenschutz/datenschutz.container.jsx";
import { ImpressumContainer } from "./routes/Impressum/impressum.container.jsx";
import { ForgotPasswordContainer } from "./routes/ForgotPassword/forgotpassword.container.jsx";
import { NewPasswordContainer } from "./routes/NewPassword/newpassword.container.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<IndexContainer />} />
      <Route path="/home" element={<IndexContainer />} />
      <Route path="/start" element={<IndexContainer />} />
      <Route path="/about" element={<AboutContainer />} />
      <Route path="/kontakt" element={<KontaktContainer />} />
      <Route path="/datenschutz" element={<DatenschutzContainer />} />
      <Route path="/impressum" element={<ImpressumContainer />} />
      <Route path="/profile" element={<ProfileContainer />} />
      <Route path="/profile/settings" element={<SettingsContainer />} />
      <Route path="/profile/signin" element={<SignInContainer />} />
      <Route
        path="/profile/forgotpassword"
        element={<ForgotPasswordContainer />}
      />
      <Route path="/profile/newpassword" element={<NewPasswordContainer />} />
      <Route path="/profile/register" element={<RegisterContainer />} />
      <Route path="/profile/ownproducts" element={<OwnProductsContainer />} />
      <Route
        path="/profile/favoriteproducts"
        element={<FavoriteProductsContainer />}
      />
      <Route path="/products/gallery" element={<GalleryContainer />} />
      <Route path="/products/add" element={<AddProductContainer />} />
      <Route path="/products/random" element={<RandomProductContainer />} />
      <Route path="/*" element="404 - Seite nicht vorhanden" />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
