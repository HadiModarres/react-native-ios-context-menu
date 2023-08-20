import { processMenuDefinition } from "./utils";

it("processes UIMenuDefinition to UIMenuDefinitionNative", () => {
  const result = processMenuDefinition({
    title: "title",
    subtitle: "subtitle",
    children: [
      {
        action: {
          value: {
            title: "action title",
            subtitle: "action subtitle",
            handler: () => {
              console.log("my handler");
            },
          },
        },
      },
      {
        action: {
          value: {
            title: "action title2",
            subtitle: "action subtitle2",
            handler: () => {
              console.log("my handler 2");
            },
          },
        },
      },
    ],
  });

  console.log(JSON.stringify(result, undefined, 2));
});
