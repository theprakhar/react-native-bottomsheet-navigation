import { Component } from "react";
import SheetDescriptor from "./sheet-descriptor";
import { BOTTOMSHEET_NAVIGATION_EVENT, dispatchSheetEvent } from "./events";

/**
 * @typedef {object} SheetHandler - Sheet handler for a bottomsheet instance
 * @property {function} close - function to close the sheet
 * @property {function} isOpened - function to check if the sheet is currently open
 */

/**
 * Function to "push" bottomsheet on top.
 * @param {Component} SheetComponentClass - Class/Functional component to be shown as bottomsheet.
 * @param {object} sheetParams - parameters that the bottomsheet will get in props as "sheetParams".
 * @returns {SheetHandler} 
 */

export const pushSheet = (SheetComponentClass, sheetParams = {}) => {
  const sheetDescription = new SheetDescriptor({
    component: SheetComponentClass,
    sheetParams,
  });
  dispatchSheetEvent(BOTTOMSHEET_NAVIGATION_EVENT.PUSH, sheetDescription);
  return {
    close: sheetDescription.closeSelf,
    isOpened: sheetDescription.isOpened,
  };
};


/**
 * Moves the bottomsheet on to the top of the stack if sheet with same "sheetName" exists in the stack, 
 * otherwise pushes a new instance on the top
 * @param {Component} SheetComponentClass - Class/Functional component to be shown as bottomsheet.
 * @param {object} sheetParams - parameters that the bottomsheet will get in props as "sheetParams".
 * @param {string} sheetName - unique name for the bottomsheet
 * @returns {SheetHandler} 
 */
export const navigateToSheet = (
  SheetComponentClass,
  sheetParams = {},
  sheetName
) => {
  if (!sheetName || typeof sheetName != "string") {
    console.warn("sheet name required");
    return;
  }
  const sheetDescription = new SheetDescriptor({
    sheetName,
    component: SheetComponentClass,
    sheetParams,
  });
  dispatchSheetEvent(BOTTOMSHEET_NAVIGATION_EVENT.NAVIGATE, sheetDescription);
  return {
    close: sheetDescription.closeSelf,
    isOpened: sheetDescription.isOpened,
  };
};

/**
 * Function to close all the bottomsheets
 */
export const closeAll = () => {
  dispatchSheetEvent(BOTTOMSHEET_NAVIGATION_EVENT.CLOSE_ALL, {});
};

