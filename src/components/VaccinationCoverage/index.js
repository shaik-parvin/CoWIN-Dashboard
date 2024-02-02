// Write your code here
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {VaccinationCoverageData} = props
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="coverage-card">
      <h1 className="coverage-heading">Vaccination Coverage</h1>
      <ResponsiveContainer width={1000} height={300}>
        <BarChart data={VaccinationCoverageData} margin={{top: 5}}>
          <XAxis
            dataKey="vaccine_date"
            tick={{storke: 'gray', storkeWidth: 1}}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{storke: 'gray', storkeWidth: 0}}
          />
          <Legend wrapperStyle={{padding: 30}} />
          <Bar dataKey="dose_1" name="Dose 1" fill="#5a8dee" barSize="20%" />
          <Bar dataKey="dose_2" name="Dose 2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
