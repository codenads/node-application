import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateRegister from "./pages/Register/Create";
import ListRegister from "./pages/Register/List";
import Validate from "./pages/Validate";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/registros" component={ListRegister} />
        <Route path="/:id/registrar" component={CreateRegister} />
        <Route path="/:id/validar" component={Validate} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
