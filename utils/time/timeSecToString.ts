type Time = { baseTime: number, singularName: string, pluralName: string };

const times = [
  { baseTime: 946080000, singularName: "ano", pluralName: "anos" },
  { baseTime: 2592000, singularName: "mês", pluralName: "meses" },
  { baseTime: 86400, singularName: "dia", pluralName: "dias" },
  { baseTime: 3600, singularName: "hora", pluralName: "horas" },
  { baseTime: 60, singularName: "minuto", pluralName: "minutos" },
  { baseTime: 1, singularName: "segundo", pluralName: "segundos" }
];

function getTimeStr(timeObject: Time, timeSec: number) {
  if (timeSec <= 1) return "agora pouco";

  const measureStr = timeSec >= timeObject.baseTime * 2 ?
    timeObject.pluralName :
    timeObject.singularName;
  
  return `${~~(timeSec / timeObject.baseTime)} ${measureStr}`;
}

export default function timeSecToString(time: number | string) {
  const timeSec = parseInt(String(time));
  const timeObject = times.find(t => timeSec >= t.baseTime);

  if (!timeObject) return "agora pouco";

  return getTimeStr(timeObject, timeSec);
}