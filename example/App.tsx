import { StyleSheet, Text, View } from "react-native";
import { ContextMenu } from "react-native-ios-context-menu";

export default function App() {
  return (
    <ContextMenu
      preview={<View style={{ width: "100%", height: "100%" }} />}
      menu={{
        title: "my titleee!!!",
        subtitle: "my subtitle",
        children: [
          {
            menu: {
              value: {
                title: "submenu titlee",
                subtitle: "submenu subtitle",
                children: [
                  {
                    action: {
                      value: {
                        title: "action titlee nested",
                        subtitle: "action subtitle nested!",
                      },
                    },

                    // menu: {
                    //   value: {
                    //     title: "nested menu 2",
                    //     children: [],
                    //   },
                    // },
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
              value: { title: "action titlee", subtitle: "action subtitle!" },
            },
          },
        ],
      }}
    >
      <Text>press me!</Text>
    </ContextMenu>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
