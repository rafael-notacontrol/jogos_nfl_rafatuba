import { Calendar } from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";

export function Calendario() {
  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      <Calendar
        isReadOnly
        aria-label="Event date"
        defaultValue={today(getLocalTimeZone())}
      >
        <Calendar.Header>
          <Calendar.Heading />
          <Calendar.NavButton slot="previous" />
          <Calendar.NavButton slot="next" />
        </Calendar.Header>
        <Calendar.Grid>
          <Calendar.GridHeader>
            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>
            {(date) => <Calendar.Cell date={date} />}
          </Calendar.GridBody>
        </Calendar.Grid>
      </Calendar>
    </div>
  );
}
