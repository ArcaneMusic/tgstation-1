import { range } from "common/collections";
import { BooleanLike } from "common/react";
import { resolveAsset } from "../assets";
import { useBackend } from "../backend";
import { Box, Button, Icon, Section, Stack } from "../components";
import { Window } from "../layouts";

export const Minesweep = (props, context) => {
  const { act, data } = useBackend(context);
  return (
    <Window
      width={400}
      height={305}>
      <Window.Content>
        <Section
          title="Power 2" >
          <Minefield />
        </Section>
      </Window.Content>
    </Window>
  );
};

export const Minefield = (props, context) => {
  const { act, data } = useBackend(context);
  const tiles = [];
  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
      const tile = (
        <Button content = "X" />
      )
      tiles.push(tile)
    }
  }
  return tiles
};
