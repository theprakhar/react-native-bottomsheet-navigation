import React from "react";
import { generateUUID } from "./misc";
import { getDisplayName } from "./misc"; 
import { BOTTOMSHEET_NAVIGATION_EVENT, dispatchSheetEvent } from "./events";

class SheetDescriptor {
  constructor(config) {
    const { component, sheetParams, sheetName } = config;
    this.__name = sheetName || getDisplayName(component);
    this.__id = this.__name + generateUUID(5);
    this.__ComponentClass = component;
    this.__sheetParams = sheetParams || {};
    this.__isOpened = false;
  }

  get id() {
    return this.__id;
  }
  get Component() {
    return this.__ComponentClass;
  }
  get name() {
    return this.__name;
  }
  isOpened = () => {
    return this.__isOpened;
  };
  closeSelf = () => {
    this.__isOpened = false;
    dispatchSheetEvent(BOTTOMSHEET_NAVIGATION_EVENT.CLOSE, this);
  };

  render() {
    const Component = this.__ComponentClass;
    return (
      <Component
        key={this.id}
        sheetParams={this.__sheetParams}
        closeSelf={this.closeSelf}
        isOpened={this.isOpened}
      />
    );
  }
}

export default SheetDescriptor;
