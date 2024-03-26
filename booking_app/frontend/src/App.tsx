import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Layout from "./layouts/Layout"
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddProperty from "./pages/AddProperty";
import { useAppContext } from "./contexts/AppContext";
import MyProperties from "./pages/MyProperties";
import EditProperty from "./pages/EditProperty";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";


const App = () => {
 const {isLoggedIn} = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><p>Homepage</p></Layout>}/>
        <Route path="/search" 
        element={
            <Layout>
              <Search/>
            </Layout>
          }
        />

        <Route path="/detail/:propertyId" 
        element={
            <Layout>
              <Detail/>
            </Layout>
          }
        />

        <Route path="/register" element={
        <Layout>
          <Register/>
        </Layout>}/>
        <Route path="/sign-in" element={<Layout> <SignIn/> </Layout>}/>

        {isLoggedIn && (
        <>

        <Route path="/property/:propertyId/booking"
         element={
          <Layout>
            <Booking />
          </Layout>
        } 
        />

        <Route path="/add-property"
         element={
          <Layout>
            <AddProperty />
          </Layout>
        } 
        />
        <Route path="/edit-property/:propertyId"
         element={
          <Layout>
            <EditProperty />
          </Layout>
        } 
        />
        <Route path="/my-properties"
         element={
          <Layout>
            <MyProperties />
          </Layout>
        } 
        />
        </>
        )}
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </Router>
  );
};

export default App;