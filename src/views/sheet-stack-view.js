import React from "react";
import {
  BOTTOMSHEET_NAVIGATION_EVENT,
  addNavigationEventListener,
} from "../utils/events";
import SheetContainer from "./sheet-container";
import { View } from "react-native";

class SheetStackView extends React.PureComponent {
  constructor(props) {
    super(props);
    Object.values(BOTTOMSHEET_NAVIGATION_EVENT).forEach((event) => {
      const callback = (data) => this.handleEvent(event, data);
      addNavigationEventListener(event, callback);
    });
  }

  state = {
    routes: [], //stack
    openingRouteKeys: [], //views in the routes that are opening currently
    closingRouteKeys: [], //views in the routes that need to be closed,
    //or are undergoing their onclose behaviour(/animation)
  };

  handleEvent = (eventType, descriptor) => {
    switch (eventType) {
      case BOTTOMSHEET_NAVIGATION_EVENT.PUSH: {
        // adds the route to state routes,
        //and also adds it to the opening routes to initiate the opening behavior
        const { routes, openingRouteKeys } = this.state;
        const alreadyExistsInRoutes =
          routes.findIndex((item) => {
            return item?.id == descriptor?.id;
          }) != -1;
        if (openingRouteKeys.includes(descriptor.id) || alreadyExistsInRoutes) {
          //skip if already exist
          return;
        }
        this.setState({
          routes: routes.concat(descriptor),
          openingRouteKeys: openingRouteKeys.concat(descriptor.id),
        });
        break;
      }
      case BOTTOMSHEET_NAVIGATION_EVENT.NAVIGATE: {
        // adds the route to state routes,
        //and also adds it to the opening routes to initiate the opening behavior
        const { routes, openingRouteKeys } = this.state;
        let mutatedRoutes = routes.slice();
        if (openingRouteKeys.includes(descriptor.id)) {
          //skip if already exist
          return;
        }
        const indexOfDescriptorInRoutes = routes.findIndex((item) => {
          return item?.name == descriptor?.name;
        });

        if (indexOfDescriptorInRoutes >= 0) {
          //route with same component already exists in routes
          if (indexOfDescriptorInRoutes == routes.length - 1) {
            //component is already at the top, skip
            return;
          }
          mutatedRoutes.splice(indexOfDescriptorInRoutes, 1);
        }
        this.setState({
          routes: mutatedRoutes.concat(descriptor),
          openingRouteKeys: openingRouteKeys.concat(descriptor.id),
        });
        break;
      }
      case BOTTOMSHEET_NAVIGATION_EVENT.CLOSE: {
        //adds the route to the closing route list
        const { closingRouteKeys, routes } = this.state;
        const indexOfDescriptorInRoutes = routes.findIndex((item) => {
          return item?.id == descriptor?.id;
        });
        if (indexOfDescriptorInRoutes == -1) {
          return;
        }
        if (closingRouteKeys.includes(descriptor.id)) {
          //skip if already exists
          return;
        }
        this.setState({
          closingRouteKeys: closingRouteKeys.concat(descriptor.id),
        });
        break;
      }
      case BOTTOMSHEET_NAVIGATION_EVENT.CLOSE_ALL: {
        //adds all routes to the closing route list
        const { routes } = this.state;
        this.setState({
          closingRouteKeys: routes.map((route) => route.id),
        });
        break;
      }
    }
  };

  handleOpenRoute = ({ routeId }) => {
    //removes the route from the opening and closing routes,
    //since it has been opened now,ie. animation done,etc
    const { openingRouteKeys, closingRouteKeys } = this.state;
    const removeOpenedRouteKeys = (id) => id !== routeId;
    this.setState({
      openingRouteKeys: openingRouteKeys.filter(removeOpenedRouteKeys),
      closingRouteKeys: closingRouteKeys.filter(removeOpenedRouteKeys),
    });
  };

  handleCloseRoute = ({ routeId }) => {
    //removes the route from everywhere, since it has been done closing
    const { routes, openingRouteKeys, closingRouteKeys } = this.state;
    const removeClosedRouteKeys = (id) => id !== routeId;
    this.setState({
      routes: routes.filter((r) => r.id !== routeId),
      openingRouteKeys: openingRouteKeys.filter(removeClosedRouteKeys),
      closingRouteKeys: closingRouteKeys.filter(removeClosedRouteKeys),
    });
  };

  render() {
    const { routes, openingRouteKeys, closingRouteKeys } = this.state;

    return (
      <View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}>
        {routes.map((description, index) => {
          const id = description.id;
          const opening = openingRouteKeys.includes(id);
          const closing = closingRouteKeys.includes(id);
          return (
            <SheetContainer
              onCloseRoute={this.handleCloseRoute}
              onOpenRoute={this.handleOpenRoute}
              opening={opening}
              closing={closing}
              addSelfToClosingRoutes={description.closeSelf}
              key={id}
              routeId={id}>
              {description.render()}
            </SheetContainer>
          );
        })}
      </View>
    );
  }
}

export default SheetStackView;
