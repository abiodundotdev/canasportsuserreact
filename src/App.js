import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import Login from "./screens/login";
import Dashboard from "./screens/dashboard";
import Profile from './screens/profile';
import Transactions from './screens/transactions';
import Tickets from './screens/tickets';
import BuyTicket from './screens/buyticket';
import DisplayTicket from './screens/displayticket';
import ForgetPassword from './screens/forgetpassword';
import SignUpAccount from './screens/register';


function App() {
  return (
    <Router>
       <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          <Route path="/dashboard">
            <Dashboard />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/transactions">
            <Transactions />
          </Route>

          <Route path="/tickets">
              <Tickets />
          </Route>

          <Route path="/forgetpassword">
              <ForgetPassword />
          </Route>

          <Route path="/signup">
             <SignUpAccount />
          </Route>
        
          <Route path="/buyticket/:matchId" children={<BuyTicket />} />

          <Route path="/viewticket/:ticketId" children={<DisplayTicket />} />

        </Switch>
    </Router>
    );
}

export default App;
