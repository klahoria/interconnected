import React, { Component } from "react";
import { IoIosAttach } from "react-icons/io";

export default class Button extends Component {
  render() {
    return (
      <label htmlFor="attachment">
        <span className="action p-3 rounded-3 bg_light_v2" role="button">
          <IoIosAttach />
          <input type="file" name="" className="d-none" id="attachment" />
        </span>
      </label>
    );
  }
}

export class AttachmentButton extends Component {
  render() {
    let { id } = this.props;
    return (
      <label htmlFor={id}>
        <span className="action p-3 rounded-3 bg_light_v2" role="button">
          <IoIosAttach />
          <input type="file" name="" className="d-none" id={id} />
        </span>
      </label>
    );
  }
}
