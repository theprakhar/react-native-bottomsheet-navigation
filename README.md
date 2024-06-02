# react-native-bottomsheet-navigation

Simplest bottomsheet navigation package for react-native. Convert any component to bottomsheet. Minimal dependencies required, wrap the app with the wrapper component and show any component as a bottomsheet from anywhere in the app

<img src="https://github.com/theprakhar/misc/blob/main/example.gif" width=30%>


## Installation

```sh
npm install react-native-bottomsheet-navigation
```

## API 
| function        | Description          | Function Arguments           | Returns  |
| ------------- |:-------------:|:-------------:| -----:|
| pushSheet      |  Function to "push" bottomsheet on top. | SheetComponent:React.Component, sheetParams:object | SheetHandler |
| navigateToSheet      | Moves the bottomsheet on to the top of the stack if sheet with same "sheetName" exists in the stack,  otherwise pushes a new instance on the top     |Component: React.Component,sheetParams:object, sheetName:string    |  SheetHandler |
| closeAll | Function to close all the bottomsheets   |  |     |

## Types 
 | Type        | Description           | 
| ------------- |:-------------:|  
| SheetHandler    | Sheet handler for a bottomsheet instance,consists of function "close" and "isOpened" | 
| SheetParams     | parameters that the bottomsheet will get in props as "sheetParams"     |   



## Usage

```js
import BottomsheetNavigation,{BottomsheetWrapper} from "react-native-bottomsheet-navigation";

//component to be shown as sheet
function CustomSheet({sheetParams,closeSelf}){
  const title =sheetParams?.title
  const subTitle= sheetParams?.subTitle
  return (
    <View style={styles.sheetContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{subTitle}</Text>
      <Button
      onPress={closeSelf}
      title="Close sheet"
      color="#841584"/>
    </View>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const sheetHandler= useRef({})
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    justifyContent:"center",
    flex:1,
    padding:32
  };

  const onBtnPress=useCallback(()=>{
    sheetHandler.current =  BottomsheetNavigation.pushSheet(CustomSheet,{title:"Example",subTitle:"Some description..."});
  },[])

  return (
    <BottomsheetWrapper>
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
       <Button
       onPress={onBtnPress}
       title="Open sheet"
       color="#841584"/>
    </SafeAreaView>
    </BottomsheetWrapper>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color:"black"
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color:"black",
    marginBottom:32

  },
  highlight: {
    fontWeight: '700',
  },
  sheetContainer:{
    padding:24,
    backgroundColor:"white"
  }
});
```



## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

--
