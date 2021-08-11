/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import React, { ChangeEvent } from "react";
import {
  EuiButton,
  EuiText,
  EuiHorizontalRule,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiLink,
  EuiIcon,
  EuiEmptyPrompt,
  EuiFormRow,
  EuiSelect,
} from "@elastic/eui";
import { ContentPanel } from "../../../../components/ContentPanel";
import "brace/theme/github";
import "brace/mode/json";
import { Policy, State as StateData } from "../../../../../models/interfaces";
import { DOCUMENTATION_URL } from "../../../../utils/constants";
import State from "./State";

interface StatesProps {
  onOpenFlyout: () => void;
  policy: Policy;
  onClickEditState: (state: StateData) => void;
  onClickDeleteState: (idx: number) => void;
  onChangeDefaultState: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const States = ({ onOpenFlyout, policy, onClickEditState, onClickDeleteState, onChangeDefaultState }: StatesProps) => {
  return (
    <ContentPanel
      bodyStyles={{ padding: "initial" }}
      title={`States (${policy.states.length})`}
      titleSize="s"
      subTitleText={
        <EuiText size="s" style={{ padding: "5px 0px" }}>
          <p style={{ color: "grey", fontWeight: 200 }}>
            You can think of policies as state machines. "Actions" are the operations ISM performs when an index is in a certain state.
            <br />
            "Transitions" define when to move from one state to another.{" "}
            <EuiLink href={DOCUMENTATION_URL} target="_blank">
              Learn more <EuiIcon type="popout" size="s" />
            </EuiLink>
          </p>
        </EuiText>
      }
    >
      <div style={{ padding: "0px 10px" }}>
        <EuiFormRow compressed style={{ maxWidth: "300px", padding: "15px" }} isInvalid={false} error={null}>
          <EuiSelect
            compressed
            prepend="Initial state"
            options={policy.states.map((state) => ({ text: state.name, value: state.name }))}
            value={policy.default_state}
            onChange={onChangeDefaultState}
          />
        </EuiFormRow>

        <EuiSpacer size="s" />

        <EuiHorizontalRule margin="none" />

        <EuiFlexGroup gutterSize="none" direction="column">
          {policy.states.map((state, idx) => (
            <EuiFlexItem key={state.name}>
              <State
                idx={idx}
                state={state}
                isInitialState={state.name === policy.default_state}
                onClickEditState={onClickEditState}
                onClickDeleteState={onClickDeleteState}
              />
              <EuiHorizontalRule margin="none" />
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>

        {!!policy.states.length ? (
          <>
            <EuiSpacer />
            <EuiButton onClick={onOpenFlyout} data-test-subj="states-add-state-button">
              Add state
            </EuiButton>
          </>
        ) : (
          <EuiEmptyPrompt
            title={<h2>No states</h2>}
            titleSize="s"
            body={<p>Your policy currently has no states defined. Add states to manage your index lifecycle.</p>}
            actions={
              <EuiButton color="primary" onClick={onOpenFlyout} data-test-subj="states-add-state-button">
                Add state
              </EuiButton>
            }
          />
        )}
      </div>
    </ContentPanel>
  );
};

export default States;
