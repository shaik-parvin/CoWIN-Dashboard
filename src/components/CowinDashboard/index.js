// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const componentsValues = {
  pending: 'PENDING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class CowinDashboard extends Component {
  state = {data: {}, displayStatus: componentsValues.initial}

  componentDidMount() {
    this.fetchedDataApi()
  }

  fetchedDataApi = async () => {
    this.setState({displayStatus: componentsValues.pending})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const fetchdata = await response.json()
    if (response.ok === true) {
      const updateData = {
        last7DaysVaccination: fetchdata.last_7_days_vaccination,
        vaccinationByAge: fetchdata.vaccination_by_age,
        vaccinationByGender: fetchdata.vaccination_by_gender,
      }
      this.setState({data: updateData, displayStatus: componentsValues.success})
    } else {
      this.setState({displayStatus: componentsValues.failure})
    }
  }

  renderpiecharts = () => {
    const {data} = this.state
    const {last7DaysVaccination, vaccinationByAge, vaccinationByGender} = data
    return (
      <>
        <VaccinationCoverage VaccinationCoverageData={last7DaysVaccination} />
        <VaccinationByGender VaccinationByGenderData={vaccinationByGender} />
        <VaccinationByAge VaccinationByAgeData={vaccinationByAge} />
      </>
    )
  }

  failure = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  loading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  switchCaseCheck = () => {
    const {displayStatus} = this.state
    switch (displayStatus) {
      case componentsValues.success:
        return this.renderpiecharts()
      case componentsValues.pending:
        return this.loading()
      case componentsValues.failure:
        return this.failure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <p className="text">Co-WIN</p>
        </div>
        <h1 className="heading">CoWIN Vaccination in India</h1>
        <div className="chats-container">{this.switchCaseCheck()}</div>
      </div>
    )
  }
}

export default CowinDashboard
