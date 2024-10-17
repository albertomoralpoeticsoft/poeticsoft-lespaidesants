export default data => {

  return {
    id: data.id,
    overlap: data.overlap == "1",

    title: data.title,
    url: data.url,
    interactive: data.interactive == "1",

    groupId: data.groupId,
    allDay: data.allDay == "1",
    start: parseInt(data.start),
    end: parseInt(data.end),
    daysOfWeek: data.daysOfWeek,
    startTime: parseInt(data.startTime),
    endTime: parseInt(data.endTime),
    startRecur: parseInt(data.startRecur),
    endRecur: parseInt(data.endRecur),

    editable: data.editable == "1",
    startEditable: data.startEditable,
    durationEditable: data.durationEditable,
    resourceEditable: data.resourceEditable,
    resourceId: data.resourceId,
    resourceIds: data.resourceIds,

    display: data.display,
    restriction: data.restriction,
    className: data.className,
    color: data.color,
    backgroundColor: data.backgroundColor,
    borderColor: data.borderColor,
    textColor: data.textColor,
    extendedProps: data.extendedProps,
    state: data.state
  }
}