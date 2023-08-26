import { useMemo } from "react";
import { Text, View } from "react-native";
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

const ContextMenuPreview2 = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "blue",
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
    <ContextMenu
      containerProps={{ style: { position: "absolute", top: 200 } }}
      Preview={ContextMenuPreview}
      willDisplay={() => {
        console.log("will fuck 2");
      }}
      menu={{
        title: "my titleee!!!",
        subtitle: "subtatoole",
        children: [
          {
            menu: {
              value: {
                title: "submenu titlee",
                subtitle: "submenu subtitle",
                image: { systemName: "network" },
                children: [
                  {
                    action: {
                      value: {
                        title: "action titlee nested",
                        subtitle: "action subtitle nested!",
                        handler: () => {
                          console.log("yesssssssss!!");
                        },
                      },
                    },
                  },

                  {
                    action: {
                      value: {
                        title: "action titlee nested 2",
                        subtitle: "action subtitle nested! 22",
                      },
                    },
                  },

                  {
                    menu: {
                      value: {
                        title: "action titlee nested 2",
                        subtitle: "action subtitle nested! 22",
                        children: [
                          {
                            action: {
                              value: { title: "hello", subtitle: "hello2" },
                            },
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            },
          },
          {
            action: {
              value: {
                title: "action titlee",
                subtitle: "action subtitle!",
                image: { systemName: "chair" },
                handler: () => {
                  console.log("handler 2!");
                },
              },
            },
          },
        ],
      }}
    >
      <Text>press me!</Text>
    </ContextMenu>
  );
}
