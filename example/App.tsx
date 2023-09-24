import { ScrollView, Text, View } from "react-native";
import { ContextMenu } from "react-native-ios-context-menu";

function createSequentialArray(start: number, end: number) {
  return new Array(end - start + 1)
    .fill(start)
    .map((value, index) => value + index);
}

const arr = createSequentialArray(1, 30);

export default function App() {
  return (
    <ScrollView style={{ borderColor: "red", borderWidth: 2, marginTop: 50 }}>
      {arr.map((i) => (
        <ContextMenu
          key={i}
          renderPreview={() => (
            <View
              style={{ backgroundColor: "red", width: "100%", height: "100%" }}
            >
              <Text>{i}</Text>
            </View>
          )}
          willDisplay={() => {
            console.log("will display " + i);
          }}
          willEnd={() => {
            console.log("will end " + i);
          }}
          menu={{
            type: "menu",
            title: "menu title " + i,
            children: [
              {
                title: "action title " + i,
                type: "action",
                image: {
                  systemName: "square.and.arrow.up.circle.fill",
                },
                handler: () => {
                  console.log(`pressed action: ${i}`);
                },
              },
            ],
          }}
        >
          <Text style={{ lineHeight: 32, fontSize: 32 }}>{i}</Text>
        </ContextMenu>
      ))}
    </ScrollView>
  );
}
