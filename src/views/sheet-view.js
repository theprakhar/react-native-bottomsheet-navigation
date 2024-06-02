import React from "react";
import { Animated, Easing,Dimensions } from "react-native";
const entireScreenHeight = Dimensions.get('window').height


class SheetView extends React.PureComponent {
  yTransform = new Animated.Value(entireScreenHeight);

  animateUp = new Animated.timing(this.yTransform, {
    toValue: 0,
    duration: 400,
    useNativeDriver: true,
    easing: Easing.inOut(Easing.ease),
  });
  animateDown = new Animated.timing(this.yTransform, {
    toValue: entireScreenHeight,
    duration: 400,
    useNativeDriver: true,
    easing: Easing.inOut(Easing.ease),
  });
  componentDidMount() {
    this.open();
  }
  open = () => {
    this.animateUp.start(this.props.onOpen);
  };
  close = () => {
    setTimeout(this.props.onClose, 200);
    this.animateDown.start();
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.closing && this.props.closing == true) {
      this.close();
    }
  }

  render() {
    return (
      <Animated.View
        pointerEvents={"box-none"}
        style={{
          transform: [{ translateY: this.yTransform }],
        }}>
        {this.props.children}
      </Animated.View>
    );
  }
}
export default SheetView;
