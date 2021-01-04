import axios from 'axios';
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import japanese from '../language/ja.json'
import english from '../language/en.json'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import LoadingScreen from './LoadingScreen';
import Message from '../components/Message';
import { useHistory } from 'react-router-dom';



const HomeScreen = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [ln, setLn] = useState(english)

  const [image, setImage] = useState({})
  const [fileName, setFileName] = useState("")

  const [name, setName] = useState("")
  const [language, setLanguage] = useState("en")
  const [timeFormat, setTimeFormat] = useState(24)

  //*clock
  const [displayType, setDisplayType] = useState("digital")
  const [displaySecond, setDisplaySecond] = useState(true)
  const [bold, setBold] = useState(false)
  const [showDate, setShowDate] = useState(true)
  const [showWeek, setShowWeek] = useState(false)
  const [watchFace, setWatchFace] = useState("")

  //*weather
  const [location, setLocation] = useState("")
  const [showWindDirection, setShowWindDirection] = useState(true)
  const [showHumidity, setShowHumidity] = useState(true)
  const [showSunrise, setShowSunrise] = useState(true)
  const [showFeelsLike, setShowFeelsLike] = useState(true)
  const [showRain, setShowRain] = useState(false)
  const [country, setCountry] = useState()

  //*calendar
  const [calendarType, setCalendarType] = useState("https://www.google.com/calendar/ical/japanese%40holiday.calendar.google.com/public/basic.ics")
  const [calendarEntry, setCalendarEntry] = useState(10)

  //*joke
  const [joke, setJoke] = useState(false)
  const [jokeCategory, setJokeCategory] = useState("")

  //*news
  const [news, setNews] = useState("https://www.japantimes.co.jp/feed")

  const history = useHistory()

  const submitHandler = async (e) => {

    if (!fileName) {
      setError("Please Upload file")
    } else if (!name) {
      setError("Please input name")
    } else {
      setError("")
      setLoading(true)
      const data = {
        name,
        language,
        timeFormat,
        clock: {
          displayType, displaySecond, bold, showDate, showWeek, watchFace
        },
        weather: {
          location, showWindDirection, showHumidity, showSunrise, showFeelsLike, showRain
        },
        calendar: {
          calendarType, calendarEntry
        },
        news: {
          news
        },
        joke: {
          joke,
          jokeCategory
        }
      }
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", image);
      formData.append("data", JSON.stringify(data));
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        axios.post("http://localhost:8000/api/addData", formData, config).then((d) => {
          console.log(d)
          setLoading(false)
          history.push("/succes");

        }).catch((err) => {
          console.log(err);
        })

      } catch (error) {
        console.error(error);

      }
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    setImage(file)
    setFileName(file.name)

  };



  return (
    <>

      { loading ? <LoadingScreen /> :
        <div className="p-4">

          <Form >

            <h3 >{ln.ln1}</h3>
            <Form.Control className="mb-3" as="select" onChange={(e) => {
              setLanguage(e.target.value);
              if (e.target.value === "en") {
                setLn(english)
              } else {
                setLn(japanese)
              }
            }}>
              <option value="en">English</option>
              <option value="ja" >日本語</option>
            </Form.Control>

            <Form.Group controlId="image">
              <h3 className="pt-3">{ln.ln2}</h3>
              <Form.Label>{ln.ln3}</Form.Label>
              <Form.File
                id="image-file"
                label={ln.ln4}
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {fileName && <Form.Text className="text-muted">
                {fileName} {ln.ln5}
              </Form.Text>}
            </Form.Group>

            <Form.Group controlId="name">
              <h3 className="pt-4">{ln.ln6}</h3>
              <Form.Label>{ln.ln7}</Form.Label>
              <Form.Control
                type="text"
                placeholder={ln.ln8}
                onChange={(e) => setName(e.target.value)}
              >
              </Form.Control>
              <Form.Label>{ln.ln9}</Form.Label>
              <Form.Control className="mb-3" as="select" onChange={(e) => setTimeFormat(e.target.value)}>
                <option value={24}>{ln.ln10}</option>
                <option value={12}>{ln.ln11}</option>
              </Form.Control>
            </Form.Group>


            {/* clock */}
            <Form.Group controlId="clock">
              <h3 className="pt-4">{ln.ln12}</h3>
              <Form.Label>{ln.ln13}</Form.Label>
              <Form.Control className="mb-3" as="select" onChange={(e) => setDisplayType(e.target.value)}>
                <option value="digital">{ln.ln14}</option>
                <option value="analog">{ln.ln15}</option>
              </Form.Control>

              {displayType === "digital" ? <>
                <Form.Label>{ln.ln16}</Form.Label>
                <Form.Control className="mb-3" as="select" onChange={(e) => setDisplaySecond(e.target.value)}>
                  <option value={true}>{ln.ln17}</option>
                  <option value={false}>{ln.ln18}</option>
                </Form.Control>

                <Form.Label>{ln.ln19}</Form.Label>
                <Form.Control className="mb-3" as="select" onChange={(e) => setBold(e.target.value)}>
                  <option value="true">{ln.ln20}</option>
                  <option value="false">{ln.ln21}</option>
                </Form.Control> </> :
                <>
                  <Form.Label>{ln.ln22}</Form.Label>
                  <Form.Control className="mb-3" as="select" onChange={(e) => setWatchFace(e.target.value)}>
                    <option value="face-001">001</option>
                    <option value="face-002">002</option>
                    <option value="face-003">003</option>
                    <option value="face-004">004</option>
                    <option value="face-005">005</option>
                    <option value="face-006">006</option>
                    <option value="face-007">007</option>
                    <option value="face-008">008</option>
                    <option value="face-009">009</option>
                    <option value="face-010">010</option>
                    <option value="face-011">011</option>
                    <option value="face-012">012</option>
                  </Form.Control></>
              }
              <Form.Label>{ln.ln23}</Form.Label>
              <Form.Control className="mb-3" as="select" onChange={(e) => setShowDate(e.target.value)}>
                <option value={true}>{ln.ln24}</option>
                <option value={false}>{ln.ln25}</option>
              </Form.Control>

              <Form.Label>{ln.ln26}</Form.Label>
              <Form.Control className="mb-3" as="select" onChange={(e) => setShowWeek(e.target.value)}>
                <option value={false}>{ln.ln27}</option>
                <option value={true}>{ln.ln28}</option>
              </Form.Control>
            </Form.Group>



            {/* weather  */}
            <Form.Group controlId="weather">
              <h3 className="pt-4">{ln.ln29}</h3>
              <Form.Label>{ln.ln30}</Form.Label>

              <CountryDropdown
                classes="form-control"
                value={country}
                onChange={(val) => setCountry(val)} />
              <RegionDropdown
                classes="form-control mb-2"
                country={country}
                value={location}
                onChange={(val) => setLocation(val)} />


              <Form.Label>{ln.ln31}</Form.Label>
              <Form.Control className="mb-3" as="select" onChange={(e) => setShowWindDirection(e.target.value)}>
                <option value={true}>{ln.lnyes}</option>
                <option value={false}>{ln.lnno}</option>
              </Form.Control>
              <Form.Label>{ln.ln32}</Form.Label>
              <Form.Control className="mb-3" as="select" onChange={(e) => setShowHumidity(e.target.value)}>
                <option value={true}>{ln.lnyes}</option>
                <option value={false}>{ln.lnno}</option>
              </Form.Control>
              <Form.Label>{ln.ln33}</Form.Label>
              <Form.Control className="mb-3" as="select" onChange={(e) => setShowSunrise(e.target.value)}>
                <option value={true}>{ln.lnyes}</option>
                <option value={false}>{ln.lnno}</option>
              </Form.Control>
              <Form.Label>{ln.ln34}</Form.Label>
              <Form.Control className="mb-3" as="select" onChange={(e) => setShowFeelsLike(e.target.value)}>
                <option value={true}>{ln.lnyes}</option>
                <option value={false}>{ln.lnno}</option>
              </Form.Control>
              <Form.Label>{ln.ln35}</Form.Label>
              <Form.Control className="mb-3" as="select" onChange={(e) => setShowRain(e.target.value)}>
                <option value={false}>{ln.lnno}</option>
                <option value={true}>{ln.lnyes}</option>

              </Form.Control>
            </Form.Group>

            {/* calendar  */}
            <Form.Group controlId="weather">
              <h3 className="pt-4">{ln.ln36}</h3>


              <Form.Label>{ln.ln37}</Form.Label>
              <Form.Control className="mb-3" as="select" onChange={(e) => setCalendarType(e.target.value)}>
                <option value="https://www.google.com/calendar/ical/japanese%40holiday.calendar.google.com/public/basic.ics">{ln.ln39}</option>
                <option value="https://www.calendarlabs.com/templates/ical/US-Holidays.ics">{ln.ln40}</option>
              </Form.Control>
              <Form.Label>{ln.ln38}</Form.Label>
              <Form.Control className="mb-3" as="select" onChange={(e) => setCalendarEntry(e.target.value)}>
                <option value={4}>4</option>
                <option value={6}>6</option>
                <option value={8}>8</option>
                <option value={10}>10</option>
              </Form.Control>

            </Form.Group>

            {/* News  */}
            <Form.Group controlId="weather">
              <h3 className="pt-4">{ln.ln41}</h3>
              <Form.Label>{ln.ln37}</Form.Label>
              <Form.Control className="mb-3" as="select" onChange={(e) => setNews(e.target.value)}>
                <option value="https://www.japantimes.co.jp/feed">The Japan Times</option>
                <option value="http://www3.nhk.or.jp/rss/news/cat0.xml">NHK News Web</option>
              </Form.Control>
            </Form.Group>

            {/* Joke  */}
            <Form.Group controlId="weather">
              <h3 className="pt-4">{ln.ln42}</h3>


              <Form.Label>{ln.ln43}</Form.Label>
              <Form.Control className="mb-3" as="select" onChange={(e) => setJoke(e.target.value)}>
                <option value={false}>{ln.lnno}</option>
                <option value={true}>{ln.lnyes}</option>

              </Form.Control>
              {joke && <> <Form.Label>{ln.ln44}</Form.Label>
                <Form.Control className="mb-3" as="select" onChange={(e) => setJokeCategory(e.target.value)}>
                  <option value="programming">{ln.ln45}</option>
                  <option value="any">{ln.ln46}</option>
                </Form.Control></>
              }
            </Form.Group>


            {error && <Message variant="danger">{error}</Message>}
            <Button variant="primary" onClick={submitHandler} >
              Submit
            </Button>
          </Form>
        </div >}
    </>
  )
}

export default HomeScreen




