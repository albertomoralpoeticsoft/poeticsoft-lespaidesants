export const receiveddatatransform = data => {

  const transformeddata = {
    id: data.id,
    overlap: data.overlap == "1",

    title: data.title,
    // url: null, //data.url,
    interactive: false, // data.interactive == "1",

    groupId: data.groupId,
    allDay: data.allDay == "1",
    start: data.start ? parseInt(data.start) : null,
    end: data.end ? parseInt(data.end) : null,
    daysOfWeek: data.daysOfWeek ? JSON.parse(data.daysOfWeek) : null,
    startTime: data.startTime ? parseInt(data.startTime) : null,
    endTime: data.endTime ? parseInt(data.endTime) : null,
    startRecur: data.startRecur ? parseInt(data.startRecur) : null,
    endRecur: data.endRecur ? parseInt(data.endRecur) : null,

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

  return transformeddata
}

export const sentdatatransform = data => {
  
  const transformeddata = {

    overlap: false, // data.overlap,

    title: data.title,
    url: data.url,
    interactive: data.interactive,

    groupId: data.groupId,
    allDay: data.allDay,
    start: data.start,
    end: data.end,
    daysOfWeek: data.daysOfWeek ? JSON.stringify(data.daysOfWeek) : null,
    startTime: data.startTime,
    endTime: data.endTime,
    startRecur: data.startRecur,
    endRecur: data.endRecur,

    editable: data.editable,
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

  return transformeddata
}