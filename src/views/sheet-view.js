import React from "react";
import { Animated, Easing, View, Dimensions } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
const SCREEN_HEIGHT = Dimensions.get("window").height;
class SheetView extends React.PureComponent {
  yTransform = new Animated.Value(SCREEN_HEIGHT);
  gestureRef = React.createRef({});
  scrollViewRef = React.createRef(null);
  get animateUp() {
    return new Animated.spring(this.yTransform, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
      tension: 25,
      friction: 10,
    });
  }

  get maxY() {
    return this.height || SCREEN_HEIGHT;
  }

  get animateDown() {
    return new Animated.timing(this.yTransform, {
      toValue: this.maxY,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.out(Easing.linear),
    });
  }

  componentDidMount() {
    this.open();
  }
  open = () => {
    this.yTransform.setValue(this.maxY);
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

  measureHeight = (e) => {
    this.height = e.nativeEvent?.layout?.height;
  };

  isScrolling = false;
  scrollOffset = 0;

  onScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;

    this.scrollOffset = currentOffset;
    if (event.nativeEvent.velocity?.y !== 0) {
      this.isScrolling = true;
    }
  };

  resetPosition = () => {
    Animated.spring(this.yTransform, {
      toValue: 0,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
      tension: 25,
      friction: 10,
    }).start();
  };

  get enhancedChildren() {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        ...child.props,
        syncScrollEvent: this.onScroll,
      });
    });
  }
  onSwipeDown = () => {
    this.close();
  };
  render() {
    let translation = 0;

    const panGesture = Gesture.Pan()
      .onBegin(() => {
        this.isScrolling = false;
      })
      .onUpdate((e) => {
        let shouldUpdate = this.scrollOffset <= 0 && !this.isScrolling;

        if (shouldUpdate) {
          translation = e.translationY;
          this.yTransform.setValue(Math.max(0, translation));
        }
      })
      .onFinalize(() => {
        this.isScrolling = false;
        const THRESHOLD = this.height ? this.height * 0.2 : 150;

        if (translation > THRESHOLD) {
          this.onSwipeDown();
        } else {
          this.resetPosition();
        }
      });

    return (
      <View>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            onLayout={this.measureHeight}
            pointerEvents={"box-none"}
            style={{
              transform: [{ translateY: this.yTransform }],
            }}
          >
            {this.enhancedChildren}
          </Animated.View>
        </GestureDetector>
      </View>
    );
  }
}
export default SheetView;
