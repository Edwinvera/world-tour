import React from 'react'
import { Link } from 'react-router-dom'
import {useParams} from "react-router-dom"
import CountUp from 'react-countup'
import './Region.css'
import styled from 'styled-components'


const Main = styled.main`
  display: flex;
  justify-content: center;
  text-align: left;
  margin: 175px 0 0 0;
  padding-bottom: 80px
`
const Header = styled.h1`
  font-family: 'Nunito Sans', sans-serif;
  font-size: 36px;
  letter-spacing: 5px;
`
const Divider = styled.hr`
  width: 400px;
  margin: 18px 0px
`
const Table = styled.table`
  width: 400px
`
const Record = styled.tr`
  line-height: 2.25
`
const Label = styled.td`
  font-family: 'Nunito Sans', sans-serif;
  font-size: 18px;
`
const Numbers = styled.td`
  font-family: sans-serif;
  font-size: 18px;
  line-height: 2;
  text-align: right
`
const CountryLink = styled(Link)`
  text-decoration: none;
  color: black
`
const Country = styled.h2`
  font-family: 'Nunito Sans', sans-serif;
  font-size: 18px;
  letter-spacing: 5px;
  color: rgb(60,60,155)
`
const Summary = styled.section`
  height: 940px;
  width: 500px;
  background-color: rgba(20,20,20,.1);
  border-radius: 8px;
  padding: 60px 60px 0 60px
`
const SideImage = styled.aside`
  height: 1000px;
  width: 620px;
  // box-shadow: -5px 10px 20px rgb(20,20,20);
  border-radius: 8px
`
const CountryList = styled.section`
  overflow: auto;
  height: 615px;
  background-color: rgba(10,10,10,.1);
  padding-left: 15px;
  // margin-right: 100px
`

function Region({regions}) {
  
  // useParams will read whatever :variable is set on the Region for this component and create a unique location.
  // useParams will read the to=value of the Link for this component and create a unique link (url or path name)
  const { regionName } = useParams()
  // This gets me all countries data specific to the region clicked from explorer
  const countries = regions.filter(r => r.region === regionName)

  function totalPopulation() {
    const populationArray = countries.map((c) => c.population)
    const summedPopulation = populationArray.reduce((sum, curr) => {
      return sum + curr
    }, 0)
    return summedPopulation
  }

  function totalArea() {
    const areaArray = countries.map((c) => c.area)
    const summedArea = areaArray.reduce((sum, curr) => {
      return sum + curr
    }, 0)
    return summedArea
  }
  
  return (
    <div>
      <Main>
        <Summary>
          <Header>{regionName}</Header>
          <Divider/>
          <Table>
            <tbody>
              <Record>
                <Label>Population in {regionName}:</Label>
                <Numbers>
                  <CountUp
                    end={totalPopulation()}
                    separator=','
                  />  
                </Numbers>
              </Record>
              <Record>
                <Label>Area of Land (mi<sup>2</sup>):</Label>
                <Numbers>
                  <CountUp
                    end={totalArea()}
                    separator=','
                  />
                </Numbers>
              </Record>
              <Record>
                <Label>Total Countries:</Label>
                <Numbers>
                  <CountUp
                    end={countries.length}
                    separator=','
                  />
                </Numbers>
              </Record>
            </tbody>
          </Table>
          <Divider/>
          {/* Need to setup a map loop for regions here*/}
          <CountryList>
            {countries.map((c, id) => 
              <div key= {id}>
                <CountryLink to= {`/country/${c.name}`}>
                  <Country>{c.name}</Country>
                </CountryLink>
              </div>
            )}
          </CountryList>
        </Summary>
        <SideImage className={`${regionName}Region`}>
        </SideImage>
      </Main>
    </div>
  )
}

export default Region