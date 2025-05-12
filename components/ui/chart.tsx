import * as React from "react"

const Chart = React.forwardRef<React.ElementRef<"svg">, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 300 150"
      preserveAspectRatio="none"
      className={className}
      {...props}
    />
  ),
)
Chart.displayName = "Chart"

const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>
}
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="absolute z-10">{children}</div>
}
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = ({ children }: { children: React.ReactNode }) => {
  return <div className="absolute top-2 right-2 z-10">{children}</div>
}
ChartLegend.displayName = "ChartLegend"

const ChartLegendItem = ({
  name,
  className,
}: {
  name: string
  className?: string
}) => {
  return <span className={className}>{name}</span>
}
ChartLegendItem.displayName = "ChartLegendItem"

const ChartGrid = () => {
  return (
    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeOpacity="0.1" shapeRendering="crispEdges" />
  )
}
ChartGrid.displayName = "ChartGrid"

const ChartLine = <T extends {}>(props: {
  data: T[]
  x: (d: T) => Date
  y: (d: T) => number
  strokeWidth?: number
  className?: string
}) => {
  const { data, x, y, strokeWidth = 1, className } = props

  const pathData = data
    .map((d, i) => {
      const xVal = x(d)
      const yVal = y(d)
      return `${i === 0 ? "M" : "L"} ${xVal.valueOf()} ${yVal}`
    })
    .join(" ")

  return <path d={pathData} stroke="currentColor" strokeWidth={strokeWidth} fill="none" className={className} />
}
ChartLine.displayName = "ChartLine"

const ChartArea = <T extends {}>(props: {
  data: T[]
  x: (d: T) => Date
  y: (d: T) => number
}) => {
  const { data, x, y } = props

  const pathData = data
    .map((d, i) => {
      const xVal = x(d)
      const yVal = y(d)
      return `${i === 0 ? "M" : "L"} ${xVal.valueOf()} ${yVal}`
    })
    .join(" ")

  const firstY = y(data[0])
  const last = data[data.length - 1]
  const lastX = x(last)

  return <path d={`${pathData} L ${lastX.valueOf()} ${firstY} Z`} stroke="none" fill="currentColor" fillOpacity="0.1" />
}
ChartArea.displayName = "ChartArea"

const ChartXAxis = () => {
  return null
}
ChartXAxis.displayName = "ChartXAxis"

const ChartYAxis = () => {
  return null
}
ChartYAxis.displayName = "ChartYAxis"

export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  ChartGrid,
  ChartLine,
  ChartXAxis,
  ChartYAxis,
  ChartArea,
}

