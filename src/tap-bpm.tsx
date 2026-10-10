import { Action, ActionPanel, Form, Icon, Keyboard } from "@raycast/api";
import { useCallback, useState } from "react";
import { addTap, EMPTY_TEMPO, type Tempo } from "./tempo";

export default function Command() {
  const [tempo, setTempo] = useState<Tempo>(EMPTY_TEMPO);
  const [input, setInput] = useState("");

  const tap = useCallback(() => {
    setTempo((current) => addTap(current, performance.now()));
  }, []);

  const handleInput = useCallback(
    (value: string) => {
      // Clear the field after each keypress so every Space produces a new change.
      // Ignore other characters so accidental typing does not affect the tempo.
      if (value.includes(" ")) {
        tap();
      }
      setInput("");
    },
    [tap],
  );

  const reset = useCallback(() => {
    setTempo(EMPTY_TEMPO);
    setInput("");
  }, []);

  const bpm = tempo.bpm;
  const tapCount = tempo.taps.length;

  return (
    <Form
      navigationTitle="Tap BPM"
      actions={
        <ActionPanel>
          <Action title="Tap Beat" icon={Icon.CircleFilled} onAction={tap} />
          <Action
            title="Reset"
            icon={Icon.ArrowCounterClockwise}
            shortcut={Keyboard.Shortcut.Common.Refresh}
            onAction={reset}
          />
          {bpm !== null && (
            <Action.CopyToClipboard title="Copy BPM" content={String(bpm)} />
          )}
        </ActionPanel>
      }
    >
      <Form.Description
        title="Tempo"
        text={bpm === null ? "— BPM" : `${bpm} BPM`}
      />
      <Form.TextField
        id="tap"
        title="Tap"
        placeholder="Press Space repeatedly in time with the beat"
        value={input}
        onChange={handleInput}
        autoFocus
      />
      <Form.Description
        title="Progress"
        text={
          tapCount === 0
            ? "Press Space to start"
            : tapCount === 1
              ? "1 tap · keep going"
              : `${tapCount} recent taps · next tap starts over after a 3-second pause`
        }
      />
    </Form>
  );
}
