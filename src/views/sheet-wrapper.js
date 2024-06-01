import React from "react";
import { View } from "react-native";
import BottomsheetStackView from "./sheet-stack-view";
class SheetWrapper extends React.PureComponent {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.children}
        <BottomsheetStackView />
      </View>
    );
  }
}
export default SheetWrapper;
