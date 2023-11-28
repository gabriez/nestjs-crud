export const compareEntriesNames = (arrayCompare, nameEntry:string) => {
    if (!arrayCompare.some(item => item[0] == nameEntry)) return nameEntry;
};