# react-native-bottomsheet-navigation

Simplest bottomsheet navigation package for React Native. Convert any component into a bottomsheet. Wrap your app with the provided wrapper component and display any component as a bottomsheet from anywhere in the app.

<img src="https://github.com/theprakhar/misc/blob/main/bottomsheet-example.gif" width="30%">

---

## Features

- Lightweight and simple to integrate.
- Push and navigate between bottomsheet components seamlessly.
- Minimal configuration required.
- Fully customizable components and behavior.
- Supports swipe-to-dismiss functionality.

---

## Installation

To install the package, run:

```bash
npm install react-native-bottomsheet-navigation
```

Additionally, install and configure `react-native-gesture-handler` as it is a required dependency for detecting swipe gestures.

```bash
npm install react-native-gesture-handler
```

---

## Important Setup Instructions

1. The app **must** be wrapped with `GestureHandlerRootView` to enable gesture handling for swipe-to-dismiss functionality.

2. It is **recommended** to wrap the entire app with `BottomsheetWrapper` to ensure proper functionality of the bottomsheet navigation. Without this wrapper, the sheets cannot be displayed.

Example:

```javascript
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomsheetWrapper } from "react-native-bottomsheet-navigation";

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomsheetWrapper>
        {/* Rest of your app code */}
      </BottomsheetWrapper>
    </GestureHandlerRootView>
  );
}
```

---

## API

### Methods

| Function        | Description                                                                                           | Arguments                                                                                     | Returns       |
|-----------------|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|---------------|
| `pushSheet`     | Pushes a new bottomsheet to the stack.                                                                | `SheetComponent: React.Component`, `sheetParams: object`                                     | `SheetHandler`|
| `navigateToSheet` | Navigates to an existing bottomsheet (if already in the stack) or pushes a new one to the top.       | `Component: React.Component`, `sheetParams: object`, `sheetName: string`                    | `SheetHandler`|
| `closeAll`      | Closes all open bottomsheets.                                                                         | None                                                                                         | None          |

### Types

| Type            | Description                                                                                           |
|-----------------|-------------------------------------------------------------------------------------------------------|
| `SheetHandler`  | Handler object for a bottomsheet instance, containing `close` and `isOpened` methods.                 |
| `SheetParams`   | Parameters passed to the bottomsheet component as `sheetParams` props.                                |

---

## Sheet Component Props

Each bottomsheet component automatically receives the following additional props:

- `closeSelf`: A function to close the sheet from within the component.
- `syncScrollEvent`: A function to attach to a `ScrollView` (if present within the sheet component) to detect swipe-down gestures.

---

## Usage

Here’s an example of how to use `react-native-bottomsheet-navigation` in your app:

```javascript
import BottomsheetNavigation, { BottomsheetWrapper } from "react-native-bottomsheet-navigation";
import { useRef, useCallback } from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  View,
  useColorScheme
} from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Component to be displayed as a bottomsheet
function CustomSheet({ sheetParams, closeSelf, syncScrollEvent }) {
  const title = sheetParams?.title;
  const subTitle = sheetParams?.subTitle;

  return (
    <View style={styles.sheetContainer}>
      <ScrollView onScroll={syncScrollEvent}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionDescription}>{subTitle}</Text>
        <Button
          onPress={closeSelf}
          title="Close sheet"
          color="#841584"
        />
      </ScrollView>
    </View>
  );
}

function App() {
  const isDarkMode = useColorScheme() === "dark";
  const sheetHandler = useRef({});
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    justifyContent: "center",
    flex: 1,
    padding: 32,
  };

  const onBtnPress = useCallback(() => {
    sheetHandler.current = BottomsheetNavigation.pushSheet(CustomSheet, {
      title: "Example",
      subTitle: "Some description...",
    });
  }, []);

  return (
    <GestureHandlerRootView>
      <BottomsheetWrapper>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? "light-content" : "dark-content"}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Button
            onPress={onBtnPress}
            title="Open sheet"
            color="#841584"
          />
        </SafeAreaView>
      </BottomsheetWrapper>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    padding: 24,
    backgroundColor: "white",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: "black",
    marginBottom: 32,
  },
});
```



## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

--
