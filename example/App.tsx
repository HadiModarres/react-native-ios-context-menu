import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { ContextMenu } from "react-native-ios-context-menu";

export default function App() {
  return (
    <ScrollView style={{ marginTop: 60 }}>
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
        <Row title="Context Menu" subtitle="Context Menu basic usage" />
        <Divider />
      </ContextMenu>
      <ContextMenu
        menu={{
          type: "menu",
          title: "Title",
          children: [
            {
              type: "action",
              title: "Notify Me",
              image: { systemName: "bell" },
            },
            {
              type: "action",
              title: "Undo",
              image: { systemName: "arrow.uturn.backward.square" },
            },
            {
              type: "action",
              title: "Mark",
              image: { systemName: "bookmark" },
            },
          ],
        }}
      >
        <Row
          title="Context Menu With Images"
          subtitle="Show a context menu with system images for each item"
        />
        <Divider />
      </ContextMenu>
      <ContextMenu
        menu={{
          type: "menu",
          title: "Title",
          children: [
            {
              type: "action",
              title: "Notify Me",
              image: { systemName: "bell" },
            },
            {
              type: "action",
              title: "Undo",
              image: { systemName: "arrow.uturn.backward.square" },
            },
            {
              type: "menu",
              title: "Mark",
              image: { systemName: "bookmark" },
              children: [
                {
                  type: "action",
                  title: "Mark Item",
                  image: { systemName: "checkmark.seal" },
                },
                {
                  type: "action",
                  title: "Mark All",
                  image: { systemName: "arrowshape.turn.up.left.2" },
                },
              ],
            },
          ],
        }}
      >
        <Row
          title="Context Menu With Nested Menus"
          subtitle="Naviate back and forth between multiple nested menus"
        />
        <Divider />
      </ContextMenu>
      <ContextMenu
        renderPreview={() => <Preview title="Preview" />}
        menu={{
          type: "menu",
          title: "Title",
          children: [
            {
              type: "action",
              title: "Notify Me",
              image: { systemName: "bell" },
            },
            {
              type: "action",
              title: "Undo",
              image: { systemName: "arrow.uturn.backward.square" },
            },
            {
              type: "menu",
              title: "Mark",
              image: { systemName: "bookmark" },
              children: [
                {
                  type: "action",
                  title: "Mark Item",
                  image: { systemName: "checkmark.seal" },
                },
                {
                  type: "action",
                  title: "Mark All",
                  image: { systemName: "arrowshape.turn.up.left.2" },
                },
                {
                  type: "action",
                  title: "Notify Me",
                  image: { systemName: "bell" },
                },
              ],
            },
          ],
        }}
      >
        <Row
          title="Context Menu With Preview"
          subtitle="Show a preview when context menu opens"
        />
        <Divider />
      </ContextMenu>
    </ScrollView>
  );
}

type PreviewProps = {
  title: string;
};
const Preview = ({ title }: PreviewProps) => {
  return (
    <View style={{ width: "100%", height: "100%", alignItems: "center" }}>
      <Text style={{ marginVertical: 24, fontSize: 24, fontWeight: "bold" }}>
        {title}
      </Text>
      {/* <Image
        width={300}
        height={400}
        style={{ width: "100%", aspectRatio: "auto" }}
        source={{
          uri: "https://media.giphy.com/media/o3Vt7LBQZa8pi/giphy.gif",
        }}
      /> */}
      <View style={{ justifyContent: "center", width: "100%", flex: 1 }}>
        <Image
          width={300}
          // height={600}
          style={{ width: "100%", height: "100%" }}
          source={{
            uri: "https://media.giphy.com/media/o3Vt7LBQZa8pi/giphy.gif",
          }}
        />
      </View>
    </View>
  );
};

type RowProps = {
  title: string;
  subtitle?: string;
};

const Row = ({ title, subtitle }: RowProps) => {
  return (
    <View style={styles.row}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{title}</Text>
      {subtitle && (
        <Text style={{ marginTop: 8, color: "rgba(0,0,0,0.6)" }}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const Divider = () => {
  return (
    <View style={{ paddingLeft: 24 }}>
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.15)",
          height: 1,
          width: "100%",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {},
});
