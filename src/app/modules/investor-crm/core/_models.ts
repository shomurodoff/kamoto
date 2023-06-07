export type ColumnListType = {
  columnId: number;
  columnName: string;
  color: string;
};

export type activityModel = {
  activityId: number;
  status: string;
  title: string;
  activityImg: {
    name: string;
  };
  documentId: number;
  host: number;
  activityType: string;
  activityTime: string;
  startActivityTime: string;
  endActivityTime: string;
  meetingLink: string;
  timeZone: string;
  meetingNotes: string;
  guest: string;
  documentImg: {
    name: string;
    fileId: number;
  };
};
