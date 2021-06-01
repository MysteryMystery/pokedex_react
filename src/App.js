
import "./css/browse.css"
import Browse from "./components/Browse";
import Show from "./components/Show";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
  return (
      <Router>
          <div className="App h-screen bg-black text-white overflow-auto">
             <Switch>
                 <Route exact path="/" component={ Browse }/>
                 <Route path="/show/:pokemon" component={Show}/>
             </Switch>
          </div>
      </Router>
  );
}

export default App;
