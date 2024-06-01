import React from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import SheetView from "./sheet-view";

class SheetContainer extends React.PureComponent {
  opacity = new Animated.Value(0);
  fadeIn = new Animated.timing(this.opacity, {
    toValue: 1,
    duration: 150,
    useNativeDriver: true,
    easing: Easing.in(Easing.linear),
  });
  fadeOut = new Animated.timing(this.opacity, {
    toValue: 0,
    duration: 150,
    useNativeDriver: true,
    easing: Easing.in(Easing.linear),
  });
  componentDidMount() {
    this.fadeIn.start();
  }
  handleOpen = () => {
    const { onOpenRoute, routeId } = this.props;
    onOpenRoute({ routeId });
  };
  handleClose = () => {
    const { onCloseRoute, routeId } = this.props;
    this.fadeOut.start(() => {
      onCloseRoute({ routeId });
    });
  };

  render() {
    const { opening, closing, addSelfToClosingRoutes } = this.props;
    return (
      <View style={styles.container}>
        <Animated.View style={styles.bgOverlay}>
          <TouchableOpacity
            onPress={addSelfToClosingRoutes}
            style={styles.bgOverlayOnPress}
          />
        </Animated.View>
        <SheetView
          onOpen={this.handleOpen}
          onClose={this.handleClose}
          closing={closing}
          opening={opening}>
          {this.props.children}
        </SheetView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    position: "absolute",
  },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#00000080",
  },
  bgOverlayOnPress: { width: "100%", height: "100%" },
});
export default SheetContainer;
