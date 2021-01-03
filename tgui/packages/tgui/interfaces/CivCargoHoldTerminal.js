import { Fragment } from 'inferno';
import { useBackend } from '../backend';
import { Button, Flex, LabeledList, NoticeBox, Section } from '../components';
import { Window } from '../layouts';

export const CivCargoHoldTerminal = (props, context) => {
  const { act, data } = useBackend(context);
  const {
    pad,
    sending,
    status_report,
    id_inserted,
    id_bounty_info,
    id_bounty_value,
    id_bounty_num,
    picking,
    id_bounty_names,
    id_bounty_values,
  } = data;
  const in_text = "Welcome valued employee.";
  const out_text = "To begin, insert your ID into the console.";
  return (
    <Window resizable
      width={500}
      height={375}>
      <Window.Content scrollable>
        <Flex>
          <Flex.Item>
            <NoticeBox
              color={!id_inserted ? 'default': 'blue'}>
              {id_inserted ? in_text : out_text}
            </NoticeBox>
            <Section title="Cargo Pad">
              <LabeledList>
                <LabeledList.Item
                  label="Status"
                  color={pad ? "good" : "bad"}>
                  {pad ? "Online" : "Not Found"}
                </LabeledList.Item>
                <LabeledList.Item label="Cargo Report">
                  {status_report}
                </LabeledList.Item>
              </LabeledList>
            </Section>
            {picking ? <BountyPickBox /> : <BountyTextBox />}
          </Flex.Item>
          <Flex.Item m={1}>
            <Fragment>
              <Button
                fluid
                icon={"sync"}
                content={"Check Contents"}
                disabled={!pad || !id_inserted}
                onClick={() => act('recalc')} />
              <Button
                fluid
                icon={sending ? 'times' : 'arrow-up'}
                content={sending ? "Stop Sending" : "Send Goods"}
                selected={sending}
                disabled={!pad || !id_inserted}
                onClick={() => act(sending ? 'stop' : 'send')} />
              <Button
                fluid
                icon={id_bounty_info ? 'recycle' : 'pen'}
                color={id_bounty_info ? 'green' : 'default'}
                content={id_bounty_info ? "Replace Bounty" : "New Bounty"}
                disabled={!id_inserted}
                onClick={() => act('bounty')} />
              <Button
                fluid
                icon={'download'}
                content={"Eject ID"}
                disabled={!id_inserted}
                onClick={() => act('eject')} />
            </Fragment>
          </Flex.Item>
        </Flex>
      </Window.Content>
    </Window>
  );
};

const BountyTextBox = (props, context) => {
  const { data } = useBackend(context);
  const {
    id_bounty_info,
    id_bounty_value,
    id_bounty_num,
  } = data;
  const na_text = "N/A, please add a new bounty.";
  return (
    <Section title="Bounty Info">
      <LabeledList>
        <LabeledList.Item label="Description">
          {id_bounty_info ? id_bounty_info : na_text}
        </LabeledList.Item>
        <LabeledList.Item label="Quantity">
          {id_bounty_info ? id_bounty_num : "N/A"}
        </LabeledList.Item>
        <LabeledList.Item label="Value">
          {id_bounty_info ? id_bounty_value : "N/A"}
        </LabeledList.Item>
      </LabeledList>
    </Section>
  );
};

const BountyPickBox = (props, context) => {
  const { act, data } = useBackend(context);
  const {
    id_bounty_names,
    id_bounty_values,
  } = data;
  return (
    <Section
      title="Please Select a Bounty:">
      <Flex wrap>
        <Flex.Item grow>
          <Button
            fluid
            icon="check"
            color="green"
            content={id_bounty_names[0]}
            onClick={() => act('pick', { 'value': 1 })}>
            <Section>
              Payout: {id_bounty_values[0]}
            </Section>
          </Button>
        </Flex.Item>
        <Flex.Item grow>
          <Button
            fluid
            icon="check"
            color="green"
            content={id_bounty_names[1]}
            onClick={() => act('pick', { 'value': 2 })}>
            <Section>
              Payout: {id_bounty_values[1]}
            </Section>
          </Button>
        </Flex.Item>
        <Flex.Item grow>
          <Button
            fluid
            icon="check"
            color="green"
            content={id_bounty_names[2]}
            onClick={() => act('pick', { 'value': 3 })}>
            <Section>
              Payout: {id_bounty_values[2]}
            </Section>
          </Button>
        </Flex.Item>
      </Flex>
    </Section>
  );
};

