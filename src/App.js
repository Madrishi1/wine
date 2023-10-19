import './App.css';
import React from 'react';
import Data from './wine-data.json'


function App() {

    let alc = Data.map((i)=>i.Alcohol) //get all alcohol data in array 
    let clases = Array.from(new Set(alc)) //converted array into set to get unique elements

    // result --> this variable give the all Flavanoids for a spesific class
    // gamma --> his variable calculate gamma for specific class and return in side an Array
    const mean =( num ,type) => {  //function for calculating mean , passing num for getting specific "Class " nad type for diffrentiating Flavanoids and gamma
      let result = Data.filter((i)=>i.Alcohol== num).map(a => a.Flavanoids);
      let gamma = Data.filter((i)=>i.Alcohol== num).map((i)=> (i.Ash * i.Hue)/i.Magnesium)
      let finalResult = type=="Flavanoids"?result:gamma
      let total = 0;
      for (let i = 0; i < finalResult.length; i++) {
        total += finalResult[i];
      }
      return total / finalResult.length;
    };

    const median = (num ,type) => { //function for calculating median , passing num for getting specific "Class " nad type for diffrentiating Flavanoids and gamma
        let result = Data.filter((i)=>i.Alcohol== num).map(a => a.Flavanoids);
        let gamma = Data.filter((i)=>i.Alcohol== num).map((i)=> (i.Ash * i.Hue)/i.Magnesium)
        let finalResult = type=="Flavanoids"?result:gamma
        const mid = Math.floor(finalResult.length / 2),
          nums = [...finalResult].sort((a, b) => a - b);
        return finalResult.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
      };

      const mode =( num ,type)=> {//function for calculating mode , passing num for getting specific "Class " nad type for diffrentiating Flavanoids and gamma
        let result = Data.filter((i)=>i.Alcohol== num).map(a => a.Flavanoids).slice().sort((x, y) => x - y);
        let gamma = Data.filter((i)=>i.Alcohol== num).map((i)=> (i.Ash * i.Hue)/i.Magnesium)
        let finalResult = type=="Flavanoids"?result:gamma
        let bestStreak = 1;
        let bestElem = finalResult[0];
        let currentStreak = 1;
        let currentElem = finalResult[0];
      
        for (let i = 1; i < finalResult.length; i++) {
          if (finalResult[i-1] !== finalResult[i]) {
            if (currentStreak > bestStreak) {
              bestStreak = currentStreak;
              bestElem = currentElem;
            }
      
            currentStreak = 0;
            currentElem = finalResult[i];
          }
      
          currentStreak++;
        }
      
        return currentStreak > bestStreak ? currentElem : bestElem;
      };

  return (
    <div >
      <table className="flavanoid">
        <tr>
            <th>Measure</th>
            {
              clases.map((i)=>
                <th>Class {i}</th>
              )
            }
            
        </tr>
        <tr>
            <th>Flavanoids Mean</th>
            {clases.map((i)=>
              <td>{mean(i ,"Flavanoids" ).toFixed(2)}</td>
            )}

        </tr>
        <tr>
            <th>Flavanoids Median</th>
            {clases.map((i)=>
              <td>{median(i ,"Flavanoids").toFixed(2)}</td>
            )}
        </tr>
        <tr>
            <th>Flavanoids Mode</th>
            {clases.map((i)=>
              <td>{mode(i , "Flavanoids").toFixed(2)}</td>
            )}
        </tr>
      </table>

      <table className="gamma">
        <tr>
            <th>Measure</th>
            {
              clases.map((i)=>
                <th>Class {i}</th>
              )
            }
            
        </tr>
        <tr>
            <th>Gamma Mean</th>
            {clases.map((i)=>
              <td>{mean(i ,"gamma" ).toFixed(2)}</td>
            )}

        </tr>
        <tr>
            <th>Gamma Median</th>
            {clases.map((i)=>
              <td>{median(i ,"gamma").toFixed(2)}</td>
            )}
        </tr>
        <tr>
            <th>Gamma Mode</th>
            {clases.map((i)=>
              <td>{mode(i ,"gamma").toFixed(2)}</td>
            )}
        </tr>
      </table>
    </div>
  );
}

export default App;
