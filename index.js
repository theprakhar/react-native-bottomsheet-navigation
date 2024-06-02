import SheetWrapper from "./src/views/sheet-wrapper";
import { pushSheet, closeAll, navigateToSheet } from "./src/utils/navigation";

const BottomsheetNavigation = {
  pushSheet,
  navigateToSheet,
  closeAll,
};
export const BottomsheetWrapper = SheetWrapper;

export default BottomsheetNavigation