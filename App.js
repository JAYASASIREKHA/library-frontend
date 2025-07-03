import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation
} from 'react-router-dom';
import Home from './Pages/Home';
import Signin from './Pages/Signin';
import MemberDashboard from './Pages/Dashboard/MemberDashboard/MemberDashboard';
import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard';
import Allbooks from './Pages/Allbooks';
import Header from './Components/Header';
import { AuthContext } from './Context/AuthContext';
import PopularBooks from './Components/PopularBooks';
import RecentAddedBooks from './Components/RecentAddedBooks';
import ReservedBooks from './Components/ReservedBooks';
import Stats from './Components/Stats';
import BookDetails from './Components/BookDetails';
import Footer from './Components/Footer';
import Register from './Components/Register';
import AdminLogin from './Pages/AdminLogin';

const AppContent = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  // Helper function to render protected routes
  const renderRoute = (Component, isAdmin = false) => {
    if (user) {
      if (user.isAdmin === isAdmin) {
        return <Component />;
      }
      return <Redirect to="/home" />;
    }
    return <Redirect to="/" />;
  };

  // Hide footer on Signin page, home page, recent uploads page, books page, and admin dashboard
  const isSigninPage = location.pathname === '/';
  const isHomePage = location.pathname === '/home';
  const isRecentPage = location.pathname === '/recent';
  const isBooksPage = location.pathname === '/books';
  const isAdminDashboard = location.pathname === '/dashboard@admin';
  const isRegisterPage = location.pathname === '/register';
  const isAdminLoginPage = location.pathname === '/admin-login';
  const isMemberDashboard = location.pathname === '/dashboard@member';
  const isPopularPage = location.pathname === '/popular';
  const isReservedPage = location.pathname === '/reservedbooks';
  const showFooter = !isSigninPage && !isHomePage && !isRecentPage && !isBooksPage && !isAdminDashboard && !isRegisterPage && !isAdminLoginPage && !isMemberDashboard && !isPopularPage && !isReservedPage;

  return (
    <>
      <Header />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/dashboard@member">
            {renderRoute(MemberDashboard, false)}
          </Route>
          <Route exact path="/dashboard@admin">
            {renderRoute(AdminDashboard, true)}
          </Route>
          <Route exact path="/books" component={Allbooks} />
          <Route exact path="/popular" component={PopularBooks} />
          <Route exact path="/recent" component={RecentAddedBooks} />
          <Route exact path="/reservedbooks" component={ReservedBooks} />
          <Route exact path="/stats" component={Stats} />
          <Route exact path="/book/:bookId" component={BookDetails} />
          <Route path="/register" component={Register} />
          <Route exact path="/admin-login" component={AdminLogin} />
          <Redirect to="/" />
        </Switch>
      </div>
      {showFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
