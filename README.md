
# React Native iOS Context Menu

Use iOS context menus in your React Native app.

[Apple Developer Documentation](https://developer.apple.com/design/human-interface-guidelines/context-menus)

<br/>

![media](https://user-images.githubusercontent.com/9566334/270151392-cbe52061-f126-40bd-b380-051804e37f13.gif)


# API documentation

- [API Documentation](https://hadimodarres.github.io/react-native-ios-context-menu)

<br/>

# Get Started

## Installation in managed Expo projects

This package requires a development build of Expo to run as it contains custom native code. To create a development build, please refer to [Creating a Development Build](https://docs.expo.dev/develop/development-builds/create-a-build/) 

## Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the package to your npm dependencies

```
npm install react-native-ios-context-menu
```

### Configure for iOS

```
npx pod-install
``` 
<br/>

# Usage

Simply wrap the view you want to add context menu to with `ContextMenu`:

```
import { Text } from "react-native";
import { ContextMenu } from "react-native-ios-context-menu";

const Example = () => {
  return (
    <ContextMenu
      menu={{
        type: "menu",
        title: "Sample Menu",
        children: [
          { type: "action", title: "Notify Me" },
          { type: "action", title: "Undo" },
          { type: "action", title: "Mark" },
        ],
      }}
    >
      <Text>Press Me</Text>
    </ContextMenu>
  );
};
```

