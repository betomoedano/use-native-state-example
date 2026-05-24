import {
  Button,
  Card,
  Column,
  Text as ComposeText,
  Host,
  Row,
  TextField,
  useNativeState,
} from "@expo/ui/jetpack-compose";
import { fillMaxWidth, padding } from "@expo/ui/jetpack-compose/modifiers";
import * as React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  // 1. Plain useState — the field has no `value` prop, so it's uncontrolled.
  //    onValueChange pushes each keystroke into useState, re-rendering this
  //    component for every character.
  const [jsValue, setJsValue] = React.useState("");
  const jsRenders = React.useRef(0);
  jsRenders.current += 1;

  // 2. useNativeState — the value lives in the native TextField via an
  //    ObservableState passed as `value`. No onValueChange, no React
  //    reconciliation while typing. Read `.value` on demand when you need it.
  const nativeValue = useNativeState("");
  const [lastRead, setLastRead] = React.useState<string | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Host style={{ flex: 1 }}>
          <Column
            modifiers={[padding(12, 12, 12, 12), fillMaxWidth()]}
            verticalArrangement={{ spacedBy: 12 }}
          >
            {/* Controlled-style */}
            <Card modifiers={[fillMaxWidth()]}>
              <Column
                modifiers={[padding(16, 12, 16, 12)]}
                verticalArrangement={{ spacedBy: 8 }}
              >
                <ComposeText style={{ typography: "labelLarge" }}>
                  Plain useState
                </ComposeText>
                <TextField
                  onValueChange={setJsValue}
                  modifiers={[fillMaxWidth()]}
                >
                  <TextField.Placeholder>
                    <ComposeText>Type here…</ComposeText>
                  </TextField.Placeholder>
                </TextField>
                <ComposeText style={{ typography: "bodySmall" }}>
                  JS value: {JSON.stringify(jsValue)}
                </ComposeText>
                <ComposeText style={{ typography: "bodySmall" }}>
                  Component renders: {jsRenders.current}
                </ComposeText>
              </Column>
            </Card>

            {/* Native-only */}
            <Card modifiers={[fillMaxWidth()]}>
              <Column
                modifiers={[padding(16, 12, 16, 12)]}
                verticalArrangement={{ spacedBy: 8 }}
              >
                <ComposeText style={{ typography: "labelLarge" }}>
                  useNativeState only
                </ComposeText>
                <TextField value={nativeValue} modifiers={[fillMaxWidth()]}>
                  <TextField.Placeholder>
                    <ComposeText>Type here…</ComposeText>
                  </TextField.Placeholder>
                </TextField>
                <ComposeText style={{ typography: "bodySmall" }}>
                  Last read:{" "}
                  {lastRead === null ? "—" : JSON.stringify(lastRead)}
                </ComposeText>
                <Row horizontalArrangement={{ spacedBy: 8 }}>
                  <Button onClick={() => setLastRead(nativeValue.value)}>
                    <ComposeText>Read value</ComposeText>
                  </Button>
                  <Button
                    onClick={() => {
                      nativeValue.value = "";
                      setLastRead("");
                    }}
                  >
                    <ComposeText>Clear</ComposeText>
                  </Button>
                </Row>
              </Column>
            </Card>

            <ComposeText style={{ typography: "bodySmall" }}>
              Top field re-renders this component on every keystroke. Bottom
              field keeps state on the native side — JS only sees the value when
              you tap “Read value”.
            </ComposeText>
          </Column>
        </Host>
      </SafeAreaView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  title: "useNativeState",
};
