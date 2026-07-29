import { html, nothing, type TemplateResult } from "lit";

export interface ChartPoint {
  date: string;
  value: number;
}

export interface ChartSeries {
  key: string;
  label: string;
  className: string;
  points: ChartPoint[];
}

export interface LineChartOptions {
  width?: number;
  height?: number;
  emptyLabel?: string;
  ariaLabel?: string;
  valueSuffix?: string;
  valueDecimals?: number;
}

interface PreparedPoint extends ChartPoint {
  timestamp: number;
}

interface PreparedSeries extends Omit<ChartSeries, "points"> {
  points: PreparedPoint[];
}

function validPoints(points: ChartPoint[]): PreparedPoint[] {
  return points
    .map((point) => ({
      date: String(point.date ?? ""),
      value: Number(point.value),
      timestamp: new Date(point.date).getTime()
    }))
    .filter(
      (point) =>
        point.date !== "" &&
        Number.isFinite(point.value) &&
        Number.isFinite(point.timestamp)
    )
    .sort((left, right) => left.timestamp - right.timestamp);
}

function prepareSeries(series: ChartSeries[]): PreparedSeries[] {
  return series
    .map((item) => ({
      key: item.key,
      label: item.label,
      className: item.className,
      points: validPoints(item.points)
    }))
    .filter((item) => item.points.length > 0);
}

function pathForSeries(
  points: PreparedPoint[],
  minimumTimestamp: number,
  maximumTimestamp: number,
  minimumValue: number,
  maximumValue: number,
  width: number,
  height: number,
  padding: number
): string {
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;
  const timestampRange = Math.max(1, maximumTimestamp - minimumTimestamp);
  const valueRange = Math.max(1, maximumValue - minimumValue);

  return points
    .map((point, index) => {
      const x =
        padding +
        ((point.timestamp - minimumTimestamp) / timestampRange) * innerWidth;

      const y =
        padding +
        (1 - (point.value - minimumValue) / valueRange) * innerHeight;

      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export function filterSeriesByDays(
  series: ChartSeries[],
  days: number
): ChartSeries[] {
  const timestamps = series
    .flatMap((item) => item.points)
    .map((point) => new Date(point.date).getTime())
    .filter(Number.isFinite);

  if (!timestamps.length) {
    return series;
  }

  const latestTimestamp = Math.max(...timestamps);
  const minimumTimestamp = latestTimestamp - (days - 1) * 86_400_000;

  return series.map((item) => ({
    ...item,
    points: item.points.filter((point) => {
      const timestamp = new Date(point.date).getTime();
      return Number.isFinite(timestamp) && timestamp >= minimumTimestamp;
    })
  }));
}

export function renderLineChart(
  series: ChartSeries[],
  options: LineChartOptions = {}
): TemplateResult {
  const width = options.width ?? 900;
  const height = options.height ?? 280;
  const padding = 28;
  const prepared = prepareSeries(series);

  if (!prepared.length) {
    return html`
      <div class="chart-empty">
        ${options.emptyLabel ?? "No chart data"}
      </div>
    `;
  }

  const allPoints = prepared.flatMap((item) => item.points);

  const minimumTimestamp = Math.min(
    ...allPoints.map((point) => point.timestamp)
  );

  const maximumTimestamp = Math.max(
    ...allPoints.map((point) => point.timestamp)
  );

  const rawMinimumValue = Math.min(
    ...allPoints.map((point) => point.value)
  );

  const rawMaximumValue = Math.max(
    ...allPoints.map((point) => point.value)
  );

  const valuePadding = Math.max(
    2,
    Math.abs(rawMaximumValue - rawMinimumValue) * 0.08
  );

  const minimumValue = rawMinimumValue - valuePadding;
  const maximumValue = rawMaximumValue + valuePadding;

  const horizontalGrid = [0, 0.25, 0.5, 0.75, 1];

  return html`
    <div class="native-chart">
      <div class="chart-legend">
        ${prepared.map(
          (item) => html`
            <span>
              <i class=${item.className}></i>
              ${item.label}
            </span>
          `
        )}
      </div>

      <svg
        class="statistics-history-chart"
        viewBox="0 0 ${width} ${height}"
        preserveAspectRatio="none"
        role="img"
        aria-label=${options.ariaLabel ?? "Statistics evolution"}
      >
        ${horizontalGrid.map((position) => {
          const y = padding + position * (height - padding * 2);

          return html`
            <line
              class="chart-grid-line"
              x1=${padding}
              y1=${y}
              x2=${width - padding}
              y2=${y}
            ></line>
          `;
        })}

        ${prepared.map((item) => {
          const path = pathForSeries(
            item.points,
            minimumTimestamp,
            maximumTimestamp,
            minimumValue,
            maximumValue,
            width,
            height,
            padding
          );

          const innerWidth = width - padding * 2;
          const innerHeight = height - padding * 2;
          const timestampRange = Math.max(
            1,
            maximumTimestamp - minimumTimestamp
          );
          const valueRange = Math.max(
            1,
            maximumValue - minimumValue
          );

          return path
            ? html`
                <path
                  class="chart-series ${item.className}"
                  d=${path}
                ></path>

                ${item.points.map((point) => {
                  const x =
                    padding +
                    ((point.timestamp - minimumTimestamp) /
                      timestampRange) *
                      innerWidth;

                  const y =
                    padding +
                    (1 -
                      (point.value - minimumValue) /
                        valueRange) *
                      innerHeight;

                  const decimals = options.valueDecimals ?? 1;
                  const suffix = options.valueSuffix ?? "";

                  return html`
                    <circle
                      class="chart-point ${item.className}"
                      cx=${x}
                      cy=${y}
                      r="4"
                    >
                      <title>
                        ${item.label} ·
                        ${new Date(point.timestamp).toLocaleDateString()}
                        · ${point.value.toFixed(decimals)}${suffix}
                      </title>
                    </circle>
                  `;
                })}
              `
            : nothing;
        })}
      </svg>

      <div class="chart-axis">
        <span>
          ${new Date(minimumTimestamp).toLocaleDateString(undefined, {
            day: "2-digit",
            month: "2-digit"
          })}
        </span>

        <span>
          ${new Date(maximumTimestamp).toLocaleDateString(undefined, {
            day: "2-digit",
            month: "2-digit"
          })}
        </span>
      </div>
    </div>
  `;
}
