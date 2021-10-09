import React, { Component } from 'react';
import { HashRouter, Route, Switch, } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Admin from './admin';
import Home from './pages/home';
import NoMatch from './pages/nomatch'
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals'
import Loading from './pages/ui/loading'
import Notification from './pages/ui/notification'
import Message from './pages/ui/message';
import Tab from './pages/ui/tabs';
import Gallerys from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import FormLogin from './pages/form/login';
import Register from './pages/form/register'
import BasicTable from './pages/table/basic'
import High from './pages/table/high';
import City from './pages/city';
import Order from './pages/order'
import Common from './common';
import OrderDetail from './pages/order/detail'
import User from './pages/user'
import BikeMap from './pages/map/bikeMap';
import Bar from './pages/charts/bar';
import Pie from './pages/charts/pie';
import Line from './pages/charts/line';
import Rich from './pages/rich'
import PermissionUser from './pages/permission'

export default class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/common" render={() => {
                            return <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                            </Common>
                        }} />
                        <Route path="/" render={() =>
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home} />
                                    <Route path="/ui/buttons" component={Buttons} />
                                    <Route path="/ui/modals" component={Modals} />
                                    <Route path="/ui/loadings" component={Loading} />
                                    <Route path="/ui/notification" component={Notification} />
                                    <Route path="/ui/messages" component={Message} />
                                    <Route path="/ui/tabs" component={Tab} />
                                    <Route path="/ui/gallery" component={Gallerys} />
                                    <Route path="/ui/carousel" component={Carousels} />
                                    <Route path="/form/login" component={FormLogin} />
                                    <Route path="/form/reg" component={Register} />
                                    <Route path="/table/basic" component={BasicTable} />
                                    <Route path="/table/high" component={High} />
                                    <Route path="/city" component={City} />
                                    <Route path="/order" component={Order} />
                                    <Route path="/user" component={User} />
                                    <Route path="/bikeMap" component={BikeMap} />
                                    <Route path="/charts/bar" component={Bar} />
                                    <Route path="/charts/pie" component={Pie} />
                                    <Route path="/charts/line" component={Line} />
                                    <Route path="/rich" component={Rich} />
                                    <Route path="/permission" component={PermissionUser} />
                                    {/* <Redirect to='/home' /> */}
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>
                        } />


                    </Switch>
                </App>
            </HashRouter>
        )
    }
}