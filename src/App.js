import React, { useEffect, useState } from 'react';
import LineChart from './LineChart'
import Counter from './Counter'
import './App.css';
import { format } from 'date-fns'
import { he } from 'date-fns/esm/locale'
import data from "./data"


function App() {
  const [apiData, setApiData] = useState([{}])
  const [isLoading, setIsLoading] = useState(false);
  
  const formatData = (rawData) => {
    return rawData
      .filter(({ fields }) => fields.date)
      .map(({ fields }) => ({
        ...fields,
        date: new Date(fields.date)
      })
    )
  }
  
  async function fetchData() {
    // You can await here
    try {
      setIsLoading(true)
      let result = await (await fetch('/.netlify/functions/getData/getData.js')).json();
      // todo: workaround. not sure if needed.
      if (!Object.keys(data[0]).length) {
        setApiData(formatData([]))
      } else {
        setApiData(formatData(result))
      }
      setIsLoading(false)
    } catch (err) {
      throw(err)
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const date = apiData?.[apiData.length - 1]?.date
  let lastUpdate = date && `${format(date, "dd MMM, HH:mm", { locale: he })}`
  const { sick = 0, recovered = 0, deceased = 0 } = apiData[apiData.length - 1]
  const sickChangeDay = sick - apiData[apiData.length - 2]?.sick
  
  return (
    <div className="container">
      <div className="counter-row">
        <Counter name="חולים" total={sick} changeDay={sickChangeDay}/>
        <Counter name="החלימו" total={recovered}/>
        <Counter name="נפטרים" total={deceased}/>
      </div>
      <LineChart data={apiData}/>
      <Counter name="מספר בדיקות ביום" changeDay={0} total={"2000~"}/>
      <div className="messages">
        <div className="messages-title">הנחיות אחרונות: משרד הבריאות</div>
        <div className="message-row__date">14 מרץ</div>
        <div className="message-row__body">
          איסור על התקהלות של מעל 10 אנשים. יסגרו מקומות הבילוי והפנאי כולל מסעדות, אדולמות
          קולנוע,
          חדרי כושר וקניונים.
        </div>
      </div>
      <div className="footer">
        <div className="footer__section section__update-date"><strong>עדכון
          אחרון: </strong>{lastUpdate}  </div>
        |
        <div className="footer__section footer__sources"><strong>מקורות:</strong> וויקיפדיה ומשרד
          הבריאות</div>
        |
        <div className="footer__section "><a href="https://github.com/itainoam/covid"
                                             className="footer-section__link">github</a></div>
      </div>
    </div>
  );
}

export default App;
