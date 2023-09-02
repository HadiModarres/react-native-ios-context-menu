import { LogBox, Text, View } from "react-native";
import { ContextMenu } from "react-native-ios-context-menu";

const ContextMenuPreview = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "white",
        borderWidth: 12,
      }}
    >
      <Text>context menu preview</Text>
    </View>
  );
};

export default function App() {
  return (
    <>
      <ContextMenu
        containerProps={{ style: { position: "absolute", top: 200 } }}
        Preview={<ContextMenuPreview />}
        willDisplay={() => {
          console.log("will fuck 2");
        }}
        menu={{
          type: "menu",
          title: "menu title",
          children: [
            {
              type: "action",
              title: "action title",
              handler: () => {
                console.log("pressed action");
              },
            },
          ],
        }}
      >
        <Text>press me!</Text>
      </ContextMenu>
    </>
  );
}
