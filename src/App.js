
import "./css/browse.css"
import Browse from "./components/Browse";
import Show from "./components/Show";
import Loading from "./components/lib/Loading";
import Cache from "./lib/Cache";

import {BrowserRouter, Route, Switch} from "react-router-dom";
import ReactJson from "react-json-view";

function App() {
  return (
      <BrowserRouter basename={"/pokedex_react"}>
          <div className="App h-screen bg-black text-white overflow-auto">
             <Switch>
                 <Route exact path="/" component={ Browse }/>
                 <Route exact path={"/loading"} component={Loading}/>
                 <Route exact path={"/cache"}>
                     <ReactJson src={Cache.getInstance().all} theme="monokai"/>
                 </Route>
                 <Route path="/show/:pokemon" component={Show}/>
             </Switch>
          </div>
      </BrowserRouter>
  );
}

export default App;
